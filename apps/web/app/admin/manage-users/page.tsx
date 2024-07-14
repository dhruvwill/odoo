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
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { UserFilters } from "~/components/dashboard/UserFilters";
import PageTitle from "~/components/dashboard/PageTitle";

interface AdminDashboardProps {
  searchParams: { search?: string; role?: string };
}

export default async function AdminDashboard({
  searchParams,
}: AdminDashboardProps) {
  const query = searchParams.search;
  const roleFilter = searchParams.role;

  const { data: users } = await clerkClient.users.getUserList({
    query,
  });

  const filteredUsers = roleFilter
    ? users.filter(
        (user) => (user.publicMetadata.role as string) === roleFilter,
      )
    : users;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <main className="flex-1 px-8 py-3">
          <PageTitle
            title="Users"
            subtitle={
              <p className="text-gray-600">
                Comprehensive list of all users and their roles. Only
                <span className="font-semibold text-blue-600"> Admin </span> is
                allowed to access this page.
              </p>
            }
          />

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-medium mb-4">Filters</h2>
            <UserFilters initialSearch={query} initialRole={roleFilter} />
          </section>

          <section className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.publicMetadata.role as string)}`}
                      >
                        {(user.publicMetadata.role as string) || "Unverified"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Change Role
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <form action={setRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <DropdownMenuItem>
                              <Button
                                type="submit"
                                name="role"
                                value="admin"
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                Make Admin
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button
                                type="submit"
                                name="role"
                                value="librarian"
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                Make Librarian
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button
                                type="submit"
                                name="role"
                                value="user"
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                Make User
                              </Button>
                            </DropdownMenuItem>
                          </form>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </main>
      </div>
    </div>
  );
}

function getRoleColor(role: string): string {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800";
    case "moderator":
      return "bg-yellow-100 text-yellow-800";
    case "user":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
