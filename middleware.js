import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(request) {
    const session = await getToken({req : request});
    if (request.nextUrl.pathname.startsWith("/write")) {
        if (session === null) {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url))
        } else {
            return NextResponse.next();
        }
    }



}