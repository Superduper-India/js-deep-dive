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

test("run", () => {
  expect(example()).toBe();
});
