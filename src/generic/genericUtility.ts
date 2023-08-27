//Generic Utility Type
//:타입스크립트에만 존재하는 타입
//:컴파일하기 전 단계에서 이 타입들이 추가적인 안전성과 유연성을 제공함

//Pick, Omit 등등이 있음

//Partial Type : 파셜 타입은 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있음
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

//createCourseGoal1의 경우, 모든 매개변수(Title, des, date)가 들어가야 생성됨
function createCourseGoal1(title: string, description: string, date: Date) {
    return {title: title, description: description, date: date}
}

//createCourseGoal2의 경우, Partial타입과 '?' 사용으로 인해 선택적으로 들어가도됌
function createCourseGoal2(title?: string, description?: string, date?: Date): CourseGoal {    
                                                                                            let courseGoal: Partial<CourseGoal> = {};
                                                                                            courseGoal.title = title;
                                                                                            courseGoal.description = description;
                                                                                            courseGoal.completeUntil = date;

                                                                                            //Partial<CourseGoal>타입이지 CourseGoal타입이 아니므로
                                                                                            //courseGoal을 다시 CourseGoal타입으로 형변환해주어야 함
                                                                                            //return courseGoal;
                                                                                            return courseGoal as CourseGoal;
                                                                                        }

let courseGoal1;
courseGoal1 = createCourseGoal1('title1', 'des1', new Date());
console.log(courseGoal1);
//courseGoal1 = createCourseGoal1('changeTitle1', 'changeDes1'); //모든 요소가 입력되지 않았으므로 생성불가

let courseGoal2;
courseGoal2 = createCourseGoal2('title2', 'des2'); //모든 요소가 입력되지 않아도 생성가능 (단, completeUntil은 undefined)
console.log(courseGoal2);


//Readonly Type

const names: Readonly<string[]> = ['Kim', 'Lee'];
//names.push('Kang'); //Readonly타입으로 변경이 불가함
//names.pop('Park'); //Readonly타입으로 변경이 불가함