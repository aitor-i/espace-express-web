import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Toast({ children, className }: Props) {
  const [isToastOpen, setIsToastOpen] = useState(true);
  const [toastTime, setToastTime] = useState(12000);
  const [isMouseOnToast, setIsMouseOnToast] = useState(false);

  const mouseOnToastHandler = () => {
    setIsMouseOnToast(true);
  };

  const mouseOfToastHandler = () => {
    setIsMouseOnToast(false);
  };

  const toastCloseHandler = () => {
    setIsToastOpen(false);
  };

  const toastCountDown = () => {
    setTimeout(() => {
      if (isToastOpen && toastTime > 0) {
        setToastTime((prevTime) => prevTime - 100);
      }
    }, 100);
  };

  if (!isMouseOnToast && isToastOpen) toastCountDown();
  if (isToastOpen && toastTime <= 0) setIsToastOpen(false);

  return (
    <span
      onMouseEnter={mouseOnToastHandler}
      onMouseLeave={mouseOfToastHandler}
      className={`${
        isToastOpen ? "toastOn" : "toastOff"
      } glassEffect error rounded-md w-80 p-2 pt-6 min-[40]: ${className}`}
    >
      <span
        onClick={toastCloseHandler}
        className=" absolute top-1 right-2 cursor-pointer select-none z-50"
      >
        X
      </span>
      <b className="text-white">{children}</b>
    </span>
  );
}
