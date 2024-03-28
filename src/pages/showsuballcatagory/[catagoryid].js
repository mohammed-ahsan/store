import CMSkeleton from '@component/preloader/CMSkeleton';
import useAsync from '@hooks/useAsync';
import Layout from '@layout/Layout'
import CategoryServices from '@services/CategoryServices';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { FaFireAlt } from 'react-icons/fa';

export default function showsuballcatagory() {

    const router = useRouter()
    const { data, error, loading } = useAsync(
        CategoryServices.getShowingCategory
    );
    const matchingObject = data[0]?.children.find(obj => obj._id === router.query.catagoryid)
    // console.log(data[0]?.children)

    

    const handlepush = (id) => {
        router.push(`/productsearchid/${id}`)
    }

    return (
        <>
            {/* {isLoading ? (
                <Loading loading={isLoading} />
            ) :
             ( */}
            <Layout>
                <div className="bg-gray-100 lg:py-16 py-10">
                    <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
                        <div className="mb-10 flex">
                            <div className="w-full lg:w-2/5">
                                <h2 className="text-xl lg:text-2xl mb-2 font-serif text-left font-semibold flex items-center">
                                    <FaFireAlt className='mr-5' />
                                    {matchingObject?.name.en}
                                </h2>
                            </div>
                        </div>

                        <div>
                            {loading ? <CMSkeleton count={10} height={20} error={error} loading={loading} /> :
                                <div className='w-full h-auto grid grid-cols-6 gap-6'>
                                    {
                                        matchingObject?.children.map((data, index) => {
                                            return (
                                                <div onClick={()=>handlepush(matchingObject._id)} className='bg-white cursor-pointer shadow-xl w-[200px] h-auto rounded-lg overflow-hidden'>
                                                    <Image width={400} height={300} className='w-full h-auto' src={data.icon} alt="" />
                                                    <div className='h-auto'>
                                                        <p className='font-semibold text-slate-800 my-5 p-2 h-[15px]'>{data.name.en ?? null}</p>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }

                                    {/* <Link href={`productsearch/${data[0]?.children[0]?.children[0]._id}`} className='bg-white shadow-xl w-full h-full rounded-lg overflow-hidden'>
                                    <Image width={400} height={300} className='w-full h-auto' src={data[0]?.children[0]?.children[0]?.icon} alt="" />
                                    <div>
                                        <p className='font-semibold text-slate-800 my-5 pl-10'>{data[0]?.children[0]?.children[0]?.name.en ?? null}</p>
                                    </div>
                                </Link>
                                <Link href={`productsearch/${data[0]?.children[0]?.children[1]._id}`} className='bg-white shadow-xl w-full h-full rounded-lg overflow-hidden'>
                                    <Image width={400} height={300} className='w-full h-auto' src={data[0]?.children[0]?.children[1]?.icon} alt="" />
                                    <div>
                                        <p className='font-semibold text-slate-800 my-5 pl-10'>{data[0]?.children[0]?.children[1]?.name.en ?? null}</p>
                                    </div>
                                </Link>
                                <Link href={`productsearch/${data[0]?.children[0]?.children[2]._id}`} className='bg-white shadow-xl w-full h-full rounded-lg overflow-hidden'>
                                    <Image width={400} height={300} className='w-full h-auto' src={data[0]?.children[0]?.children[2]?.icon} alt="" />
                                    <div>
                                        <p className='font-semibold text-slate-800 my-5 pl-10'>{data[0]?.children[0]?.children[2]?.name.en ?? null}</p>
                                    </div>
                                </Link> */}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

// 