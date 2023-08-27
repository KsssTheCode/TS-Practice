console.log('-----number TYPE-----');
function add(n1: number, n2: number) {
    const result = n1 + n2;
    return result;
}

const addResult = add(1, 2);
console.log(addResult);

/**************************************************************v**********************************************************************************************/

console.log('-----string, array, object, tuple, enum TYPE-----');
enum Authority {ADMIN, NORMAL, GUEST}; //enum : Authority.ADMIN 또는 1, Authority.NORMAL 또는 2, Authority.GUEST 또는 3 의 값으로 사용 가능
                                       //시작 번호를 변경하고 싶을 경우, {ADMIN = 5, ...}로 시작숫자변경가능
                                       //각 값에 ' = x '로 대입도 가능

const person3: {
    name: string, //string : 문자열타입만 허용
    age: number, //number : 숫자타입만 허용
    hobbies: string[],//array : 한 배열 안에 특정 선택 타입만 허용
    phone: (string | number)[],
    role: [number, string], //tuple : 한 배열 안에 길이제한과 타입제한을 할 수 있는 기능
                           //단, push와 같이 예외적으로 오류를 표시해주지 않는 경우도 있음
    authority: Authority
} = {
    name: 'Kang',
    age : 28, 
    hobbies: ['Sports', 'Cooking'],
    phone: [123, 'iPhone11Pro'],
    role: [1, 'author'], 
    authority: 0 //Authority.ADMIN과 같은 값
}

for(const item of person3.phone){
    console.log(item);
}


/* UNION TYPE *******************************************************************************************************************************************************/
console.log('-----union TYPE-----');

//여러개의 타입을 허용하는 경우, 이를 위한 런타임 조건검사가 필요함
function combine(input1 : number|string, input2 : number|string) {
    let result;
    if(typeof input1 === 'number' && typeof input2 === 'number'){
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combineResult1 = combine(30, 25);
console.log(combineResult1);
const combineResult2 = combine('hello', 1);
console.log(combineResult2);
const combineResult3 = combine('hello', 'everyone');
console.log(combineResult3);

/* literal TYPE *******************************************************************************************************************************************************/
console.log('-----literal TYPE-----');
//literal Type은 단순한 특정 변수나 매개변수가 아닌,
//정확한 값을 가지는 타입
function literal(a: number|string, b: number|string, resultType: 'as-number'|'as-string'){ //literal Type을 적용한 예 : result Type
    let result;
    if(typeof a === 'number' && typeof b === 'number' || resultType === 'as-number'){
        result = +a + +b;
    } else {
        result = a.toString() + b.toString();
    }
    return result;

    // if(resultType === 'as-number'){
    //     return +result;
    // } else {
    //     return result.toString();
    // }
}

const asNumber = literal(1, 2, 'as-number');
console.log(asNumber);
const asString = literal('1', '234', 'as-string');
console.log(asString);

/* alias TYPE *******************************************************************************************************************************************************/
console.log('-----alias TYPE-----');

type aliasTest = number|string;
type resultConversion = 'as-number' | 'as-string';
function alias(c: aliasTest, d:aliasTest, resultType:resultConversion){
    let result;
    if(typeof c === 'number' && typeof d === 'number' || resultType === 'as-number' ){
        result = +c + +d;
    } else {
        result = c.toString() + d.toString();
    }
    return result;
}

const aliasAsNumber = alias(1,2,'as-number');
console.log(aliasAsNumber);
const aliasAsString = alias(1,2,'as-string');
console.log(aliasAsString); //as-string이더라도 c와 d 모두 number이므로 number타입으로 출력
const aliasAsString2 = alias('1',2,'as-string');
console.log(aliasAsString2);
