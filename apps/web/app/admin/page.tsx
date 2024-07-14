"use client";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  useEffect(() => {
    redirect("admin/dashboard");
  }, []);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoaderCircle />
    </div>
  );
};

export default page;
