import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@component/preloader/Loading"; // Assuming Loading component is in the same directory
import ProductCard from "@component/product/ProductCard"; // Importing the ProductCard component

export default function SearchProductById({ route }) {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `${process.env.NEXT_PUBLIC_API_SOCKET_URL}/api/products/subcategoriesproduct/parent/${route}`
        );
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route]);

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        Data.length > 0 ? (
          Data.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
            // attributes={attributes}
            />
          ))
        ) : (
          <p className="text-3xl mt-3">No Product Available</p>
        )
      )}
    </>
  );
}
