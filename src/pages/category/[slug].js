import React, { Fragment, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

//internal imports
import Layout from "@layout/Layout";
import Loading from "@component/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { FiChevronRight } from "react-icons/fi";
import CategoryServices from "@services/CategoryServices";
import ChildCategoryCard from "@component/category/ChildCategoryCard";
import CMSkeleton from "@component/preloader/CMSkeleton";
import AttributeServices from "@services/AttributeServices";
import ProductCard from "@component/product/ProductCard";

const CategoryScreen = ({ result, attributes }) => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  // console.log("result", result, "attributes", attributes);

  useEffect(() => {
    setIsLoading(false);
  }, [result]);

  // console.log(result)

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          //   title={showingTranslateValue(product?.title)}
          //   description={showingTranslateValue(product.description)}
          title="Category"
          description="This is category page"
        >
          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto px-3 lg:px-10 max-w-screen-2xl">
              <div className="flex items-center pb-4">
                <ol className="flex items-center w-full overflow-hidden font-serif">
                  <li className="text-xs pr-1 transition duration-200 ease-in cursor-pointer hover:text-blue-700 hover:underline font-medium">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  {result?.categoryList?.slice(0, -1)?.map((cat, index) => {
                    const category_name = showingTranslateValue(cat?.name)
                      .toLowerCase()
                      .replace(/[^A-Z0-9]+/gi, "-");
                    return (
                      <Fragment key={cat?._id}>
                        <li
                          key={cat?._id}
                          className="text-xs pr-1 transition duration-200 ease-in cursor-pointer hover:text-blue-700 hover:underline font-medium"
                        >
                          <Link href={`/category/${category_name}`}>
                            <button
                              type="button"
                              onClick={() => setIsLoading(!isLoading)}
                            >
                              {showingTranslateValue(cat?.name)}
                            </button>
                          </Link>
                        </li>
                        <FiChevronRight />{" "}
                      </Fragment>
                    );
                  })}

                  <li className="text-xs pr-1 transition duration-200 ease-in">
                    {showingTranslateValue(result?.category?.name)}{" "}
                  </li>
                </ol>
              </div>
              {result?.categoryList?.length === 3 ? (
                <div className="text-center my-6">
                  <h2 className="text-xl font-semibold mb-8 text-left">
                    {showingTranslateValue(result?.category?.name)}{" "}
                  </h2>
                  {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3"> */}
                  {result?.products?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {result?.products?.map((product, index) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          attributes={attributes}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center align-middle mx-auto p-5 my-5">
                      <Image
                        className="my-4 mx-auto"
                        src="/no-result.svg"
                        alt="no-result"
                        width={400}
                        height={380}
                      />
                      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                        {t("common:sorryText")} 😞
                      </h2>
                    </div>
                  )}
                </div>
              ) : (
                // </div>
                <div className="text-center my-6">
                  <h2 className="text-xl font-semibold mb-8">
                    {showingTranslateValue(result?.category?.name)}{" "}
                  </h2>
                  {result?.childCategories?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                      {result?.childCategories.map((category) => (
                        <ChildCategoryCard
                          key={category._id}
                          category={category}
                          showingTranslateValue={showingTranslateValue}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center align-middle mx-auto p-5 my-5">
                      <Image
                        className="my-4 mx-auto"
                        src="/no-result.svg"
                        alt="no-result"
                        width={400}
                        height={380}
                      />
                      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
                        No sub category available 😞
                      </h2>
                    </div>
                  )}
                </div>
              )}

              <div className="">
                <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
                  <CMSkeleton
                    html
                    count={15}
                    height={15}
                    error={false}
                    loading={false}
                    data={result?.category?.description}
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  console.log("slug", slug);

  const [category, attributes] = await Promise.all([
    CategoryServices.getShowingCategoryBySlug({
      slug: slug || "",
    }),

    AttributeServices.getShowingAttributes(),
  ]);

  return {
    props: {
      slug: slug,
      result: category,
      attributes: attributes,
    },
  };
};

export default CategoryScreen;
