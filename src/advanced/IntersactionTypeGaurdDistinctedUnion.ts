//Intersaction Type (&): 다른 타입을 결합하는 타입

//TypeGaurd의 종류
//1. typeof로 데이터타입 검사
//  : JS코드로 TypeScript의 타입은 인식하지 못함 (기본데이터타입만 사용가능)
//  : JS코드로 런타임시 실행됨
//2. in 키워드
//3. instanceof 키워드
//  : JS코드로 런타임시 실행됨
//  : interface와 사용불가

//Discriminated Union : TypeGaurd를 쉽게 수현할 수 있게 해주는 Union타입을 수행할 때, 사용할 수 있는 패턴
//                    : interface와 class모두 사용가능

//아래와 같이 Interface와 사용될 수도 있지만, 객체나 Type을 다루는데 용이한 기능
type Admin = {
    name: string;
    privileges: string[];
};
// interface Admin {
//     name: string;
//     previleges: string[];
// };

type Employee = {
    name: string;
    enrollDate: Date;
};
// interface Employee {
//     name: string;
//     enrollDate: Date:
// };

type ElevatedEmp = Admin & Employee;
// interface ElevatedEmp extends Admin, Employee {};

const elEmp1: ElevatedEmp = {
    name: 'Kang',
    privileges: ['create-server'],
    enrollDate: new Date()
};

function printEmpInfo(emp: UnknownEmployee){
    console.log('Name : ' + emp.name);
    
    //TypeGaurd의 예시
    //1. in 키워드 사용
    if('privileges' in emp){
        console.log('Privileges : ' + emp.privileges);
    }

    if('enrollDate' in emp){
        console.log('Privileges : ' + emp.enrollDate);
    }
}

printEmpInfo(elEmp1);
printEmpInfo({name:'Lee', enrollDate: new Date()});

//아래(Combinable, Numeric)의 Union타입은 타입간의 공통점이 있는 타입이고,
//Intersactio타입은 객체 속성의 조합
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add3(a: Combinable, b: Combinable){
    //TypeGaurd의 예시
    //1. typeof사용
    //런타임시 실행되며 JS를 사용하므로 Custom타입은 인식하지 못함 (컴파일불가)
    //object, array, string, number... 만 사용가능
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
};

type UnknownEmployee = Employee | Admin;

/*TypeGaurd의 예시 3*************************************************************************************/
class Car {
    drive() {
        console.log('Driving...');
    };
};

class Truck {
    drive() {
        console.log('Driving a truck...');
    };

    loadCargo(amount: number) {
        console.log('Loading cargo ...' + amount);
    };
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();

    //instanceof 사용 (오타방지 / JS코드로 런타임 시 실행됨)
    if(vehicle instanceof Truck){
        vehicle.loadCargo(1200);
    }
}

useVehicle(v1);
useVehicle(v2);

/*Distincted Union의 예시*************************************************************************************/
interface Bird {
    type: 'bird'; //대입값이 아닌 '리터럴타입 ' (Distincted Union사용을 위함)
    flyingSpeed: number;
}

interface Horse {
    type: 'horse'; //대입값이 아닌 '리터럴타입 ' (Distincted Union사용을 위함)
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    //기존 TypeGaurd방식 : 객체마다 다른 속성을 가지고 있기 때문에 종류만큼 TypeGaurd를 생성해야함
    // if('flyingSpeed' in animal){
    //     console.log('Moving with speed : ' + animal.flyingSpeed)
    // }
    // if('runningSpeed' in animal){
    //     console.log('Moving with speed : ' + animal.runningSpeed)
    // }
    
    //Distincted Union사용으로 switch문 사용
    let speed;
    switch(animal.type) {
        case 'bird' : speed = animal.flyingSpeed; break;
        case 'horse' : speed = animal.runningSpeed; break;
    }

    console.log('Moving at speed : ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});
moveAnimal({type: 'horse', runningSpeed: 20});