import FeatureCategory from "@component/category/FeatureCategory";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useAsync from "@hooks/useAsync";
import useGetSetting from "@hooks/useGetSetting";
import CategoryServices from "@services/CategoryServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGripHorizontal } from "react-icons/fa";

export default function GoogleGiftCards({ categories, showingTranslateValue }) {
  console.log(categories)
  const loading = categories ? false : true;
  return (
    <>
      <div className="bg-gray-100 lg:py-16 py-10">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="mb-10 flex">
            <div className="w-full lg:w-2/5">
              <h2 className="text-xl lg:text-2xl mb-2 font-serif text-left font-semibold flex items-center">
                <FaGripHorizontal className="mr-5" />
                {showingTranslateValue(categories[0]?.children[1]?.name)}
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
              <div className="w-full h-auto grid md:grid-cols-3 grid-cols-1 lg:gap-28 gap-5">
                <Link
                  href={`productsearch/${categories[0]?.children[1]?.children[0]._id}`}
                  className="bg-white shadow-xl w-full h-full rounded-lg overflow-hidden"
                >
                  <Image
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    src={categories[0]?.children[1]?.children[0]?.icon}
                    alt="category"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 my-5 pl-10">
                      {showingTranslateValue(
                        categories[0]?.children[1]?.children[0]?.name
                      )}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`productsearch/${categories[0]?.children[1]?.children[1]._id}`}
                  className="bg-white shadow-xl w-full h-full rounded-lg overflow-hidden"
                >
                  <Image
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    src={categories[0]?.children[1]?.children[1]?.icon}
                    alt="category"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 my-5 pl-10">
                      {showingTranslateValue(
                        categories[0]?.children[1]?.children[1]?.name
                      )}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`productsearch/${categories[0]?.children[1]?.children[2]._id}`}
                  className="bg-white shadow-xl w-full h-full rounded-lg overflow-hidden"
                >
                  <Image
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    src={categories[0]?.children[1]?.children[2]?.icon}
                    alt=""
                  />
                  <div>
                    <p className="font-semibold text-slate-800 my-5 pl-10">
                      {showingTranslateValue(
                        categories[0]?.children[1]?.children[2]?.name
                      )}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
