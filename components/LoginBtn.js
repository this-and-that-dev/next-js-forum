'use client'

import {signIn} from "next-auth/react";
import Link from "next/link";

export default function LoginBtn() {
    return (
        <Link href="#" onClick={() => {
            signIn()
        }}>로그인</Link>
    )
};