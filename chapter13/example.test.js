// 13.1 스코프란?
// 유효범위(스코프)는 변수, 함수와 깊은 관련이 있다.
// var키워드로 선언한 변수와 let 또는 const키워드로 선언한 변수의 스코프는 다르게 동작한다.
function example() {
  // 함수의 매개변수는 함수 몸체 내부에서만 참조할 수 있고, 함수 몸체 외부에서는 참조할 수 없다.
  // 함수의 유효범위(매개변수의 스코프)가 함수 몸체 내부로 한정되기 때문이다.
  function add(x, y) {
    console.log(x, y); // 2 5
    console.log(x + y); // 7
  }

  add(2, 5);

  // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
  console.log(x, y); // ReferenceError: x is not defined
}

function example2() {
  var var1 = 1; // 코드의 가장 바깥 영역에서 선언한 변수

  // var는 블록스코프가 없다.
  if (true) {
    var var2 = 2; // 코드 블록 내에서 선언한 변수
    if (true) {
      var var3 = 3; // 중첩된 코드 블록 내에서 선언한 변수
    }
  }

  // 하지만 var는 함수내에서 선언된 경우, 코드블록 밖에서 참조할 수 없다.
  function foo() {
    var var4 = 4; // 함수 내에서 선언한 변수

    function bar() {
      var var5 = 5; // 중첩된 함수 내에서 선언한 변수
    }
  }

  console.log(var1); // 1
  console.log(var2); // 2
  console.log(var3); // 3
  console.log(var4); // ReferenceError: var4 is not defined
  console.log(var5); // ReferenceError: var5 is not defined
}

// 식별자 결정
function example3() {
  // 전역으로 선언된 아래 변수는 어디서든 참조가 가능하다.
  var x = 'global';

  // 하지만 함수 내부에서 선언된 아래변수는 함수내에서만 참조가능하다.
  function foo() {
    var x = 'local';
    console.log(x); // ① local
  }

  foo();

  console.log(x); // ② global
}

function example4() {
  // var 키워드로 선언한 변수의 중복 선언
  function foo() {
    var x = 1;
    // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
    // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
    var x = 2;
    console.log(x); // 2
  }
  foo();

  // let 키워드로 선언한 변수의 중복 선언
  function bar() {
    let x = 1;
    // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
    // let x = 2; // SyntaxError: Identifier 'x' has already been declared
  }
  bar();
}

// 13.2 스코프의 종류
function example5() {
  // 전역과 전역 스코프
  var x = "global x";
  var y = "global y";

  function outer() { // 외부함수
    var z = "outer's local z";

    console.log(x); // x는 지역스코프에 없다. 전역에서 찾아본다 => global x
    console.log(y); // y는 지역스코프에 없다. 전역에서 찾아본다 => global y
    console.log(z); // z는 지역스코프에 있다. => outer's local z

    function inner() {
      var x = "inner's local x";

      console.log(x); // x는 지역스코프에 있다. => inner's local x
      console.log(y); // y는 지역스코프에 없다. 아우터함수 스코프에서 찾아본다 => 없다. 전역에서 찾아본다 => global y
      console.log(z); // z는 지역스코프에 없다. 아우터함수 스코프에서 찾아본다. => outer's local z
    }

    inner();
  }

  outer();

  console.log(x); // 전역변수는 참조할 수 있다 => global x
  console.log(z); // 지역변수는 참조할 수 없다 => ReferenceError: z is not defined
}

// 13.3 스코프체인
function example6() {
  // 스코프체인에 의한 함수검색
  // 전역 함수
  function foo() {
    console.log('global function foo');
  }

  function bar() {
    // 중첩 함수
    function foo() {
      console.log('local function foo');
    }

    foo(); // ① 자바스크립트 엔진은 함수를 호출하기 위해 식별자 foo를 검색한다.
  }

  bar(); // local function foo
}

// 13.4 함수 레벨 스코프
function example7() {
  // var x = 1;

  // if (true) {
  //   // var 키워드로 선언된 변수는 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다.
  //   // 함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 할지라도 모두 전역 변수다.
  //   // 따라서 x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
  //   // 이는 의도치 않게 변수 값이 변경되는 부작용을 발생시킨다.
  //   var x = 10;
  // }

  // console.log(x); // 10

  var i = 10;

  // for 문에서 선언한 i는 전역 변수다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
  for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
  }

  // 의도치 않게 변수의 값이 변경되었다.
  console.log(i); // 5
}

// 13.5 렉시컬 스코프 ==> 클로저와 깊은 연관이 있다...
function example8() {
  var x = 1;

  function foo() {
    var x = 10;
    bar();
  }

  function bar() { // 전역에서 정의된 함수. 자신이 태어난 스코프, 즉 전역 스코프를 environment객체로써 기억한다.
    console.log(x);
  }

  // bar함수의 상위 스코프가 무엇인지에 따라 결정된다.
  // 1. 함수를 어디서 호출했는지에 따라 함수의 상위 스코프를 결정한다. => 동적 스코프
  // 2. 함수를 어디서 정의했는지에 따라 함수의 상위 스코프를 결정한다. => 렉시컬(정적) 스코프
  foo(); // 1 x는 전역에서 발견
  bar(); // 1 x는 전역에서 발견
};

test("run", () => {
  // expect(example()).toBe();
  // expect(example2()).toBe();
  // expect(example3()).toBe();
  // expect(example4()).toBe();
  // expect(example5()).toBe();
  // expect(example6()).toBe();
  // expect(example7()).toBe();
  expect(example8()).toBe();
});

