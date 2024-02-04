const Card = ({ bgColor, title, src, href }) => {
  return (
    <article
      className={`${bgColor} py-10 px-5 max-w-sm md:max-w-md rounded-2xl`}
    >
      <h1 className="text-2xl md:text-4xl md:text-center">{title}</h1>

      <img
        src={src}
        alt={src}
        className="relative w-[18rem] h-[18rem] md:w-[25rem] md:h-[30rem] object-contain"
      />

      <a
        href={href}
        className="capitalize block text-right text-lg md:text-3xl transition ease-in duration-300 hover:underline"
      >
        get started {">"}
      </a>
    </article>
  );
};
export default Card;
