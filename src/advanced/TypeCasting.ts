//TS가 선택된 요소가 HTML요소이거나 null인지는 알 수 있찌만, 어떤 특정 HTML요소인지(class,id 등...)는 알지 못함
//TS는 HTML코드를 읽지 못하기 때문
const paragrpah = document.querySelector('p');
const paragraph = document.getElementById('pTag');

//기본적으로 모든 HTML요소가 타입으로서 갖는 이 제네릭 타입이 특정 HTML요소인 속성을 지원하지 않음
//따라서, 형변환을 해주어야 함

//version1 : < >
//<>과 같은 형식이 리액트에서는 빌드도구와 리액트로 구문 분석되어 결과적으로 화면에 렌더링하고자 하는게 무엇인지 알아내는데 사용하는 방식
//따라서, TS에서는 혼동하지 않게 Version2의 방식을 제공함
const input1 = <HTMLInputElement>document.getElementById('inputTag1')!; 
input1.value = 'Hi there';

//'!'는 표현식을 Null로 반환하지 않겠다고 TS에 입력 (개발과정에서 null이 안된다는 것을 확실히 아는 경우)
//만약, Null일지 아닐지 모른다면 If문으로 검사해야함 (단, if문에서 형변환을 해야함)
// if(input1) {
//     (input1 as HTMLInputElement).value = 'Hi there';
// }

//version2 : as
const input2 = document.getElementById('inputTag2')! as HTMLInputElement;
input2.value = 'Hi here';

console.log(input1.value + '\n' + input2.value);