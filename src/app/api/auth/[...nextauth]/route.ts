import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Definir las credenciales
interface Credentials {
  username: string;
  password: string;
}

// Extender la interfaz User para incluir el token
interface IAuthUser extends User {
  token: string;
}

// Tipo para el token de autenticación
interface IAuthToken {
  token: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<IAuthUser | null> {
        if (!credentials) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data: IAuthToken = await res.json();

        if (data.token) {
          // Si el login es exitoso, retorna el usuario con el token
          return { id: "1", name: "User", email: "user@example.com", token: data.token };
        } else {
          // Si no, retorna null
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Asegurarse de que user es de tipo IAuthUser
      if (user) {
        token.accessToken = (user as IAuthUser).token; // Aquí se accede correctamente al token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Tipar el accessToken
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
