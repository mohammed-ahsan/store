// import CMSkeleton from '@component/preloader/CMSkeleton';
// import useAsync from '@hooks/useAsync';
// import Layout from '@layout/Layout'
// import CategoryServices from '@services/CategoryServices';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router'
// import React from 'react'
// import { FaFireAlt } from 'react-icons/fa';

// export default function showsuballcatagory() {

//     const router = useRouter()
//     const { data, error, loading } = useAsync(
//         CategoryServices.getShowingCategory
//     );
//     const matchingObject = data[0]?.children.find(obj => obj._id === router.query.catagoryid)
//     // console.log(data[0]?.children)



//     const handlepush = (id) => {
//         router.push(`/productsearchid/${id}`)
//     }

//     return (
//         <>
//             {/* {isLoading ? (
//                 <Loading loading={isLoading} />
//             ) :
//              ( */}
//             <Layout>
//                 <div className="bg-gray-100 lg:py-16 py-10">
//                     <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
//                         <div className="mb-10 flex">
//                             <div className="w-full lg:w-2/5">
//                                 <h2 className="text-xl lg:text-2xl mb-2 font-serif text-left font-semibold flex items-center">
//                                     <FaFireAlt className='mr-5' />
//                                     {matchingObject?.name.en}
//                                 </h2>
//                             </div>
//                         </div>

//                         <div>
//                             {loading ? <CMSkeleton count={10} height={20} error={error} loading={loading} /> :
//                                 <div className='w-full h-auto grid grid-cols-6 gap-6'>
//                                     {
//                                         matchingObject?.children.map((data, index) => {
//                                             return (
//                                                 <div onClick={() => handlepush(matchingObject._id)} className='bg-white cursor-pointer shadow-xl w-[200px] h-auto rounded-lg overflow-hidden'>
//                                                     <Image width={400} height={300} className='w-full h-auto' src={data.icon} alt="" />
//                                                     <div className='h-auto'>
//                                                         <p className='font-semibold text-slate-800 my-5 p-2 h-[15px]'>{data.name.en ?? null}</p>
//                                                     </div>
//                                                 </div>

//                                             )
//                                         })
//                                     }


//                                 </div>
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </Layout>
//         </>
//     )
// }

// // 

// ShowSubCategory.js

import CMSkeleton from '@component/preloader/CMSkeleton';
import useAsync from '@hooks/useAsync';
import Layout from '@layout/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaFireAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ShowSubCategory() {
    const router = useRouter();
    const categoryId = router.query.catagoryid;



    const { data, error, loading } = useAsync(async () => {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/subcategories/parent/${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch subcategories');
        }

    });

    const handlePush = (id) => {
        router.push(`/productsearchid/${id}`);
    };
    return (
        <Layout>
            <div className="bg-gray-100 lg:py-16 py-10">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                    <div className="mb-10 flex">
                        <div className="w-full lg:w-2/5">
                            <h2 className="text-xl lg:text-2xl mb-2 font-serif text-left font-semibold flex items-center">
                                <FaFireAlt className='mr-5' />
                                {data[0]?.parentName}
                            </h2>
                        </div>
                    </div>

                    <div>
                        {loading ? (
                            <CMSkeleton count={10} height={20} error={error} loading={loading} />
                        ) : data && data.length > 0 ? (
                            <div className='w-full h-auto grid grid-cols-6 gap-6'>
                                {data.map((subcategory, index) => (
                                    <div key={index} className='bg-white cursor-pointer shadow-xl w-[200px] h-auto rounded-lg overflow-hidden' onClick={() => handlePush(subcategory._id)}>
                                        <Image width={400} height={300} className='w-full h-auto' src={subcategory.icon} alt="" />
                                        <div className='h-auto'>
                                            <p className='font-semibold text-slate-800 my-5 p-2 h-[15px]'>{subcategory.name.en ?? null}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>No subcategories available</div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
