// 24장 클로저
function example() {
  const x = 1;

  // 함수 선언식이므로 런타임 이전(평가시) outer함수 객체에 [[Environment]]내부 슬롯에 전역 렉시컬 환경을 저장한다.
  // 그리고 런타임시 outer함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 이를 할당한다.
  function outer() {
    const x = 10;
    const inner = function () { console.log(x) };
    return inner;
  }

  // outer함수를 호출하면 중첩함수 inner를 반환한다.
  // 그리고 outer함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다. 즉, 생명주기가 마감된다.
  const innerFunc = outer();

  // 그럼에도 불구하고, 중첩 함수 inner를 호출하면 outer함수의 지역변수 x의 값인 10이 찍힌다.
  // 생명주기가 마감된 함수의 지역변수를 어떻게 참조할 수 있을까?

  // 위에서 생명주기가 끝난 outer함수의 반환값인 중첩함수 inner를 아래와 같이 호출하면,
  // 런타임이 일어나고 inner함수의 실행 컨텍스트가 생성되면서 실행 컨텍스트 스택에 푸쉬된다.
  // 그리고 inner함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에는 inner함수 [[Environment]]내부 슬롯에 있는 값이 할당된다.
  innerFunc();

  // outer함수의 실행 컨텍스트는 스택에서 제거되지만 outer함수의 렉시컬 환경까지 소멸하는 것은 아니다.
  // 왜냐면 중첩함수 inner의 [[Environment]]내부 슬롯에의해 inner함수가 태어난 곳, 
  // 즉 outer함수의 렉시컬 환경이 참조되고 있다.
  // 그리고 inner함수는 전역 변수 innerFunc에 의해 참조되고 있다. 그러므로 가바지 컬렉션의 대상이 되지 않는다.
  // 가비지 컬렉터는 누군가 참조하고 있는 메모리 공간을 함부로 해제하지 않는다.

  // 이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우, (위의 경우는 innerFunc이 더 오래 살아있다)
  // 중첩함수는 이미 생명주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이때 이 중첩함수를 "클로저"라고 한다.
}

// 클로저 활용예1
function example2() {
  // let count = 0;
  // count = 5; // 전역상태의 변수는 외부에서 언제든지 수정 가능하다.

  const increase = function () {
    let count = 0;

    return function () {
      return ++count;
    }
  }

  const closure = increase();

  // console.log(increase()); // 반복해서 호출해도 이전값을 기억하지 못해서 변화가 없다.

  // 외부에서 상태를 변경할 수 없도록 변수 count를 은닉하고,
  // 특정함수(closure)에게만 상태변경을 허용한다.
  console.log(closure());
}

// 클로저 활용예2 - 고차함수(함수를 인자로 전달 받고 함수를 반환하는 함수)
function example3() {
  function makeCounter(aux) { // 함수를 인자로 전달받고,
    let count = 0;

    return function () {
      count = aux(count);
      return count; // 함수를 반환한다.
    }
  }

  function increase(count) {
    return ++count;
  }

  function decrease(count) {
    return --count;
  }

  // 아래 두 클로저(increaseFunc, decreaseFunc)각각 독립된 렉시컬환경을 가진다.
  // 그렇기 때문에 자유변수 count를 공유하지 않아 카운터의 증감이 연동되지 않는것이다.

  // Q. 내가 이해한 아래의 내용이 맞는건가?
  // 왜냐하면 아래에서 makeCounter함수를 호출하면 
  // 그때마다 새로운 makeCounter함수의 실행 컨텍스트의 렉시컬 환경이 생성되기 때문이다.
  const increaseFunc = makeCounter(increase);
  console.log(increaseFunc());
  console.log(increaseFunc());

  const decreaseFunc = makeCounter(decrease);
  console.log(decreaseFunc());
  console.log(decreaseFunc());

}

test("run", () => {
  expect(example()).toBe();
  expect(example2()).toBe();
  expect(example3()).toBe();
});
