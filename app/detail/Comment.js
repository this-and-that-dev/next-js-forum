'use client';

import {useEffect, useState} from "react";
import axios from "axios";

export default function Comment({contentId}) {

    let [comment, setComment] = useState('');
    let [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('/api/comment?contentId=' + contentId)
            .then((result) => {
                setComments(result.data);
            })
    }, []);

    return (<div>
            <div>댓글 목록 보여줄 부분</div>
            <hr></hr>
            {
                comments.length > 0 ?
                    comments.map((comment, index) => {
                        return <p key={index}>{comment.comment}</p>;
                    }) : null
            }
            <input type={"text"} onChange={(e) => {
                setComment(e.target.value);
            }}/>
            <button onClick={() => {
                axios.post("/api/comment", {comment: comment, contentId: contentId})
                    .then(result => {
                        let newComments = [...comments];
                        newComments.push({
                            comment : comment
                        })
                        setComments(newComments);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }}>댓글 전송
            </button>
        </div>
    )
};