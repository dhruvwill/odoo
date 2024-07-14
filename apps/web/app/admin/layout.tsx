import React from "react";
import Sidebar from "~/components/Sidebar";

type Props = {};

export default function layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <Sidebar />
      <div className="ms-[16rem]">{children}</div>
    </div>
  );
}
