'use client';

import {useRouter} from "next/navigation";

export default function DetailLink(props) {

    let router = useRouter();
    return (
        <button onClick={() => {
            router.push(`/write/${props.contentId}`)
        }}>수정</button>
    )
};