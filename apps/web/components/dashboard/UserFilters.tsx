// components/UserFilters.tsx
"use client";

import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import React from "react";

interface UserFiltersProps {
  initialSearch?: string;
  initialRole?: string;
}

export function UserFilters({ initialSearch, initialRole }: UserFiltersProps) {
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("search", e.target.value);
    router.push(`?${searchParams.toString()}`);
  };

  const handleRoleChange = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("role", value);
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="flex space-x-4">
      <Input
        placeholder="Search users..."
        className="max-w-sm"
        defaultValue={initialSearch}
        onChange={handleSearchChange}
      />
      <Select defaultValue={initialRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="librarian">Librarian</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="unverified">Unverified</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
