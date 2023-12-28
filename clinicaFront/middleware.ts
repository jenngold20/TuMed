//export { default } from "next-auth/middleware"
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl)
    console.log(request.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ROLE_ADMIN",
    },
  }
)

export const config = { matcher: ["/admin"] }
