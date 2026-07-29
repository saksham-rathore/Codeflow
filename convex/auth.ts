import { MutationCtx, QueryCtx } from "./_generated/server";

// export const verifyAuth = async (ctx: QueryCtx | MutationCtx) => {
//     const identity = await ctx.auth.getUserIdentity();

//     // console.log(identity)

//     if (!identity) {
//         throw new Error("Unauthorized");
//     }

//     return identity;
// }


export const verifyAuth = async (ctx: QueryCtx | MutationCtx) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log("Identity:", identity);

    if (!identity) {
        console.error("❌ User is not authenticated");
        throw new Error("Unauthorized");
    }

    console.log("✅ User authenticated");

    return identity;
};