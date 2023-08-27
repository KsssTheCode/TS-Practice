let userInput1:unknown;

userInput1 = 5;
userInput1 = 'a';
//이까지는 오류를 발생시키지 않음

let userInput2:string;
//userName = userInput;
//unknown타입은 any타입과 다르게 '알 수 없는'타입이라는 것을 확실히 명시하기떄문에
//명확한 string타입을 대입하면 오류가 발생

//만약 unknown타입에 명시된타입을 대입하고 싶다면
if(typeof userInput1 === 'string'){
    userInput2 = userInput1;
}
//과 같이 추가적인 타입검사가 요구됨

// => 따라서 unknown 타입은 할 수 없는 작업을 알 수 있도록 타입검사를 수행할 수 있다는 점에서 any타입과 대비하여 장점이 있음