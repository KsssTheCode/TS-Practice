interface Person {
    //interface의 특징
    //객체 자체가 아님 => 프로퍼티에 값 대입 불가, 구조만 존재
    //type설정과 비슷하지만, 가장 큰 차이점은 구조설명을위해서만 사용함 (type보다 더 깔끔함)
    //클래스가 인터페이스를 이행하고 준수해야하는 약속처럼 사용할 수 있음
    //abstract와 다르게 구현 세부 사항이 없음 
    name: string;
    age: number;

    greet(text: string): void;
}

let user1 = {
    name: 'Kang',
    age: 27,

    greet(text: string){
        console.log(text + ' ' + this.name);
    }
}

user1.greet('Welcome');

/********************************************************************************/
interface Kind {
    readonly kind: string;//Readonly로 하여금 한 번 설정된 이름은 변경불가하도록 설정가능
}

interface Info {
    readonly name: string;
    readonly age?: unknown; // '?'는 선택적으로 부여가능
}

interface Roar {
    roar(sound: string): void;
}

class Dog implements Kind, Info, Roar {
    name: string;
    kind: string;
    age?: unknown;

    constructor(name: string, kind: string, age?: unknown){
        this.name = name;
        this.kind = kind;
        this.age = age;

        if(typeof(age) !== 'number'){
            this.age = '?';
        }
    }

    roar(sound: string){
        console.log(sound);
    }

    showInfo(){
        console.log(`<Dog> \n
                     Kind : ${this.kind}\n
                     Name : ${this.name}\n
                     Age : ${this.age}`);
    }
}
const popi = new Dog('popi', 'poodle');
popi.roar('bow bow');
popi.showInfo();

class Cat implements Kind, Info, Roar {
    name: string;
    kind: string;
    age?: unknown;

    constructor(name: string, kind: string, age?: unknown){
        this.name = name;
        this.kind = kind;
        this.age = age;

        if(typeof(age) !== 'number'){
            this.age = '?';
        }
    }

    roar(sound: string){
        console.log(sound);
    }

    showInfo(){
        console.log(`<Cat> \n
                     Kind : ${this.kind}\n
                     Name : ${this.name}\n
                     Age : ${this.age}`);
    }
}
const nabi = new Cat('nabi', 'scotish field', 7);
nabi.roar('miao');
nabi.showInfo();

/*Custom Function Type (사용자정의함수)***********************************************************************/

//type AddFn = (a:number, b:number) => number;
// 타입에서 인터페이스로 변환
interface AddFn {
    //메소드명을 작성하지 않고 바로 매개변수를 작성한 형식
    (a:number, b:number): number; 
}

let add: AddFn;

add = (n1:number, n2:number) => {
    return n1+ n2;
}
//주로 type형식의 사용자정의를 사용하지만, 대안으로 좋은 방법임