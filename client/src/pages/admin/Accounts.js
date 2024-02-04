import { Link } from "react-router-dom";
import { AdminBalances, Navbar } from "../../components";
import { BsArrowLeft } from "react-icons/bs";

const Accounts = () => {
  return (
    <>
      <div className="mb-24 md:mb-32">
        <Navbar />
      </div>

      <main className="w-[90%] lg:w-[80%] mx-auto">
        <section className="mt-5 mb-5">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 text-primary text-xl font-medium mb-5 back rounds"
          >
            <BsArrowLeft className="text-xl font-bold" />
            <span className="block">Go back to dashoard</span>
          </Link>
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl capitalize text-gray-900">
            Partner Accounts
          </h1>
        </section>

        <div className="flex flex-wrap">
          <section className="my-5">
            <AdminBalances />
          </section>
        </div>
      </main>
    </>
  );
};

export default Accounts;
