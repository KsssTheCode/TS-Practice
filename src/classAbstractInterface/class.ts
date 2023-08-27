"use strict";
abstract class Department { //abstract로 하여금 인스턴스화하지 못하도록 함
    // private id: string;
    // private name: string;
    protected employees: string[] = []; //Protected 추가해줌으로써 생성된 객체 내부와 자손에서만 접근할 수 있도록 함
                                      //accounting.addEmp('')로 추가 가능하지만, accounting.employees[1] = ''로는 추가를 불가하게함
    static fiscalYear = 2023; //정적메소드나 속성은 인스턴스메소드나 속성에 사용할 수 없음

    // constructor(id: string, n: string) {
    //     this.id = id;
    //     this.name = n;
    // }
    //위의 생성자도 가능하지만, 아래코드로 축약 가능
    constructor(protected readonly id: string, public name: string){} //readonly : 변경불가(읽기만가능)
    
    static createEmp(name: string){
        return {name: name};
    }

    //메소드들은 객체(Class)의 prototype으로 등록됨
    abstract describe(this: Department): void; //abstract로 하여금 자식클래스들은 모두 Describe메소드를 가지도록 강제

    addEmp(employee:string){
        this.employees.push(employee);
    }

    printEmpInfo(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department{ //Extends로 부모클래스의 private항목을 제외한 항목을
                                       //그대로 사용도 가능하고, 변형도 가능함
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe(){
        console.log('IT Department ID = ' + this.id);
    }
}

class CashieringDepartment extends Department {
    private lastReport: string;
    private static instance: CashieringDepartment;
    //single-ton Pattern의 생성자때문에 내부 속성에 접근할 수 없으므로,
    //static객체를 생성하여 1)접근가능하도록하고, 2)생성한 static객체를 클래스 자체로 취급
    get mostRecentReport() {
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error('No Report Found');
    }

    set mostRecentReport(value: string) {
        if(!value){
            throw new Error('Pass any value');
        }
        this.addReport(value);
    }

    //Single-tone Pattern : 특정 클래스의 인스턴스를 하나만 갖도록 함 (private constructor)
                          //이 패턴은 정적 메소드나 속성을 사용할 수 없거나, 사용하지 않을 떄 사용
                          //클래스를 기반으로 여러 객체를 만들 수는 없지만 항상 클래스를 기반으로 정확히 하나의 객체만 가짐
    private constructor(id: string, private reports: string[]){
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance(){
        if(CashieringDepartment.instance){ //이미 생성된 객체가 있다면, 이미 생성된 것을 반환
            return this.instance;
        }
        //생성된 객체가 없다면, 생성 (한 번만 실행됨)
        this.instance = new CashieringDepartment('d2', []);
        return this.instance;
    }

    describe(){
        console.log('Cashiering Department ID = ' + this.id);
    }

    addEmp(name: string) {
        if(name === 'Kang'){
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string){
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports(){
        console.log(this.reports);
    }
}

const emp1 = Department.createEmp('Park');
console.log(emp1, Department.fiscalYear);




//const accounting = new Department('d1', 'Accounting'); 
//Department를 abstract class로 설정했으므로 인스턴스 생성불가

// const accountingCopy = { /*nmae: 's',*/ describe : accounting.describe };
// accountingCopy.describe();

/* Department를 abstract class로 전환하면 사용불가한 코드
accounting.addEmp('Kang');
accounting.addEmp('Kim');

accounting.describe();
accounting.printEmpInfo();
console.log(accounting);
*/

console.log('------------------');

const ITaccounting = new ITDepartment('d2', ['Max']);
ITaccounting.addEmp('Lee');
ITaccounting.name = 'IT';

ITaccounting.describe();
ITaccounting.printEmpInfo();
console.log(ITaccounting);

console.log('------------------');

//const cashier = new CashieringDepartment('d3', []); 
//private를 사용하여 single-tone pattern으로 생성하여 new구문을 사용할 수 없음
//따라서, getInstance를 통해 새로 생성하거나, 기존의 것을 불러와야함
const cashier = CashieringDepartment.getInstance();
const cashier2 = CashieringDepartment.getInstance(); //위 코드와 동일한 객체를 불러옴
console.log(cashier === cashier2); //true

cashier.addEmp('Kang');
cashier.addEmp('Jang');
//console.log(cashier.mostRecentReport); //Error
//cashier.mostRecentReport = ''; //Error
cashier.mostRecentReport = 'text!'; //setter는 ' = '을 이용해 값을 대입하여 사용 (함수처럼 취급 X)
cashier.addReport('Something');

console.log(cashier.mostRecentReport);
cashier.printReports();
cashier.printEmpInfo();