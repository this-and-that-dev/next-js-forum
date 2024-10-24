export default function handler(request, response) {
    console.log(request.query);
    console.log(request.query.goodsNo)
    response.status(200).json("성공");
};