// 15.1 var키워드로 선언한 변수의 문제점
function example() {
  // 문제1. 변수 중복 선언의 허용
  var x = 1;
  var y = 1;

  // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
  // 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
  // 초기화문이란 변수 선언과 동시에 초기값을 할당하는 문
  var x = 100;
  // 초기화문이 없는 변수 선언문은 무시된다.
  var y;

  console.log(x); // 100
  console.log(y); // 1

  // 문제2. 함수 레벨 스코프
  // 문제3. 변수 호이스팅
  // 이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다(1. 선언 단계)
  // 변수 foo는 undefined로 초기화된다. (2. 초기화 단계)
  console.log(foo); // undefined

  // 변수에 값을 할당(3. 할당 단계)
  foo = 123;

  console.log(foo); // 123

  // 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
  var foo;
}

// 15.2 let 키워드
function example2() {
  // let bar = 123;
  // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
  // let bar = 456; // SyntaxError: Identifier 'bar' has already been declared

  // let foo = 1; // 전역 변수

  // {
  //   let foo = 2; // 지역 변수
  //   let bar = 3; // 지역 변수
  // }

  // // let으로 선언된 변수는 블록 레벨 스코프를 따른다.
  // console.log(foo); // 1
  // console.log(bar); // ReferenceError: bar is not defined

  // 변수 호이스팅
  // let은 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
  // let키워드로 선언한 변수는 "선언단계"와 "초기화단계"가 분리되어 진행된다.
  // console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  // let foo;

  // 전역 변수 선언되었다.
  let foo = 1; // 전역 변수 초기화되었다.

  {
    // 호이스팅이 일어나면 블록내에서 최상단으로 끌어올려진 것처럼 된다.
    // 지역 변수 선언되었다.
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization => TDZ
    // 만약 호이스팅이 일어나지 않는다면 1이 찍힐 것이다. (스코프 체이닝에 의해)
    let foo = 2; // 지역 변수 초기화+할당되었다.
  }
}

// 15.3 const 키워드
function example3() {
  // let과 마찬가지로 변수 호이스팅이 발생하지 않는 것처럼 동작한다

  // {
  //   console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  //   const foo = 1;
  //   console.log(foo); // 1
  // }

  // let과 마찬가지로 블록 레벨 스코프를 갖는다.

  // console.log(foo); // ReferenceError: foo is not defined

  // let과 다르게 const키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야한다.

  // const foo = 1;
  // foo = 2; // 안그러면 에러 발생 => TypeError: Assignment to constant variable.

  // let과 다르게 const키워드로 선언한 변수는 상수로 재할당이 금지된다.

  // 특히 원시값을 할당한 경우 변수 값을 변경할 수 없다.
  // 왜냐하면 원시값은 변경 불가능한 값이므로 재할당 없이 값을 변경할 수 있는 방법이 없기 때문이다.
  // const foo = 1;
  // foo = 2; // TypeError: Assignment to constant variable.

  // 아래처럼 상수를 사용하면, 코드의 가독성이 좋아진다.

  // 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
  // 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
  // const TAX_RATE = 0.1;

  // // 세전 가격
  // let preTaxPrice = 100;

  // // 세후 가격
  // let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);

  // console.log(afterTaxPrice); // 110

  // const로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다.

  const person = {
    name: 'Lee'
  };

  // 객체는 변경 가능한 값이다. 따라서 재할당없이 변경이 가능하다.
  person.name = 'Kim';

  console.log(person); // {name: "Kim"}
}

test("run", () => {
  // expect(example()).toBe();
  // expect(example2()).toBe();
  // expect(example3()).toBe();
});
