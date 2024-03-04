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
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
