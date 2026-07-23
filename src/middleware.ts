// import { clerkMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware()

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)",
//     "/(api|trpc)(.*)",
//     "/__clerk/:path*",
//   ],
// };


// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|fontawesome|ttf|woff2?|png|jpg|jpeg|gif|svg|svgz|ico|cur|heic|heif|avif|webp|mp4|webm|wav|mp3|m4a|aac|oga|ogg|flac|spx|mov|mkv|3gp|3g2|avi|wmv|asf|m4v|m4p|m4b|m4r|m4v|pdf|doc|docx|xls|xlsx|ppt|pptx|zip|tar|gz|bz2|7z|rar|iso)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};