import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;  // Agregamos el campo accessToken al tipo Session
  }

  interface User {
    token?: string;  // Extiende el tipo User con un campo token opcional
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;  // Agregamos el campo accessToken al tipo JWT
  }
}
