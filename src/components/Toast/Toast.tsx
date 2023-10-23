import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Toast({ children, className }: Props) {
  return (
    <span className={` toast glassEffect warn rounded-md  ${className}`}>
      {children}
    </span>
  );
}
