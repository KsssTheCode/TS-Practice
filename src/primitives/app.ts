function testAdd(a1:number, a2:number) { //이 경우, testA함수의 반환타입은 typescript의 추론에 의해 number타입을 반환
    return a1 + a2;
}

/*
//이 경우, testAdd2의 함수는 string타입을 반환하지만, 내부구문은 number를 도출해내고 있으므로 오류가 발생
function testAdd2(b1: number, b2:number): string { 
    return n1 + n2;
}
*/

/* void type **********************************************************************************************************************************************/
console.log('-----void type-----');

function testVoid(c:number) /*:Void 가 생략되어있음*/{ //이 경우, testC는 return구문이 없어 반환값이 없으므로 void타입으로 인식됨
    console.log('Result: ' + c);
}

testVoid(testAdd(1,10)); //testAdd의 결과를 c가 받아 출력하므로 11이 출력
console.log(testVoid(testAdd(1,10))); //testVoid(testAdd(1.10))에 의해 11이 한 번 출력되고, console.log(testVoid)는 반환값이 없으므로 undefined가 출력됨

function testUndefined(d:number): undefined { //undefined타입은 typescript가 값을 반환하지 않는 반환문이 있을 것이라고 여김 => 따라서, undefined를 생성해야함수가 있을 때만 사용
    console.log(d);
    return;
}

/* function type ********************************************************************************************************************************************/
console.log('-----function type-----');

//let testInjectFunc: Function; //testInjectFunc가 단순히 함수임을 명시
let testInjectFunc: (a:number, b:number) => number; //testInjectFunc가 어떠한 매개변수를 받고 어떠한 결과를 반환하는지 명시 
testInjectFunc = testAdd;
//testInjectFunc = 1; 
console.log(testInjectFunc(1,1)); //testInjectFunc함수가 testAdd함수를 실행시켜 2가 반환됨

//만약, 형식에 맞지 않는 함수를 주입하는 경우, undefined를 반환
//이 경우에서 함수의 형식을 정해주지 않을 경우 오류를 잡아줄 수 없음
//testInjectFunc = testVoid;
//console.log(testInjectFunc(1,1)); //undefined

/* callback ********************************************************************************************************************************************/
console.log('-----callback type-----');

function testCallback(e: number, f:number, cb:(g:number)=> void){
    const result = e + f;
    cb(result);
}

testCallback(1, 2, (result) => {
    console.log(result);
    return result; //이미 cb의 반환값은 없다고 명시했기때문에 이 구문은 무시됨 (값을 반환하는 어떠한 작업도 수행하지 않음)
})

//이 부분에서 Callback의 이점 : 이미 result가 number임이 확실해저 추가적으로 number타입임을 명시하지 않고도 작업이 가능