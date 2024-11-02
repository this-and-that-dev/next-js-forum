'use client';

import {useState} from "react";
import axios from "axios";

export default function Comment({contentId}) {

    let [comment, setComment] = useState('');

    return (
        <div>
            <div>댓글 목록 보여줄 부분</div>
            <input type={"text"} onChange={(e) => {
                setComment(e.target.value);
            }}/>
            <button onClick={() => {
                axios.post("/api/comment", {comment : comment, contentId : contentId})
                    .then(result => {
                        console.log(result);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }}>댓글 전송</button>
        </div>
    )
};