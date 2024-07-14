export {};

// Create a type for the roles
export type Roles = "admin" | "moderator" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
