import { useUser } from "@clerk/nextjs";
import { Roles } from "~/types/globals";

export const checkRoleClient = (role: Roles) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return false;
  }

  return user?.publicMetadata?.role === role;
};
