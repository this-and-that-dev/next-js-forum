'use client'

import Link from "next/link";
import DetailLink from "@/app/list/DetailLink";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function ListItem({result}) {
    let router = useRouter();
    return (
        <div>
            {
                result.map((content, index) =>
                    <div className="list-item" key={index}>
                        <Link href={`/detail/${content._id}`}>
                            <h4>{content.title}</h4>
                        </Link>
                        <p>{content.content}</p>
                        <button onClick={(e) => {
                            axios.post('/api/delete', {id : content._id})
                                .then(result => {
                                    if (result.status === 200) {
                                        e.target.parentElement.style.opacity = 0;
                                        setTimeout(() => {
                                            e.target.parentElement.remove();
                                        }, 1000)
                                    }
                                });
                        }}>삭제</button><span> </span>
                        <DetailLink contentId={`${content._id}`} />
                    </div>
                )
            }
        </div>
    )
};