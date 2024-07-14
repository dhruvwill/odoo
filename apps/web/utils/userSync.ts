import { db } from "~/lib/db";
import { Role } from "@prisma/client";

export async function handleUserCreated(userData: any) {
  const id = userData.id;
  const email = userData.email_addresses[0].email_address;
  const role: Role = "USER";
  const name = `${userData.first_name} ${userData.last_name}`;

  console.log("User created:", userData);

  try {
    const user = await db.user.create({
      data: {
        id,
        email,
        role,
        name,
      },
    });
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function handleUserUpdated(userData: any) {
  const { id, email, role } = userData;
  const name = `${userData.first_name} ${userData.last_name}`;
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        name,
        email,
        role: role as Role,
      },
    });
    console.log("User updated successfully:", user);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export async function handleUserDeleted(userData: any) {
  const { id } = userData;
  try {
    const user = await db.user.delete({
      where: { id },
    });
    console.log("User deleted successfully:", user);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
