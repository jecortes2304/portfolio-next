import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getEnvsSecrets } from '@/config/settings'
import { AuthOptions } from "next-auth";
import connectDB from "@/utils/mongo";
import UserModel from "@/models/user";
const {jwtSecret} = getEnvsSecrets()

export const nextAuthOptions: AuthOptions = {

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials: {
                username: {
                    label: "email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                await connectDB()

                const email = credentials?.username.toLowerCase();
                const user = await UserModel.findOne({ email: email });
                if (!user) {
                    throw new Error("User does not exist.");
                }

                //validate password
                const passwordIsValid = await bcrypt.compare(
                    credentials?.password!,
                    user.password
                );

                if (!passwordIsValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id.toString(),
                    ...user,
                };
            },
        }),

    ],
    secret: jwtSecret,
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token, user}) {
            session.user = token as any;
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/login'
    }
};
