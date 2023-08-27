//Optional Chaining
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: {title : 'CEO', description: 'Owner of the company'}
};

//TS는 job이라는 소스가 없다는 것을 알지만, 어떤 소스로부터 정보를 가져오는 경우, 살펴볼 수 없음

//만약 fetchedUserData.job이라는 프로퍼티가 없는 경우 Runtime Error를 발생시킴
//따라서, JS에서는 Runtime Error를 피하기 위해 아래의 방법을 사용
//      TS에서는 존재여부가 확실하지 않은 요소 뒤에 '?'를 붙이면됨
//      (물음표 앞의 요소가 정의되지 않았다면 그 이후에는 해당 요소에 접근하지 않아 Runtime Error는 발생하지만 에러가 지속되지는 않음)
//      (컴파일 시, JS코드로 if문 검사를 실행함)
console.log(fetchedUserData?.job?.title);

//Null병합
// : 어떤 데이터나 입력값이 있는데 그것이 Null인지, undefined인지, 유효한 데이터인지 알 수 없는 경우,
const exData = null;
const data1 = exData || 'DEFAULT';
const data2 = exData ?? 'DEFAULT';
//   다음과 같이 설정하여 exData가 null또는 undefined라면 DEFAULT값을 가짐
