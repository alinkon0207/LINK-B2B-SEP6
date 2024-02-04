/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Jarvis from "../assets/jarvis.svg";
import Solana from "../assets/solana.svg";
import Stellar from "../assets/stellar.svg";
import Polygon from "../assets/polygon.svg";

import { useDispatch, useSelector } from "react-redux";
import { selectNet, selectIndex } from "../features/networkInputSlice";

const networks = [
  {
    id: 0,
    name: "Select network",
  },
  {
    id: 1,
    name: "Stellar",
    icon: Stellar,
    address: "GAQQ7TWRSU4SFXX63QUN23NIF7DSCB6QMUPJAMKTKFSV6MNYIKVJVBKP",
    network: "Stellar",
  },
  {
    id: 2,
    name: "Solana",
    icon: Solana,
    address: "5KUTbaX1DvpPZb6h1Wypyy9PHt8FMxbypdPg9BSjz89M",
    network: "Solana",
  },
  {
    id: 3,
    name: "Polygon",
    icon: Polygon,
    address: "0x2186030a127D970fa7B17E53F3fD8550D17394A5",
    network: "Polygon",
  },
  {
    id: 4,
    name: "Jarvis - JNGN (Polygon)",
    icon: Jarvis,
    address: "0x2186030a127D970fa7B17E53F3fD8550D17394A5",
    network: "Polygon",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const NetworkSelector = () => {
  const dispatch = useDispatch();
  const index = useSelector(selectIndex);

  const [selected, setSelected] = useState(networks[index]);

  useEffect(() => {
    select();
  });

  const select = () => {
    dispatch(
      selectNet({
        network: selected.network,
        index: index,
        name: selected.name,
        address: selected.address,
      })
    );
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="text-slate-500 text-sm ">
            Network
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-[#F3F4F6] rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none sm:text-sm">
              <span className="flex items-center">
                {selected.icon && (
                  <img
                    src={selected.icon}
                    alt=""
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate text-lg text-gray-600">
                  {selected.name}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {networks.map((network) => (
                  <Listbox.Option
                    key={network.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-primary" : "text-gray-900",
                        "cursor-pointer select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={network}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {network.icon && (
                            <img
                              src={network.icon}
                              alt=""
                              className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                          )}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {network.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
