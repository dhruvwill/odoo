import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "~/components/Sidebar";
import { checkRoleServer } from "~/utils/serverUtils";

type Props = {};

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await checkRoleServer("admin"))) {
    redirect("/");
  }
  return (
    <div>
      <Sidebar />
      <div className="ms-[16rem]">{children}</div>
    </div>
  );
}
