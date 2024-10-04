import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      token: string;
    };
  }
}