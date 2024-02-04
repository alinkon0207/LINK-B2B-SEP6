import { useState } from "react";
import { CgClose, CgMenu } from "react-icons/cg";
import { LogoWhite } from "../../constants/Images.js";

const Navigation = () => {
  const [action, setAction] = useState(false);

  return (
    <nav className="rounded-br-3xl rounded-bl-3xl backdrop-blur-xl transition-all bg-[#ffffff13]">
      <div className="flex items-center justify-between w-[90%] md:w-[80%] mx-auto">
        <LogoWhite className="w-16 h-16 lg:w-24 lg:h-24" />
        <div className="hidden lg:flex items-start space-x-20 text-lg md:text-2xl text-gray-300">
          {/* <a
            href="https://www.linkio.africa"
            className="hover:text-primary transition ease-out duration-150"
          >
            Personal
          </a> */}

          <a
            href="/"
            className="hover:text-primary transition ease-out duration-150 text-primary"
          >
            Business
          </a>
        </div>
        <div>
          <a
            href="mailto:support@ngnc.online?subject=CONTACT SALES"
            className="hidden lg:block capitalize bg-primaryAlt rounded-md py-3 px-14 text-lg"
          >
            contact sales
          </a>
        </div>
        <button className="block lg:hidden " onClick={() => setAction(!action)}>
          {action ? (
            <CgClose className="text-3xl md:text-4xl" />
          ) : (
            <CgMenu className="text-3xl md:text-4xl" />
          )}
        </button>
      </div>
      {action && (
        <div className="w-[90%] md:w-[80%] mx-auto space-y-5 py-5">
          <div className="flex flex-col space-y-3">
            {/* <a
              href="/"
              className="hover:text-primary transition ease-out duration-150"
            >
              Personal
            </a> */}

            <a
              href="/"
              className="hover:text-primary transition ease-out duration-150 text-primary"
            >
              Business
            </a>
          </div>
          <div>
            <a
              href="mailto:support@ngnc.online?subject=CONTACT SALES"
              className="inline-block capitalize bg-primaryAlt rounded-md py-2 px-8 text-base"
            >
              contact sales
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navigation;
