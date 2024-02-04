import { Link } from "react-router-dom";
import Converter from "../../assets/images/png/converter.png";
import Dashboard from "../../assets/images/png/dashboard.png";
import Send from "../../assets/images/png/send.png";
import { Card, Footer, Navigation } from "../../components";

export default function Home() {
  // const [isOpen, setIsOpen] = useState(false);

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }
  return (
    <div className="bg-black">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>

      <main className="w-[90%] md:w-[80%] mx-auto">
        <header className="space-y-10 md:space-y-10 lg:space-y-20 py-10 md:py-20 lg:py-32">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold md:text-center md:max-w-8xl mx-auto tracking-wide">
            Cross border payment infrastructure for Africa
            <span className="inline md:hidden text-primaryAlt text-4xl">.</span>
          </h1>
          <p className="md:text-center text-base md:text-lg lg:text-xl md:max-w-7xl mx-auto ">
            We help businesses accept payments and send payouts globally in one
            unified platform. Move money leveraging traditional payment rails
            and do business in a more global, scalable and efficient way through
            hybrid infrastructure. LINK seamlessly connects these worlds
          </p>
          <div className="flex flex-wrap justify-center items-center space-y-5 md:space-y-0 md:space-x-14">
            <Link
              to="/user/kyb"
              className="text-center capitalize bg-primaryAlt rounded-md py-4 px-16 text-lg w-full md:w-auto"
            >
              Join now
            </Link>

            <a
              href="mailto:support@ngnc.online?subject=CONTACT SALES"
              className="text-center capitalize bg-blackAlt rounded-md py-4 px-16 text-lg w-full md:w-auto inline-block"
            >
              contact sales
            </a>
          </div>
        </header>
        {/* 
        <section className="flex flex-wrap lg:flex-nowrap items-center justify-between py-10 md:py-14 lg:py-32">
          <img
            src={Naira}
            alt="naira"
            className="relative h-[20rem] md:h-[30rem] w-full object-contain"
          />

          <div className="space-y-10 max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              NGNC: Bridging Africa’s internet of value with a digital Naira
              stablecoin
            </h1>
            <p className="text-base md:text-lg ">
              NGN (Naira) Coin (NGNC) represents a major breakthrough in how we
              use money. Digital Naira works like other digital content — they
              move at the speed of the internet, can be exchanged in the same
              way we share content, and are cheaper and more secure than
              existing payment systems.And more intrestingly it makes the Naira
              more globally traded connecting Africa to the world.
            </p>

            <a
              href="https://www.linkio.africa/ngnc"
              className="capitalize bg-blackAlt rounded-full py-4 px-14 text-lg inline-block"
            >
              learn about NGNC
            </a>
          </div>
        </section> */}

        {/* <section className="md:text-center space-y-8 md:space-y-14 my-20 md:my-10 lg:py-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide max-w-3xl mx-auto">
            Partnering with payments & technology leaders
          </h1>
          <p className="text-base md:text-lg  max-w-6xl mx-auto pb-14">
            Working together, we help people and businesses build with NGNC and
            powerful payments infrastructure to reach new customers, enhance
            products and create more financial inclusion for Africans.
          </p>

          <div className="bg-primaryAlt text-left grid grid-cols-1 lg:grid-cols-2 items-center justify-center py-8 px-6 md:p-16 rounded-xl">
            <div className="space-y-10 max-w-md">
              <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                Put NGNC to work across multiple blockchains
              </h1>
              <p className="text-base md:text-lg ">
                Wallet developers, exchanges and custodians can now take
                advantage of NGNC’s availability on a growing roster of public
                blockchains to power cross border payments.
              </p>
              <button
                className="capitalize bg-[#635ADE] rounded-md py-4 px-20 text-lg w-full md:w-auto"
                onClick={openModal}
              >
                learn more
              </button>
            </div>
            <div className="flex lg:grid grid-cols-1 md:grid-cols-2 items-center justify-items-between lg:justify-items-end gap-1 lg:gap-5 scrollbar-hide overflow-scroll lg:overflow-visible mt-16 mb-5">
              <div className=" bg-black py-5 px-2 lg:p-10 flex items-center justify-center rounded-md lg:rounded-xl  lg:w-[80%] xl:w-[70%] md:transform lg:-translate-y-8 lg:-translate-x-8">
                <img
                  src={Stellar}
                  alt=""
                  className="relative h-[1rem] w-[30rem] md:h-[4rem] md:w-[10rem] object-contain lg:object-contain block"
                />
              </div>
              <div className=" bg-black py-5 px-2 lg:p-10 flex items-center justify-center rounded-md lg:rounded-xl lg:w-[80%] xl:w-[70%] md:transform lg:translate-y-8 xl:translate-x-10 xl:translate-y-4">
                <img
                  src={Avalanche}
                  alt=""
                  className="relative h-[1rem] w-[30rem] md:h-[6rem] md:w-[20rem] object-contain lg:object-contain block"
                />
              </div>
              <div className=" bg-black py-5 px-2 lg:p-10 flex items-center justify-center rounded-md lg:rounded-xl lg:w-[80%] xl:w-[70%] md:transform lg:-translate-y-5 lg:-translate-x-14">
                <img
                  src={Solana}
                  alt=""
                  className="relative h-[1rem] w-[30rem] md:h-[4rem] md:w-[10rem] object-scale-down lg:object-contain block"
                />
              </div>
              <div className=" bg-black py-5 px-2 lg:p-10 flex items-center justify-center rounded-md lg:rounded-xl lg:w-[80%] xl:w-[70%] md:transform lg:translate-y-10">
                <img
                  src={Celo}
                  alt=""
                  className="relative h-[1rem] w-[30rem] md:h-[4rem] md:w-[10rem] object-cover lg:object-contain block"
                />
              </div>
              <div className=" bg-black py-5 px-2 lg:p-10 flex items-center justify-center rounded-md lg:rounded-xl lg:w-[80%] xl:w-[70%] md:transform lg:-translate-y-2 lg:translate-x-16 xl:translate-x-20">
                <img
                  src={Polygon}
                  alt=""
                  className="relative h-[1rem] w-[30rem] md:h-[4rem] md:w-[10rem] object-cover lg:object-contain block"
                />
              </div>
            </div>
            <div className="flex lg:hidden space-x-2 items-center justify-self-end">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-[#ffffff5d]"></div>
              <div className="w-2 h-2 rounded-full bg-[#ffffff5d]"></div>
            </div>
          </div>
          <div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="my-8 relative">
                          <CgClose
                            className="text-xl md:text-2xl text-black cursor-pointer absolute -top-8 right-0"
                            onClick={closeModal}
                          />
                        </div>
                        <Dialog.Title
                          as="h3"
                          className="text-2xl md:text-4xl lg:text-center max-w-sm mx-auto font-bold leading-10 text-[#011E10]"
                        >
                          Experience the power of Multichain NGNC
                        </Dialog.Title>
                        <div className="my-8 flex flex-col md:flex-row md:items-center justify-between">
                          <img
                            src={Multichain}
                            alt="naira"
                            className="relative h-[15rem] md:h-[15rem] w-full object-contain"
                          />

                          <div className="text-black max-w-md space-y-5">
                            <h2 className="text-xl md:text-3xl font-bold max-w-sm">
                              Multiple chains. Multiple rails.
                            </h2>
                            <p className="text-base md:text-xl">
                              NGNC is available on many of the {"world's"}
                              leading blockchains, with more chain integrations
                              expected. We’re building a network of
                              possibilities for NGNC.
                            </p>
                            <ul className="text-primaryAlt grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
                              <li>
                                <a href="https://stellar.expert/explorer/public/asset/NGNC-GASBV6W7GGED66MXEVC7YZHTWWYMSVYEY35USF2HJZBLABLYIFQGXZY6-1">
                                  STELLAR NGNC
                                </a>
                              </li>
                              <li>
                                <a href="https://polygonscan.com/token/0xab9ad9089f23e6779a8727900709427719f753e1">
                                  POLYGON NGNC
                                </a>
                              </li>
                              <li>
                                <a href="https://solscan.io/token/52GzcLDMfBveMRnWXKX7U3Pa5Lf7QLkWWvsJRDjWDBSk">
                                  SOLANA NGNC
                                </a>
                              </li>
                              <li>
                                <a href="#/">TERRA NGNC</a>
                              </li>
                              <li>
                                <a href="#/">CELO NGNC</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </section> */}

        <section className="py-8 lg:my-10 lg:space-y-0">
          <div className="space-y-10 lg:space-y-14 md:text-center ">
            <button className="capitalize bg-[#635ADE] rounded-md py-2 px-10 text-base cursor-none">
              LINK Account
            </button>
            <h1 className="text-2xl md:text-5xl font-bold tracking-wide max-w-xl mx-auto">
              Your home for business growth
            </h1>
            <p className="text-base md:text-lg  max-w-4xl mx-auto pb-14">
              Send and receive money all through a single portal for payment.
            </p>
          </div>
          <img
            src={Dashboard}
            alt=""
            className="object-contain relative w-full h-[50rem] lg:w-[80%] lg:h-[40rem] mx-auto transform -my-72 md:-my-40 lg:translate-y-0"
          />
        </section>

        <section className="flex flex-wrap-reverse items-center justify-center lg:justify-evenly gap-y-16 md:-my-20 lg:my-32">
          <Card
            bgColor="bg-secondaryAlt"
            title="Programmatic, fast and global payment with our simple API"
            src={Send}
            href="/auth/login"
          />
          <Card
            bgColor="bg-tertiaryAlt"
            title="Lightning on- and off- ramps with super low fees."
            src={Converter}
            href="/auth/login"
          />
        </section>

        <section className=" mt-60 mb-20 lg:my-40 text-center space-y-10">
          <h1 className="text-2xl md:text-5xl font-bold tracking-wide max-w-xl mx-auto">
            Join LINK Business
          </h1>
          <div className="flex flex-wrap justify-center items-center space-y-5 md:space-y-0 md:space-x-14">
            <Link
              to="/user/kyb"
              className="text-center capitalize bg-primaryAlt rounded-md py-4 px-16 text-lg w-full md:w-auto"
            >
              Join now
            </Link>

            <a
              href="mailto:support@ngnc.online?subject=CONTACT SALES"
              className="text-center capitalize bg-blackAlt rounded-md py-4 px-16 text-lg w-full md:w-auto inline-block"
            >
              contact sales
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
