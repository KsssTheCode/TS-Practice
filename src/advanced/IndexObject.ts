interface ErrorContainer {
    [prop: string]: string; //배열의 속성명은 string이고, 속성명의 값 또한 string (prop이 속성명이 될 것이고, 갯수는 모름)

}

const errorBag: ErrorContainer = {
    email: 'Not a valid Email', //email이 들어간 키 값에는 숫자가 들어가도 문자열로 해서고디기때문에 상관없음 ([prop:number]라면 문자열은 불가)
    userName: 'Must start with a capital character!',
    password: 'Must between 5 to 15 characters!'
}

console.log(errorBag); //Object[email: "~~", password: "~~", userName: "~~~"]