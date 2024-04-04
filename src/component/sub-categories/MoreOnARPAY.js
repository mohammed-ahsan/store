import FeatureCategory from "@component/category/FeatureCategory";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useAsync from "@hooks/useAsync";
import useGetSetting from "@hooks/useGetSetting";
import CategoryServices from "@services/CategoryServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineShoppingBasket } from "react-icons/md";

export default function GamingGiftCards({
  categories,
  showingTranslateValue,
}) {
  const loading = categories ? false : true;

  return (
    <>
      <div className="bg-gray-100 py-10">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="mb-10 flex">
            <div className="w-full lg:w-2/5">
              <h2 className="text-xl lg:text-2xl mb-2 font-serif text-left font-semibold flex items-center">
                <MdOutlineShoppingBasket className="mr-5" />
                {showingTranslateValue(categories[0]?.children[0]?.name)}
              </h2>
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                {categories[0]?.children[0]?.children
                  .slice(0, 6)
                  .map((category, index) => {
                    return (
                      <Link
                        key={category._id}
                        href={`productsearch/${category._id}`}
                        className="bg-white shadow-xl w-full h-auto rounded-lg overflow-hidden"
                      >
                        <Image
                          width={400}
                          height={300}
                          className="w-full h-auto"
                          src={category.icon}
                          alt="category"
                        />
                        <div className="h-auto">
                          <p className="font-semibold text-slate-800 my-5 p-2 h-[15px]">
                            {showingTranslateValue(category.name)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
            <div className="w-full h-auto mt-20 flex justify-center">
              {categories[0]?.children[0]?.children.length > 6 ? (
                <Link
                  href={`/showsuballcatagory/${categories[0]?.children[0]?._id}`}
                  className="bg-[#10b981] hover:bg-[#339474] duration-200 w-auto px-10 py-2 rounded-full font-semibold text-white flex items-center"
                >
                  See More <FaLongArrowAltRight className="ml-5" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
