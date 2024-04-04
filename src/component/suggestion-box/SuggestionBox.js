// import React, { useState, useEffect, useRef } from 'react';
// import ProductServices from "@services/ProductServices";
// const Autosuggestion = () => {


//     const [value, setValue] = useState('');
//     const [allProduct, setAllProduct] = useState([]);
//     const [productNames, setProductNames] = useState([]);
//     const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);

//     const inputRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (inputRef.current && !inputRef.current.contains(e.target)) {
//                 setShowSuggestions(false);
//             }
//         };

//         document.addEventListener('click', handleClickOutside);

//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);

//     // useEffect(() => {
//     //     const fetchProducts = async () => {
//     //         try {
//     //             const response = await fetch('http://localhost:5055/api/products/');
//     //             const data = await response.json();
//     //             setAllProduct(data.products);
//     //             const names = data.products.map(product => product.slug);
//     //             setProductNames(names);

//     //         } catch (error) {
//     //             console.log(error);
//     //         }
//     //     };

//     //     fetchProducts();
//     // }, []);
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('https://backend-delta-puce.vercel.app/api/products');
//                 const data = await response.json();
//                 setAllProduct(data.products);

//                 // Assuming the product names are stored in a property called 'name'
//                 const names = data.products.map(products => products.slug);
//                 setProductNames(names);

//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchProducts();
//     }, []);



//     console.log("allProduct", productNames);

//     // const handleChange = (e) => {
//     //     const inputValue = e.target.value;
//     //     setValue(inputValue);

//     //     // Check if allProduct is an array before trying to filter
//     //     if (Array.isArray(productNames)) {
//     //         const filtered = productNames.filter((suggestion) =>
//     //             suggestion.toLowerCase().includes(inputValue.toLowerCase())
//     //         );
//     //         setFilteredSuggestions(filtered.slice(0, 5));
//     //         setShowSuggestions(true);
//     //     }
//     // };
//     const handleChange = (e) => {
//         const inputValue = e.target.value;
//         setValue(inputValue);

//         // Check if allProduct is an array before trying to filter
//         if (Array.isArray(allProduct)) {
//             const filtered = allProduct.filter((product) =>
//                 product.slug.toLowerCase().includes(inputValue.toLowerCase())
//             );

//             setFilteredSuggestions(filtered.slice(0, 5));

//             // If the input is empty, hide suggestions
//             setShowSuggestions(inputValue.trim() !== '' && filtered.length > 0);
//         }
//     };




//     const handleSuggestionClick = (suggestion) => {
//         setValue(suggestion);
//         setShowSuggestions(false);
//     };

//     return (
//         <div className="autosuggest-container" ref={inputRef}>
//             <input
//                 type="text"
//                 placeholder="Search Your Product"
//                 value={value}
//                 onChange={handleChange}
//                 className="autosuggest-input custom-width"
//             />
//             {/* {showSuggestions && filteredSuggestions.length > 0 && (
//                 <div className="autosuggest-suggestions-container">
//                     {filteredSuggestions.map((suggestion, index) => (
//                         <div
//                             key={index}
//                             className="autosuggest-suggestion"
//                             onClick={() => handleSuggestionClick(suggestion)}
//                         >
//                             {suggestion}
//                         </div>
//                     ))}
//                 </div>
//             )} */}
//             {showSuggestions && filteredSuggestions.length > 0 && (
//                 <div className="suggestions-box">
//                     {filteredSuggestions.map((product, index) => (
//                         <div
//                             key={index}
//                             className="autosuggest-suggestion"
//                             onClick={() => handleSuggestionClick(product.slug)}
//                         >
//                             {product.slug}
//                         </div>
//                     ))}
//                 </div>
//             )}


//         </div>


//     );
// };

// export default Autosuggestion;

import React, { useState, useEffect, useRef } from 'react';
import ProductServices from "@services/ProductServices";

const Autosuggestion = () => {
    const [value, setValue] = useState('');
    const [allProduct, setAllProduct] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://backend-delta-puce.vercel.app/api/products');
                const data = await response.json();
                setAllProduct(data.products);

                const names = data.products.map(products => products.slug);
                setProductNames(names);

            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        if (Array.isArray(allProduct)) {
            const filtered = allProduct.filter((product) =>
                product.slug.toLowerCase().includes(inputValue.toLowerCase())
            );

            setFilteredSuggestions(filtered.slice(0, 5));
            setShowSuggestions(inputValue.trim() !== '' && filtered.length > 0);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const selected = allProduct.find((product) => product.slug === suggestion);
        setSelectedProduct(selected);
        setShowSuggestions(false);
    };

    return (
        <div className="autosuggest-container" ref={inputRef}>
            <input
                type="text"
                placeholder="Search Your Product"
                value={value}
                onChange={handleChange}
                className="autosuggest-input custom-width"
            />

            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="suggestions-box">
                    {filteredSuggestions.map((product, index) => (
                        <div
                            key={index}
                            className="autosuggest-suggestion"
                            onClick={() => handleSuggestionClick(product.slug)}
                        >
                            {product.slug}
                        </div>
                    ))}
                </div>
            )}

            {selectedProduct && (
                <div className="selected-product-details">
                    <h2>{selectedProduct.title.en}</h2>
                    <p>{selectedProduct.description.en}</p>
                    <p>Price: ${selectedProduct.prices.price}</p>
                    {/* Add other details you want to display */}
                </div>
            )}
        </div>
    );
};

export default Autosuggestion;
