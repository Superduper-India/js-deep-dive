// 19.1 객체지향 프로그래밍
function example() {
  // 자바스크립트는 객체지향 프로그래밍이다.
  // 즉, js를 이루고 있는 원시타입을 제외한 나머지 값들 모두 객체다.
  const person = {
    name: 'Lee',
    address: 'Seoul'
  };

  console.log(person); // {name: "Lee", address: "Seoul"}

  // 원이라는 개념으로 객체를 만들면, 반지름이 원의 상태를 나타내고
  // 원의 지름, 둘레, 넓이 등을 구하는 것은 동작이다
  const circle = {
    radius: 5, // 반지름 => 원의 상태(즉, 프로퍼티)

    // 원의 지름: 2r => 동작(즉, 메서드)
    getDiameter() {
      return 2 * this.radius;
    },

    // 원의 둘레: 2πr => 동작(즉, 메서드)
    getPerimeter() {
      return 2 * Math.PI * this.radius;
    },

    // 원의 넓이: πrr => 동작(즉, 메서드)
    getArea() {
      return Math.PI * this.radius ** 2;
    }
  };

  console.log(circle);
  // {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

  console.log(circle.getDiameter());  // 10
  console.log(circle.getPerimeter()); // 31.41592653589793
  console.log(circle.getArea());      // 78.53981633974483
}

// 19.2 상속과 프로토타입
function example2() {
  // 상속은 객체지향 프로그래밍의 핵심으로,
  // 어떤 객체의 "프로퍼티" 또는 "메서드"를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

  // Circle 생성자 함수가 생성하는 모든 객체(인스턴스)는 radius프로퍼티와 getArea메서드를 갖는다.
  // 프로퍼티는 일반적으로 인스턴스마다 값이 다르지만, 메서드는 내용이 같으므로,
  // 단 하나만 생성해서 모든 인스턴스가 공유하는게 바람직하다.
  function Circle(radius) {
    console.log(radius)
    this.radius = radius;
    this.getArea = function () {
      // Math.PI는 원주율을 나타내는 상수다.
      return Math.PI * this.radius ** 2;
    };
  }

  // Circle 생성자 함수로 반지름이 1인 인스턴스 생성
  const circle1 = new Circle(1);
  // Circle 생성자 함수로 반지름이 2인 인스턴스 생성
  const circle2 = new Circle(2);

  // 동일한 Circle 생성자 함수에 의해 생성된 모든 인스턴스가
  // getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
  // 때문에 불필요하게 메모리를 낭비하고, 퍼포먼스에 악영향을 준다.
  console.log(circle1.getArea === circle2.getArea); // false, 즉 메서드가 중복으로 생성됐단 뜻

  // js의 프로토타입을 기반으로 상속을 통해 불필요한 중복을 제거해보자.
  function Solution(radius) {
    this.radius = radius;
  }

  // Solution 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
  // 공유해서 사용할 수 있도록 프로토타입에 추가한다.
  // 프로토타입은 Solution 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
  Solution.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
  };

  // 인스턴스 생성
  const solution1 = new Solution(1);
  const solution2 = new Solution(2);

  // Solution 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
  // 프로토타입 Solution.prototype으로부터 getArea 메서드를 상속받는다.
  // 즉, Solution 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
  console.log(solution1.getArea === solution2.getArea); // true
}

// 19.3 프로토타입 객체
function example3() {
  // 모든 객체는 [[prototype]] 내부 슬롯(즉, 프로토타입)을 가지며, 
  // 이 [프로토타입]은 특정 객체의 [상위(부모)객체]의 역할을 한다.
  // 즉, 공유 프로퍼티(메서드 포함)을 제공한다.
  // 모든 객체는 __proto__접근자 프로퍼티를 통해
  // 자신의 [프로토타입]=[상위(부모)객체]에 접근할 수 있다.

  // __proto__접근자 프로퍼티
  // 위 프로퍼티는 어떤 객체가 소유하는 프로퍼티가 아니라,
  // Object.prototype의 프로퍼티다. 즉 모든 객체는 상속을 통해 __proto__를 사용할 수 있다.
  const obj = {};
  const objParent = { x: 1 };

  // getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
  obj.__proto__;
  // setter함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
  obj.__proto__ = objParent;

  console.log(`obj.x: ${obj.x}`); // 1

  // __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유는
  // 상호참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서다
  // 다시 말해, 순환참조하는 프로토타입 체인이 만들어지면, 프로퍼티를 검색할 때 무한루프에 빠져버린다..!!
  const parent = {};
  const child = {};

  // child의 프로토타입을 parent로 설정
  child.__proto__ = parent;
  // parent의 프로토타입을 child로 설정
  // parent.__proto__ = child; // TypeError: Cyclic __proto__ value

  // 그런데, 모든 객체가 __proto__를 참조할 수 있는건 아니기 때문에
  // 프로토타입의 참조를 취득하거나 교체하고 싶을땐 .getPrototypeOf, .setPrototypeOf같은 메서드를 사용하자

  // 함수표현식, 선언식 객체의 prototype프로퍼티 === 생성자 함수가 생성할 인스턴스의 프로토타입
  // 따라서 생성자 함수로서 호출할 수 없는 함수인 화살표 함수와, es6 메서드 축약 표현은 prototype프로퍼티를 소유하지 않는다
  // 함수 객체는 prototype 프로퍼티를 소유한다.
  (function () { }).hasOwnProperty('prototype'); // -> true

  // 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
  ({}).hasOwnProperty('prototype'); // -> false

  // 화살표 함수는 non-constructor다.
  const Person = name => {
    this.name = name;
  };

  // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
  console.log(Person.hasOwnProperty('prototype')); // false

  // non-constructor는 프로토타입을 생성하지 않는다.
  console.log(Person.prototype); // undefined

  // ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
  const foo = {
    foo() { }
  };

  // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
  console.log(foo.foo.hasOwnProperty('prototype')); // false

  // non-constructor는 프로토타입을 생성하지 않는다.
  console.log(foo.foo.prototype); // undefined

  function Sunyoung(name) {
    this.name = name;
  }

  const me = new Sunyoung('Lee') // Person생성자 함수로 me인스턴스 생성

  // Sunyoung.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다
  console.log(
    `Sunyoung.prototype === me.__proto__: ${Sunyoung.prototype === me.__proto__}`
  );
  // me객체의 생성자 함수는 Person이다
  // 즉, me는 Sunyoung.prototype의 constructor프로퍼티에 의해 Sunyoung
  console.log(
    `me.constructor === Sunyoung: ${me.constructor === Sunyoung}`
  );
}

// 19.4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
function example4() {
  // 리터럴(데이터, 즉 값 그 자체) 표기법에 의해 생성된 객체의 경우
  // 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가
  // 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.

  // obj는 Object생성자 함수가 아니라, 객체 리터럴에 의해 생성됐다
  const obj = {};

  // 하지만 obj객체는 Object생성자 함수와 constructor프로퍼티로 연결돼 있다
  console.log(
    `obj.constructor === Object: ${obj.constructor === Object}`
  );

  // 마찬가지로 foo는 Function생성자 함수가 아니라, 함수 선언문으로 생성했다
  function foo() { }

  // 하지만 constructor프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Funtion생성자 함수이다
  console.log(
    `foo.constructor === Function: ${foo.constructor === Function}`
  );

  // 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하고,
  // 가상적인 생성자 함수를 갖는다. 즉, 프로토타입과 생성자 함수는 언제나 쌍으로 존재한다.

  // 하지만 본질적으로 [생성자 함수로 만든 객체]와 [리터럴 표기법으로 만든 객체]는 큰 차이가 없다.
  // 그러므로 둘을 동일시해도 큰 무리는 없다.
}

// 19.5 프로토타입의 생성 시점
function example5() {
  // 위에서 살펴본대로, 어찌됐건 모든 객체는 생성자 함수와 연결돼 있다.
  // 생성자 함수는 크게 두 분류이다.
  // 1. 사용자 정의 생성자 함수
  // 2. js가 제공하는 빌트인 생성자 함수

  // 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
  console.log(`Sunyoung.prototype: ${Sunyoung.prototype}`); // {constructor: ƒ}

  // 생성자 함수
  function Sunyoung(name) {
    this.name = name;
  }

  // 화살표 함수는 non-constructor다.
  const Park = name => {
    this.name = name;
  };

  // non-constructor는 프로토타입이 생성되지 않는다.
  console.log(`Park.prototype: ${Park.prototype}`); // undefined

  // 빌트인 생성자 함수+프로토타입 쌍은 전역 객체가 생성되는 시점에 생성된다.
  // 그러고 이후 프로토타입은 생성자 함수나 리터럴 표기법으로 생성한 new객체의 [[prototype]]내부 슬롯에 할당된다.
}

// 19.6 객체 생성 방식과 프로토타입의 결정
function example6() {
  // 객체는 공통적으로 OrdinaryObjectCreate추상 연산에 의해 생성된다. 프로세스는 아래와 같다.
  // 1. 필수인수로 자신이 생성할 객체의 프로토타입을 전달받는다.
  // 2. 빈 객체를 생성한다.
  // 3. 객체에 추가할 프로퍼티 목록이 옵션인수로 전달받은 경우, 객체에 추가한다.
  // 4. 그리고 프로토타입을 객체의 [[Prototype]]내부 슬롯에 할당한다.
  // 5. 생성한 객체를 반환한다.

  // 즉 프로토타입은 필수인수에 의해 결정되며, 객체가 생성되는 시점, 객체 생성 방식에 의해 결정된다.
  const obj = { x: 1 };

  // 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
  console.log(`obj.constructor === Object: ${obj.constructor === Object}`); // true
  console.log(`obj.hasOwnProperty('x'): ${obj.hasOwnProperty('x')}`);    // true
  console.log(`obj.hasOwnProperty('toString'): ${obj.hasOwnProperty('toString')}`);

  // 사용자 정의 생성함수의 프로토타입에 프로퍼티를 추가해보자.
  function Sunyoung(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Sunyoung.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 인스턴스 생성
  // 아래 생성된 모든 객체는 프로토타입에 추가된 sayHello메서드를 상속받아 자신의 메서드처럼 쓸 수 있다.
  const me = new Sunyoung('Lee');
  const you = new Sunyoung('Kim');

  me.sayHello();  // Hi! My name is Lee
  you.sayHello(); // Hi! My name is Kim
}

test("run", () => {
  // expect(example()).toBe();
  // expect(example2()).toBe();
  // expect(example3()).toBe();
  // expect(example4()).toBe();
  // expect(example5()).toBe();
  expect(example6()).toBe();
});
