"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  useEffect(() => {
    redirect("admin/dashboard");
  }, []);
  return <div>dashboard</div>;
};

export default page;
