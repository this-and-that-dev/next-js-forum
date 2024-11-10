function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0; // 0-15 랜덤 숫자 생성
        const v = c === 'x' ? r : (r & 0x3 | 0x8); // 'x'는 0-15, 'y'는 8-11 중 하나
        return v.toString(16); // 16진수로 변환
    });
}

export default generateUUID;