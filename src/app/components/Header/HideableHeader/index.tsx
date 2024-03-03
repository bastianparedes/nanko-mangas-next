import useScrollDirection from "../../../hooks/useScroll.js";
import Header from "../index";
import { useState } from "react";

const Component = () => {
  const [showOptions, setShowOptions] = useState(false);
  const switchShowOptions = () =>
    setShowOptions((previousState) => !previousState);
  const scrollDirection = useScrollDirection();
  const showHeader = scrollDirection === "up";

  return (
    <Header
      showHeader={showHeader}
      showOptions={showOptions}
      switchShowOptions={switchShowOptions}
    />
  );
};

export default Component;
