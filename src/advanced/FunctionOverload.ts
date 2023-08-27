type Combinable1 = string | number;
type Numeric1 = number | boolean;

type Universal1 = Combinable1 & Numeric1;

//function overload방법
function add1(a: number, b: number) : number;
function add1(a: string, b: string) : string;
function add1(a: string, b: number) : string;
function add1(a: number, b: string) : string;
function add1(a: Combinable1, b: Combinable1){
    //TypeGaurd의 예시
    //1. typeof사용
    //런타임시 실행되며 JS를 사용하므로 Custom타입은 인식하지 못함 (컴파일불가)
    //object, array, string, number... 만 사용가능
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
};

//add함수 내부의 조건문으로 타입이 확실해졌음에도 아래 구문을 보면 TS가 여전히 number | string 타입이라고 지칭하고 있음
//방법1. result1과 같이 형변환을 해줘 TS에 타입을 알려줄 수 있음
//방법2. function overload
const result1 = add1(1,5) as number;
const result2 = add1('a','b');
result2.split(' '); //string임을 명시해줬으므로 Split도 사용가능
const result3 = add1('b',1);
const result4 = add1(1,'c');

console.log(result1, result2, result3, result4);