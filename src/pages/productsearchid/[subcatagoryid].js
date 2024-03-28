import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Layout from "@layout/Layout";
import MainCarousel from "@component/carousel/MainCarousel";
import SearchProductById from "@component/SearchProductById/SearchProductById";
import axios from "axios";
import CMSkeleton from "@component/preloader/CMSkeleton";

export default function productsearchid() {
  const router = useRouter().query.subcatagoryid;
  const [Data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${process.env.NEXT_PUBLIC_API_SOCKET_URL}/api/category/${router}`);
      setData(result.data);
    };

    fetchData();
  }, [router]);

  console.log(Data)
  return (
    <>
      <Layout>
        <div className="m-auto">
          <div className="bg-white">
            <div className="mx-auto py-5 max-w-screen-2xl px-3 sm:px-10">
              <div className="my-10 container">
                <h1 className="text-4xl font-semibold">
                  {Data?.name?.en}
                </h1>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                <SearchProductById route={router} />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
            <CMSkeleton
              html
              count={15}
              height={15}
              error={false}
              loading={false}
              data={Data?.description}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
