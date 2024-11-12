import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a route matcher for protected routes, specifically for any path under '/dashboard'
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// Export the middleware function
export default clerkMiddleware(async (auth, req) => {
  // If the request matches a protected route, enforce authentication
  if (isProtectedRoute(req)) await auth.protect();
});

// Configuration for the middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};