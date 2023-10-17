import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Toast({ children }: Props) {
  return <span className="toast glassEffect warn">{children}</span>;
}
