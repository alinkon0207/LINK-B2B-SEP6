import { Button } from '../../components';
import { Navbar } from '../../components';

const HomePage = () => {
  return (
    <>
      <div className="mb-24 md:mb-32">
        <Navbar />
      </div>
      <div className="flex flex-col space-y-8 bg-white rounded-md p-10 max-w-xl shadow-sm w-[90%] mx-auto my-32">
        <h1 className="text-2xl md:text-3xl text-black text-center">
          Admin Home Page
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 pt-3 gap-5">
          <Button
            link={'/admin/create-account'}
            bgColor="bg-secondary"
            ringColor="ring-green-400"
            text="Create Account"
            textSize="text-lg"
            paddingX="px-10"
            paddingY="py-4"
            spinner={true}
            width="w-full"
          />
          <Button
            link={'/admin/partner-accounts'}
            bgColor="bg-secondary"
            ringColor="ring-green-400"
            text="Ngn Accounts"
            textSize="text-lg"
            paddingX="px-10"
            paddingY="py-4"
            spinner={true}
            width="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
