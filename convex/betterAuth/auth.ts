import { betterAuth } from "better-auth";

export const authOptions = {
    database: {
        db: {},
        type: "sqlite",
    } as any,
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: "MOCK",
            clientSecret: "MOCK",
        },
        google: {
            clientId: "MOCK",
            clientSecret: "MOCK",
        },
    },
};

export const auth = betterAuth(authOptions);
