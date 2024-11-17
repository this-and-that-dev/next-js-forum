'use client'

import {useEffect} from "react";
import Cookies from 'js-cookie';
import {useRouter} from "next/navigation";

export default function Darkmode(props) {

    let darkMode = props.darkmode;
    let router = useRouter();
    useEffect(() => {
        let darkMode = Cookies.get('dark-mode');
        if (darkMode === undefined) {
            Cookies.set('dark-mode', 'light', {expires: 7});
        }

    }, []);

    return (
        <span onClick={() => {
            let darkMode = Cookies.get('dark-mode');
            if (darkMode === 'light') {
                Cookies.set('dark-mode', 'dark', {expires: 7});
            } else {
                Cookies.set('dark-mode', 'light', {expires: 7});
            }
            router.refresh();
        }}>
            { darkMode === 'light' ? '🌙' : '🌑'}</span>
    )
}