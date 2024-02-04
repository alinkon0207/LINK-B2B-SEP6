import { Header, Button, ButtonDemo } from '../../components';

const Sep24 = () => {
  return (
    <>
      <Header />

      <div className="flex flex-col space-y-8 bg-white rounded-md p-10 max-w-xl shadow-sm w-[100%] mx-auto my-32">
        <h1 className="text-2xl md:text-3xl text-black text-center">
          LINK WIDGET DEMO TEST.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pt-3 gap-3">
          {/* <button onClick={launchWidget}>Launch Widget</button> */}

          <ButtonDemo
            bgColor="bg-secondary"
            ringColor="ring-green-400"
            text="Buy USDC"
            textSize="text-lg"
            paddingX="px-10"
            paddingY="py-2"
            spinner={true}
            width="w-full"
            type="buy"
          />
          <ButtonDemo
            bgColor="bg-secondary"
            ringColor="ring-green-400"
            text="Sell USDC"
            textSize="text-lg"
            paddingX="px-10"
            paddingY="py-2"
            spinner={true}
            width="w-full"
            type="sell"
          />
          {/* <Button
            link={'/stellar/deposit'}
            bgColor="bg-secondary"
            ringColor="ring-green-400"
            text="Deposit"
            textSize="text-lg"
            paddingX="px-10"
            paddingY="py-2"
            spinner={true}
            width="w-full"
          />
          <Button
            link={'/user/dashboard'}
            bgColor="bg-secondary"
            ringColor="ring-green-400"
            text="Dashboard"
            textSize="text-lg"
            paddingX="px-10"
            paddingY="py-2"
            spinner={true}
            width="w-full"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Sep24;
