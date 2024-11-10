'use client';
import axios from "axios";
import {useState} from "react";
import generate from "@/util/generate";

export default function WriteImage() {

    let [imgUrl, setImgUrl] = useState("");

    return (
        <>
            <input type={"file"} accept={"image/*"}
                   onChange={async (e) => {
                       let file = e.target.files[0];
                       let fileName = generate();
                       await axios.post("/api/post/image?file=" + fileName)
                           .then(async result => {
                               const formData = new FormData();
                               Object.entries({...result.data.fields, file}).forEach(([key, value]) => {
                                   formData.append(key, value);
                               })
                               await axios.post(result.data.url, formData)
                                   .then(uploadResult => {
                                       setImgUrl(uploadResult.config.url + "/" +fileName);
                                   });
                           })
                   }}
            />
            <input type={"hidden"} value={imgUrl} name={"imgUrl"}/>
            <img src={imgUrl} alt=""/>
        </>
    );
}