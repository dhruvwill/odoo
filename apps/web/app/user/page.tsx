import { Separator } from "@repo/ui/components/ui/separator";
import React from "react";
import SearchBar from "~/components/dashboard/SearchBar";
import ProfileCard from "~/components/user/ProfileCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="h-[calc(100vh-64px)] max-w-7xl mx-auto px-8">
      <div className="mx-auto flex flex-col-reverse md:flex-row gap-3 w-full justify-between py-5">
        <div className="md:w-2/3 w-full flex flex-col items-center justify-between gap-5">
          <div className="w-full">
            <h1 className="text-xl font-semibold my-0">Search For Books</h1>
            <Separator className="my-3 h-[2px]" />
            <SearchBar className="w-full" />
          </div>
          <div className="flex-grow w-full my-3">
            <h1 className="text-xl font-semibold my-0">My Books</h1>
            <Separator className="my-3 h-[2px]" />
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="p-6">
                {/* <h2 className="text-lg font-semibold mb-4">My Books</h2> */}
                <div className="flex justify-between mb-4 gap-2">
                  <Input className="w-full" placeholder="Search books..." />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Filter</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>All</DropdownMenuItem>
                      <DropdownMenuItem>Fiction</DropdownMenuItem>
                      <DropdownMenuItem>Non-fiction</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>To Kill a Mockingbird</TableCell>
                      <TableCell>Harper Lee</TableCell>
                      <TableCell>Fiction</TableCell>
                      <TableCell>1960</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1984</TableCell>
                      <TableCell>George Orwell</TableCell>
                      <TableCell>Fiction</TableCell>
                      <TableCell>1949</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>The Great Gatsby</TableCell>
                      <TableCell>F. Scott Fitzgerald</TableCell>
                      <TableCell>Fiction</TableCell>
                      <TableCell>1925</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <ProfileCard />
      </div>
    </main>
  );
};

export default page;
