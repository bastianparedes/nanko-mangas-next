'use client';

import Button from "./button";
import ids from "../config/id";
import Hamburguer from "./hamburguer";
import Image from 'next/image';
import logo from './logo.png';
import useScrollDirection from "../../hooks/useScroll";
import { useState } from "react";

const Component = () => {
  const [showOptions, setShowOptions] = useState(false);
  const switchShowOptions = () =>
    setShowOptions((previousState) => !previousState);
  const scrollDirection = useScrollDirection();
  const showHeader = scrollDirection === "up";

  return (
    <header
      className="fixed flex w-full top-0 left-0 z-10 px-14 py-1 h-32 bg-orange-100/80 backdrop-blur-sm lg:px-4 md:h-20"
      style={{
        transform: (showHeader || showOptions)
          ? undefined
          : "translateY(-100%)",
        transition: "all .25s linear",
      }}
    >
      <div className="w-full h-full flex items-center">
        <div className="aspect-square h-full flex justify-center items-center">
          <div className="aspect-square h-full flex justify-center items-center">
            <Image
              alt="Logo"
              className="object-contain w-full h-full"
              placeholder="blur"
              src={logo}
            />
          </div>
        </div>
        <nav className="flex h-full grow justify-end items-center">
          <div className="h-3/5 aspect-square hidden md:flex">
            <Hamburguer onClick={switchShowOptions} open={showOptions} />
          </div>
          <ul
            className={`flex-grow flex justify-end gap-10 items-center md:absolute md:top-20 md:left-0 md:flex-col md:w-svw md:bg-white/95 md:justify-start md:h-[calc(100svh-5rem)] md:pt-10 md:-translate-x-full`}
            style={{
              transform: showOptions ? "translateX(0%)" : undefined,
              transition: "all .25s linear",
            }}
          >
            {/* {showOptions && <style>{"body {overflow: hidden}"}</style>} */}
            <Button href={"#" + ids.hero} onClick={switchShowOptions}>
              Inicio
            </Button>
            {/* <Button href={"#" + ids.about} onClick={switchShowOptions}>Acerca de mí</Button> */}
            <Button href={"#" + ids.contact} onClick={switchShowOptions}>
              ¿Cómo comprar?
            </Button>
            <Button href={"#" + ids.products} onClick={switchShowOptions}>
              Mangas disponibles
            </Button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// md:${showOptions ? 'translate-x-0' : 'translate-x-full'}
export default Component;
