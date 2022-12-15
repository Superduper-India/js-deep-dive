// 45장 프로미스
// ✅ [비동기 처리를 위한 콜백 패턴의 단점]
// 비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다.
// 즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다.

// 왜냐면 예를들어 비동기적으로 동작하는 onload이벤트 핸들러는 load이벤트가 발생하면 일단 태스크 큐에 저장되어 대기하다가,
// 콜 스택이 비면 이벤트 루프에 의해 콜 스택에 푸쉬되어 실행되기 때문이다.
// 따라서 onload이벤트 핸들러가 실행되는 시점에는 콜 스택이 빈 상태여야 하므로 아래 예제에서 console.log를 100번 찍어도
// onload이벤트 핸들러는 모든 console.log가 종료된 이후에 실행된다.

// 📃 [예제 p.843]
// setTimeout 비동기 함수는 콜백 함수의 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하지 못한다.
let g = 0;
setTimeout(() => { g = 100; }, 0);
console.log(g); // 0

// 따라서 비동기 함수 내부의 비동기 처리결과(서버의 응답 등)를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없다.
// 그래서 처리결과에 대한 후속 처리는 비동기 함수 내부에서 수행해야 한다.
// 이때 비동기 함수를 범용적으로 사용하기 위해, 비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적이다.

// 👎 하지만 콜백 함수가 중첩 호출되어 복잡도가 높아지는 현상인 '콜백 헬'이 발생하게 된다.
// 👎 그리고 가장 심각한 문제점은 에러처리가 곤란하다.

// 📃 [예제 p.849]
// 아래 try...catch문에서 에러를 캐치할 수 있을까?
try {
  setTimeout(() => { throw new Error('try문에서 에러를 발견!'); }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  // 왜냐하면 에러는 호출자 방향으로 전파되기 때문에 만약 콜백함수의 호출자가 setTimeout함수라면
  // 콜스택의 현재 실행중인 실행 컨텍스트가 콜백함수의 실행 컨텍스트일때, setTimeout함수의 실행 컨텍스트가 하위에 깔려있어야 한다.

  // ***실행 컨텍스트(콜스택)
  // [콜백함수의 실행 컨텍스트: 실행중]
  // [setTimeout함수의 실행 컨텍스트]

  // setTimeout함수의 콜백함수가 실행될 때 setTimeout함수는 이미 콜 스택에서 제거된 상태이다.
  // 때문에 setTimeout의 콜백함수를 호출한 것은 setTimeout이 아니다.
  console.error('catch문에서 에러를 발견!', e);
}

// ✅ [프로미스]
// 프로미스 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달 받는데,
// 이 콜백 함수는 resolve, reject함수를 인수로 전달 받는다.

// 프로미스의 상태는 resolve, 혹은 reject콜백 함수를 호출하는 것으로 결정된다.
// 즉 프로미스는 비동기 처리 상태와 결과를 관리하는 객체다.

// 📃 [예제 p.850]
const promise = new Promise((resolve, reject) => {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
  if (/* 비동기 처리 성공 */) {
    resolve('result');
  } else { /* 비동기 처리 실패 */
    reject('failure reason');
  }
});

// ✅ [프로미스의 후속 처리 메서드와 에러처리]
// 프로미스의 후속 메서드엔 then, catch, finally등이 있고, 
// 이에 인수로 전달한 콜백 함수가 비동기 처리 상태에 따라 선택적으로 호출된다.

// 📃 [예제 p.853]
// then은 두개의 콜백함수를 인수로 전달받는다.
new Promise(resolve => resolve('fulfilled'))
  .then(res => console.log(res), e => console.error(e)); // fulfilled

new Promise((_, reject) => reject(new Error('rejected')))
  .then(res => console.log(res), e => console.error(e)); // Error: rejected

// 📃 [예제 p.854]
// catch는 한개의 콜백함수를 인수로 전달받고, 프로미스가 rejected일 때 호출된다.
new Promise((_, reject) => reject(new Error('rejected')))
  .catch(e => console.log(e)); // Error: rejected

// 📃 [예제 p.854]
// finally메서드는 한개의 콜백함수를 인수로 전달받고, 프로미스의 성공 실패와 상관없이 무조건 한 번 호출된다.
new Promise(() => { })
  .finally(() => console.log('finally'));

// ✅ [마이크로태스크 큐]
// 아래 비동기 함수들의 실행순서는 어떨까?
// 프로미스의 resolve후속처리 메서드의 콜백함수는 태스크 큐가 아니라 마이크로태스크 큐에 저장된다.
// 마이크로태스크 큐는 태스크 큐에 비해 우선순위가 높다.

// 📃 [예제 p.864]
setTimeout(() => console.log(1), 0);

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));

// ✅ [fetch]
// fetch함수가 반환하는 프로미스는 기본적으로 404(not found)나 500(internal server error)와 같은 http에러가 발생해도
// 에러를 reject하지 않고 불리언 타입의 ok상태를 false로 설정한 response객체를 resolve한다.
// 오프라인 등의 네트워크 장애, CORS에러에 의해 요청이 완료되지 못한 경우에만 프로미스를 reject한다.