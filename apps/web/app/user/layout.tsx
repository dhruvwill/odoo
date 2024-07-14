import React from "react";
import Navbar from "~/components/Navbar";

type Props = {};

export default function layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
