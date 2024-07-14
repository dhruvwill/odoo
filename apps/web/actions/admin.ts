"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface SetRoleResult {
  success: boolean;
  error?: string;
}

export async function setRole(formData: FormData): Promise<SetRoleResult> {
  const userId = formData.get("id") as string;
  const newRole = formData.get("role") as string;

  if (!userId || !newRole) {
    return { success: false, error: "Invalid input" };
  }

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: newRole },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error changing user role:", error);
    return { success: false, error: "Failed to change user role" };
  }
}
