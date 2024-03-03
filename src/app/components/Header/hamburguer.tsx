interface Props {
  onClick: any;
  open: any;
}

const Button = ({ onClick, open }: Props) => {
  const isOpen = open === true;
  return (
    <button
      className="relative h-auto aspect-square flex justify-center items-center"
      onClick={onClick}
    >
      <div
        className={"transition-all duration-[250ms] absolute h-2 w-full rounded-2xl bg-black " +
          (!isOpen ? "top-0" : "top-1/2 rotate-[135deg] -translate-y-1/2")}
      >
      </div>
      <div
        className={"transition-all duration-[250ms] h-2 rounded-2xl bg-black " +
          (!isOpen ? "w-full" : "w-0")}
      >
      </div>
      <div
        className={"transition-all duration-[250ms] absolute h-2 w-full rounded-2xl bg-black " +
          (!isOpen
            ? "bottom-0"
            : "bottom-1/2 rotate-[-135deg] translate-y-1/2")}
      >
      </div>
    </button>
  );
};

export default Button;
