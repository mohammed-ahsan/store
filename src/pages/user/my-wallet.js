import Link from "next/link";
import Dashboard from "./dashboard";
import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
const packages = [
  {
    name: "Starter Package",
    points: 5,
    price: 5,
  },
  {
    name: "Essential Package",
    points: 10,
    price: 10,
  },
  {
    name: "Basic Package",
    points: 20,
    price: 20,
  },
  {
    name: "Standard Package",
    points: 50,
    price: 50,
  },
  {
    name: "Premium Package",
    points: 100,
    price: 100,
  },
  {
    name: "Advanced Package",
    points: 200,
    price: 200,
  },
  {
    name: "Professional Package",
    points: 500,
    price: 500,
  },
  {
    name: "Enterprise Package",
    points: 1000,
    price: 1000,
  },
];

const Wallet = () => {
  const {
    state: { userInfo },
  } = useContext(UserContext);

  return (
    <Dashboard>
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r bg-[#10B981] to-green-300 dark:from-green-800 dark:to-green-600 shadow-lg rounded-lg p-8 mb-8">
            <h2 className="text-lg font-semibold text-white text-shadow">
              Your Balance
            </h2>
            <p className="text-4xl font-bold text-white text-shadow mt-3">
              ${userInfo?.balance ? userInfo.balance : "0"}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-700 shadow rounded-lg p-4 w-full md:w-[290px]"
              >
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
                  {pkg.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  {pkg.points} Points
                </p>
                <p className="text-[#10B981] dark:text-blue-300 font-bold text-xl">
                  ${pkg.price}
                </p>
                <Link href={`/checkout?price=${pkg.price}`}>
                  <button className="mt-4 bg-[#10B981] hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Buy Now
                  </button>
                </Link>
              </div>
            ))}
            <div className="bg-white dark:bg-zinc-700 shadow rounded-lg p-4">
              <h2 className="text-xl font-bold">Custom Package</h2>
              <p>Buy Custom Points</p>
              <input
                type="text"
                placeholder="Enter your points"
                className="mt-4 w-full p-2 border rounded border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-300"
              />
              <button className="mt-4 bg-[#10B981] hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Wallet;
