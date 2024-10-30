'use client'

import Link from "next/link";
import DetailLink from "@/app/list/DetailLink";
import axios from "axios";

export default function ListItem({result}) {
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

                            axios.post('/api/delete', {id: content._id, regId : content.regId })
                                .then(result => {
                                    if (result.status === 200) {
                                        e.target.parentElement.style.opacity = 0;
                                        setTimeout(() => {
                                            e.target.parentElement.remove();
                                        }, 1000)
                                    }
                                })
                                .catch((e) => {
                                    if (e.status === 403) {
                                        alert("너가 쓴거 아님 ㅅㄱ");
                                    } else if (e.status === 401) {
                                        alert("로그인 하셈 ㅅㄱ");
                                    } else {
                                        alert(e.response.data)
                                    }
                                });

                        }}>삭제</button>
                        <span> </span>
                        <DetailLink contentId={`${content._id}`}/>
                    </div>
                )
            }
        </div>
    )
};