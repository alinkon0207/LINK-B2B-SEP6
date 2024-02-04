import { useState } from "react";
import { Tab } from "@headlessui/react";
import { BuyNGNC } from "./BuyNGNC";
import { SellNGNC } from "./SellNGNC";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Widget() {
  const [categories] = useState({
    " Buy NGNC": 0,
    // "Sell NGNC": 1,
  });

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-white rounded-t-md">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-lg font-medium leading-5",
                  selected ? "text-blue-700" : "text-slate-400 "
                )
              }
            >
              {category}
            </Tab>
          ))}
          <div className="relative">
            <Link
              to="/user/dashboard"
              className="flex items-center space-x-3 text-primary text-base font-medium mb-5 bg-primary p-1 rounded-md bg-opacity-20 absolute right-5 top-2"
            >
              <CgClose className="text-xl" />
            </Link>
          </div>
        </Tab.List>
        <Tab.Panels className="bg-white rounded-b-md py-3">
          <Tab.Panel className="px-5 py-3">
            <BuyNGNC />
          </Tab.Panel>
          <Tab.Panel className="px-5 py-3">
            <SellNGNC />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
