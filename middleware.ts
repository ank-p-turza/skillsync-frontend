import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const { pathname } = req.nextUrl;

  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // only dashboard is added for now
  if (!token && (pathname.startsWith("/dashboard"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    try{

        // axios and next/headers cookies() typically doesnt work in the edge runtime
        // so conventional fetch and res.headers.append() is used here
        const response = await fetch("http://localhost:4000/learner/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        if(!response.ok){
            response.headers.append(
                "Set-Cookie",
                `access_token=''; HttpOnly; path=/; Max-Age=0; SameSite=Strict; ""`
            );
        }
        const data = await response.json();
        if(data.isOkay === true){
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }
    catch(error : any){
        const response = NextResponse.next();
        response.cookies.set({
        name: "access_token",
        value: "",
        path: "/",
        maxAge: 0,
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/|favicon.ico).*)',
  ],
};
