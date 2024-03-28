
import CMSkeleton from '@component/preloader/CMSkeleton';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Loading from '@component/preloader/Loading'; // Import the Loading component

export default function SubCategoryShow({ route }) {
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(`${process.env.NEXT_PUBLIC_API_SOCKET_URL}/api/category/subcategories/parent/${route}`);
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [route]);

    if (loading) {
        return <Loading />; // Show loading component if loading is true
    }

    return (
        <>
            {Data.length > 0 ? (
                Data.map((data, index) => (
                    <Link href={`/productsearchid/${data._id}`} key={index} className='flex flex-col items-center'>
                        <div className='w-[175px] h-[175px] bg-slate-600 rounded-xl relative overflow-hidden'>
                            <div className='w-auto absolute right-0'>
                                <Image
                                    src={data.icon}
                                    width={400}
                                    height={400}
                                    alt="country" />
                            </div>
                        </div>
                        <p className='text-sm mt-3'>{data.name.en}</p>
                    </Link>
                ))
            ) : (
                <p className='text-3xl mt-3'>
                    No Product Available
                </p>
            )}
        </>
    )
}
