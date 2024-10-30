'use client'

import {signOut} from "next-auth/react";
import Link from "next/link";

export default function LogoutBtn() {
    return (
        <Link href="#" onClick={() => {
            signOut()
        }}>로그아웃</Link>
    )
};