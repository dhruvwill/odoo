import React from "react";
import Navbar from "~/components/Navbar";

type Props = {};

const page = (props: Props) => {
  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)] w-full">
        User page
      </div>
    </main>
  );
};

export default page;
