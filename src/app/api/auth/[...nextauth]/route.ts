import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  callbacks: {
    async redirect() {
      return '/admin';
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'E-mail', type: 'text' },
        password: { label: 'Password', type: 'password' }
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
  ]
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
