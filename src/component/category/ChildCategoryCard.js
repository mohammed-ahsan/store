import ImageWithFallback from "@component/common/ImageWithFallBack";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ChildCategoryCard = ({ category, showingTranslateValue }) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => {
          router.push(`/category/${category?.slug}`);
        }}
        className="group box-border overflow-hidden flex rounded-md shadow-sm p-2 flex-col items-center bg-white relative cursor-pointer"
      >
        <div className="relative flex justify-center 2 w-full h-44">
          <div className="relative w-full h-full">
            <ImageWithFallback
              src={
                category.icon ||
                "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
              }
              alt="category"
            />
          </div>
        </div>
        <p className="font-normal sm:text-base text-sm">
          {showingTranslateValue(category?.name)}{" "}
        </p>
      </div>
    </>
  );
};

export default ChildCategoryCard;
