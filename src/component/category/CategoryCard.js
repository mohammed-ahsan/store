import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

//internal import
import { SidebarContext } from "@context/SidebarContext";

const CategoryCard = ({ title, slug, icon, id }) => {
  const router = useRouter();
  const { closeCategoryDrawer } = useContext(SidebarContext);

  // react hook
  const [show, setShow] = useState(false);

  // handle show category
  const showCategory = (id, slug) => {
    setShow(!show);
    router.push(`/productsearchid/${id}`);
    closeCategoryDrawer();
  };

  return (
    <>
      <div
        onClick={() => showCategory(id, slug)}
        className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
        role="button"
      >
        {icon ? (
          <Image src={icon} width={18} height={18} alt="Category" />
        ) : (
          <Image
            src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
            width={18}
            height={18}
            alt="category"
          />
        )}

        <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-emerald-600">
          {title}
          {/* {nested?.length > 0 && (
            <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
              {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
            </span>
          )} */}
        </div>
      </div>
      {/* {show && nested.length > 0 && (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {nested.map((children) => (
            <li key={children._id}>
              <a
                onClick={() => handleSubCategory(children._id, children?.slug)}
                className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
              >
                <span className="text-xs text-gray-500 pr-2">
                  <IoRemoveSharp />
                </span>
                {showingTranslateValue(children.name)}
              </a>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
};

export default CategoryCard;
