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

test("run", () => {
  // expect(example()).toBe();
  expect(example2()).toBe();
});
