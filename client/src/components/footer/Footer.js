import WorldMap from "../../assets/images/svg/worldmap.svg";
import { LogoWhite } from "../../constants/Images.js";

const Footer = () => {
  const newYear = new Date();
  return (
    <footer className="py-10 w-[90%] md:w-[80%] mx-auto">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        <img
          src={WorldMap}
          className="relative w-full h-72 grayscale object-contain"
          alt="world map"
        />

        <div className="hidden lg:block justify-self-end space-y-5">
          {/* <div className="flex items-center space-x-5">
            <a href="https://www.linkedin.com/mwlite/company/link-io">
              <RiLinkedinFill className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>

            <a href="https://www.twitter.com/Link_IO">
              <RiTwitterFill className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>

            <a href="https://www.instagram.com/link.io_/">
              <RiInstagramLine className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>

            <a href="#/">
              <RiWhatsappLine className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>
          </div> */}

          <a
            href="mailto:support@ngnc.online?subject=SUPPORT MAIL"
            className="text-base md:text-2xl block"
          >
            support@ngnc.online
          </a>
        </div>
      </article>

      <article className="space-y-8 my-10">
        <LogoWhite className="w-16 h-16 lg:w-24 lg:h-24" />
        <div className="text-base md:text-lg space-y-8 tracking-wider">
          <p>{newYear.getFullYear()} LINK.IO Ltd. All Rights Reserved.</p>
          <p className="md:max-w-2xl">
            © LINK.IO Ltd is a company registered in England and Wales with the
            registered company number 13581834 and its registered address at 2
            Fredrick Street, Kings Cross, London, United Kingdom, WC1X 0ND as a
            Financial intermediation not elsewhere classified Company.
          </p>
          <p className="md:max-w-3xl">
            LINKIO.Global Services Ltd. with company number 1820023 and LINK.IO
            Ltd Nigeria with company number 1820652 are duly registered with the
            Corporate Affairs Commission Nigeria with the company registered
            Address at Plot B30, Federal Housing Estate,Idoro, Akwa-Ibom,
            Nigeria.
          </p>
          <p>
            LINK is a Financial Technology company. LINK offers its products and
            services in partnership with licensed transmitters in their
            respective jurisdictions.
          </p>
          {/* <p>
            Digital assets are subject to a number of risks, including price
            volatility. Transacting in digital assets could result in
            significant losses and may not be suitable for some consumers.
            Digital asset markets and exchanges are not regulated with the same
            controls or customer protections available with other forms of
            financial products and are subject to an evolving regulatory
            environment. Digital assets do not typically have legal tender
            status and are not covered by deposit protection insurance. The past
            performance of a digital asset is not a guide to future performance,
            nor is it a reliable indicator of future results or performance.
          </p> */}
        </div>
        <div className="hidden justify-self-end space-y-5">
          {/* <div className="flex items-center space-x-5">
            <a href="https://www.linkedin.com/mwlite/company/link-io">
              <RiLinkedinFill className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>

            <a href="https://www.twitter.com/Link_IO">
              <RiTwitterFill className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>

            <a href="https://www.instagram.com/link.io_/">
              <RiInstagramLine className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>

            <a href="#/">
              <RiWhatsappLine className="bg-blackAlt p-2 rounded-full text-[2.8rem]" />
            </a>
          </div> */}

          <a
            href="mailto:support@ngnc.online?subject=SUPPORT MAIL"
            className="text-base md:text-2xl block"
          >
            support@ngnc.online
          </a>
        </div>
      </article>
    </footer>
  );
};

export const links = [
  {
    id: 0,
    title: "Home",
    href: "#",
  },
  {
    id: 1,
    title: "Order",
    href: "#",
  },
  {
    id: 2,
    title: "Track Transfers",
    href: "#",
  },
  {
    id: 3,
    title: "FAQ",
    href: "#",
  },
  {
    id: 4,
    title: "Contact",
    href: "#",
  },
  {
    id: 5,
    title: "Privacy Policy",
    href: "#",
  },
];
export default Footer;
