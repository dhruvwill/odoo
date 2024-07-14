// app/admin/users/page.tsx
import { redirect } from "next/navigation";
import { checkRoleServer } from "~/utils/serverUtils";
import { clerkClient, User } from "@clerk/nextjs/server";
import { setRole } from "~/actions/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Button } from "@repo/ui/components/ui/button";
// import { SearchUsers } from "~/components/SearchUser";
import Navbar from "~/components/Navbar";

interface AdminDashboardProps {
  searchParams: { search?: string };
}
export default async function AdminDashboard({
  searchParams,
}: AdminDashboardProps) {
  if (!(await checkRoleServer("admin"))) {
    redirect("/");
  }

  const query = searchParams.search;

  const { data: users } = await clerkClient.users.getUserList({
    query,
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        <p className="mb-4">
          Comprehensive list of all users and their roles. Only
          <span className="font-semibold"> Admin </span> is allowed to access
          this page.
        </p>

        {/* <SearchUsers /> */}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId,
                    )?.emailAddress
                  }
                </TableCell>
                <TableCell>
                  {(user.publicMetadata.role as string) || "N/A"}
                </TableCell>
                <TableCell>
                  <form action={setRole} className="flex justify-end gap-2">
                    <input type="hidden" value={user.id} name="id" />
                    <Button
                      type="submit"
                      name="role"
                      value="admin"
                      variant="outline"
                      size="sm"
                    >
                      Make Admin
                    </Button>
                    <Button
                      type="submit"
                      name="role"
                      value="moderator"
                      variant="outline"
                      size="sm"
                    >
                      Make Moderator
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
