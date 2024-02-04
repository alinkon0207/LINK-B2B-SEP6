/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Spinner } from "../assets/Images";
import Widget from "./Widget";
import { Header } from "../components/";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      launchWidget();
    }, [1000]);
  };
  const launchWidget = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Header cross="none" />

      <section className=" inset-0 flex items-center justify-center">
        {/* <div className={isOpen ? "hidden" : "block"}>
        <button
          className="text-white py-2 px-8 text-lg rounded-md bg-primary flex items-center space-x-3"
          onClick={loading}
        >
          <span>Launch Widget</span>
          {isLoading && (
            <span>
              <Spinner className="h-5 w-5 animate-spin" />
            </span>
          )}
        </button>
      </div> */}

        {/* {isOpen && <Widget />} */}
        <Widget />
      </section>
    </>
  );
}
