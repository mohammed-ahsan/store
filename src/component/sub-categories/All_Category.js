import FeatureCategory from "@component/category/FeatureCategory";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useAsync from "@hooks/useAsync";
import useGetSetting from "@hooks/useGetSetting";
import CategoryServices from "@services/CategoryServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGripHorizontal, FaLongArrowAltRight } from "react-icons/fa";

export default function All_Category({ categories, showingTranslateValue }) {
    // console.log(categories[0]?.children)
    const loading = categories ? false : true;
    return (
        <>
            <div className="bg-gray-100 lg:py-16 py-10">

                {
                    categories[0]?.children.map((data, index) => {
                        return (
                            <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 mb-20">
                                <div className="mb-10 flex">
                                    <div className="w-full h-14 flex items-center justify-between">
                                        <h2 className="text-xl h-full lg:text-2xl font-serif text-left font-semibold flex items-center">
                                            <FaGripHorizontal className="mr-5" />
                                            {showingTranslateValue(data?.name)

                                            }
                                        </h2>
                                        <div className="w-[190px] h-auto">
                                            {data?.children?.length > 6 ? (
                                                <Link
                                                    href={`/showsuballcatagory/${data?._id}`}
                                                    className="bg-[#10b981] hover:bg-[#339474] duration-200 w-auto px-10 py-2 rounded-full font-semibold text-white flex items-center"
                                                >
                                                    See More <FaLongArrowAltRight className="ml-5" />
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {loading ? (
                                        <CMSkeleton
                                            count={10}
                                            height={20}
                                            error={false}
                                            loading={loading}
                                        />
                                    ) : (

                                        <div className={data.children.length === 3 ? `w-full h-auto grid md:grid-cols-3 grid-cols-1 lg:gap-28 gap-5` : `grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5`}>

                                            {
                                                data.children.length > 0 ?

                                                    data.children.slice(0, 6).map((datanew, index) => {
                                                        console.log(datanew.length)
                                                        return (


                                                            <Link
                                                                href={`productsearch/${categories[0]?.children[1]?.children[0]._id}`}
                                                                className="bg-white shadow-xl w-full h-full rounded-lg overflow-hidden"
                                                            >
                                                                <Image
                                                                    width={400}
                                                                    height={300}
                                                                    className="w-full h-auto"
                                                                    src={datanew.icon}
                                                                    alt="category"
                                                                />
                                                                <div>
                                                                    <p className="font-semibold text-slate-800 my-5 pl-10">
                                                                        {showingTranslateValue(
                                                                            data.name
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </Link>

                                                        )
                                                    }) :
                                                    <h1>
                                                        No Product Available
                                                    </h1>
                                            }

                                            {/* here */}
                                        </div>
                                    )}
                                </div>
                            </div>)
                    })
                }

            </div>
        </>
    );
}
