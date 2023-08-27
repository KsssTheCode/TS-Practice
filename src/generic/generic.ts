const test2 = []; // => any타입
const test3 = ['Kang', 'Lee']; // => string[]타입으로 추론
const test4: Array<string> = []; // => string[]타입으로 명시
const test5: Array<string|number> = []; // => string[] | number[]타입으로 명시

//Promise Generic타입
const promise: Promise<string> = new Promise(() => { // reolve와 reject는 입력하지 않아도 매개변수로 자동설정됨 
    setTimeout(() => {
        console.log('This is done!');
    }, 2000);
}); 

promise.then(data => {
    data.split(' '); //Promise<string>타입에서 resolve값이 String아 아닌 다른 타입으로 넘어온다면 사용불가함
})

/*Create Generic Function**************************************************************************/
//function merge(objA:object, objB:object){ //Generic설정 전
function merge<T extends object, U extends object>(objA: T, objB: U) /* : T & U */ { //Generic설정 후 (관례상 한 글자만 입력함)
                                                     //해당 <T,U> Generic타입은 T와 U의 Intersaction 가리키게됨

                                                     //Object는 구체적인 데이터타입이 아니기 때문에 어떤 객체든 입력가능함
                                                     //TS가 두 객체의 intersaction이 반환해주며
                                                     //Object타입의 T, Object타입의 U가 서로 다른 타입이 될 수 있음을 알 수 있음

                                                     //따라서, merge함수는 T,U의 intersaction을 반환하게 되고,
                                                     //      mergedObj에 저장된 데이터가 두 입력값 데이터의 Intersaction임을 TS가 인식할 수 있음
    return Object.assign(objA, objB);
}

const mergedObj = merge({name:'Kang'}, {age: 30}); //만약 여기서 "{age: 30}"객체가 아닌 30만 입력했을 때,
                                                   //새로운 객체로 병합되지 않고, 런타임에러도 발생시키지 않음
                                                   //따라서, 정확시 실행시키기 위해서는 반드시 객체타입을 입력해야함
                                                   //이를 방지하기 위해 merge<T,U>가 아닌, 
                                                   //merge<T extends object, U extends object>로 확실히 명시해줄 수 있음 (다른 모든 타입도 가능)

mergedObj.age; //제네릭타입을 설정하지 않았다면, TS는 Object타입으로만 인식해 mergedObj의 속성을 알 수 없음 (모든 정보를 갖고있지는 않음)
               //이럴 때 아래와 같이, 제네릭타입설저이 아닌 형변환으로도 가능하지만 코드가 길어지고 실수를 유발할 수 있음 
               //const mergedObj = merge({name:'Kang'}, {age: 30}}) as {name: string, age: number;
console.log(mergedObj);

/*연습*/
function mergeUserInfo<Y extends object, P extends object>(info1: Y, info2: P){
    return Object.assign(info1, info2);
}

const userHobbies = ['Sports', 'Swimming'];
const newUser = mergeUserInfo({name: 'Kang', userHobbies}, {age: 30});

console.log(newUser);

console.log('==========================');

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no values';

    if(element.length === 1){
        descriptionText = 'Got 1 element';
    } else if(element.length > 0){
        descriptionText = 'Got ' + element.length + ' elements'
    }
    return [element, descriptionText];
}

console.log(countAndDescribe(['sports', 'cooking']));

/*keyof제약조건************************************************************/
console.log('==========================');

const me = {
    name: 'Kang',
    age: 28,
    height: 175,
    weight: 78
}

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Value : ' + obj[key];
}

console.log(extractAndConvert(me, 'name'));
//console.log(extractAndConvert(me, 'greet')); //Generic설정으로 "U extends keyof T"로 하여금
                                               //T라는 객체타입 내의 key값이라고 명시했기때문에
                                               //존재하지 않는 키는 오류를 발생시킴

/*Generic Class*********************************************************************/
console.log('==========================');
class DataStorage<T> { //원시타입으로만 작동되는 구조라면 "<T extends string|number|boolean>"로도 사용가능
    private data: T[] = [];
    //(string|number|boolean)[]로도 사용할 수 있지만, T[]와 의미하는 바가 다름
    //(string|number|boolean)[] : string, number, boolean이 혼합된 배열
    //T[] : T라는 객체가 들어가는 배열
    // => 따라서, Generic Type은 설정된 타입만을 고수해야하는 Union을 보완한 대안이 될 수 있음
    //          <T extends string|number|boolean>(선택하여 사용가능)

    //정리 : Union타입은 함수를 호출할 때마다 설정한 타입들 중 하나로 호출할 수 있는 함수가 필요한 경우 유용 (모든 메소드나 함수 호출마다 다른 타입을 지정하고자할 때 유용)
    //    : Generic타입은 특정 타입을 고정하거나, 생성한 전체 클래스 인스턴스에 걸쳐 같은 함수를 사용하거나, 전체 함수에 걸체 같은 타입을 사용하고자 할 때 유용

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item: T){
        if(this.data.indexOf(item) === -1){ //item을 찾지 못한다면 -1반환됨
            return; //못찾을 시, 아무런 작업 없음
        }
        this.data.splice(this.data.indexOf(item), 1);
        //참조형타입은 객체나 배열의 경우, 아무리 값이 동일하더라도 전혀 다른 객체나 배열로 취급함
        //따라서, 아무리 같은 값을 입력해도 해당 item의 인덱스를 인식하지 못하고 마지막 요소를 제거하게됨
        //이를 방지하기 위해, 위의 If문으로 검사를 실행하게됨

    }

    getItem(){
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Kang');
console.log(textStorage.getItem());
textStorage.addItem('Lee');
console.log(textStorage.getItem());
textStorage.removeItem('Kang');
console.log(textStorage.getItem());

console.log('--------------------------');

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
console.log(numberStorage.getItem());
numberStorage.addItem(2);
console.log(numberStorage.getItem());
numberStorage.removeItem(4);
console.log(numberStorage.getItem());

console.log('--------------------------');

const objectStorage = new DataStorage<object>();
const kang = {name: 'Kang', age: 28};
objectStorage.addItem(kang);
objectStorage.addItem({name: 'Kim', age: 24});
objectStorage.addItem({name: 'Lee', age: 27});
console.log(objectStorage.getItem());
objectStorage.removeItem({name: 'Kang', age: 28}); //참조형타입의 경우, 값이 같아도 주소값이 다르다면 다르게 취급하므로 선택되지 않음
console.log(objectStorage.getItem()); //[kang, Kim]
objectStorage.removeItem(kang);
console.log(objectStorage.getItem()); // [Kim]