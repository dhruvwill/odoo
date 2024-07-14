export {};

// Create a type for the roles
export type Roles = "admin" | "librarian" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
