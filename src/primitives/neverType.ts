function generateError(message: string, code: number):never {
    throw {message: message, errorCode: code};
}

const result = generateError('An error occurred!', 500);
console.log(result); //스크립트가 취소되기때문에 로그가 정의되지 않음

//never타입은 아무것도 반환하지 않고 기본적으로 스크립트(또는 스크립트의 일부)를 충돌시키거나 망가뜨리기 위한 것임을 코드를 통해 알림