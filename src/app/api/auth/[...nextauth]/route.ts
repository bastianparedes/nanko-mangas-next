import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  callbacks: {
    async redirect() {
      return '/admin';
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text', placeholder: 'admin' },
        password: { label: 'Contraseña', type: 'password', placeholder: '132' }
      },
      async authorize(credentials, _req) {
        if (
          process.env.ADMIN_USER !== undefined &&
          process.env.ADMIN_PASSWORD !== undefined &&
          credentials?.username === process.env.ADMIN_USER &&
          credentials?.password === process.env.ADMIN_PASSWORD
        )
          return { email: process.env.ADMIN_USER, id: process.env.ADMIN_USER };

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60 // 30 minutes
  }
});

export { handler as GET, handler as POST };
