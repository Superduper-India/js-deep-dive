// 42장 비동기 프로그래밍
function example() {
  // ✅ [핵심 키워드 1. 동기, 싱글 스레드]
  // 자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖는다.
  // 즉, 한 번에 하나의 태스크만 실행할 수 있는 싱글 스레드 방식으로 동작한다.
  // 때문에 현재 실행 중인 태스크가 종료될 때까지 다음에 실행될 태스크가 대기하는 방식인 동기 처리를 따른다.
  // 👍 실행 순서가 보장된다.
  // 👎 앞선 태스크가 종료될 때까지 이후 태스크들이 블로킹된다.

  // [예제]
  // 아래는 일정시간(delay)이 경과한 후에 콜백함수(func)를 호출하는 sleep함수고, 동기 처리된다.
  function sleep(func, delay) {
    // Date.now()는 현재 시간을 숫자(ms)로 반환하는 값이다.
    // delayUntil은 함수를 호출한 현재 시간에 경과시간을 더한 값이다.
    const delayUntil = Date.now() + delay;

    // 현재 시간이 delayUntil보다 작으면(즉 3초가 경과한 시점이 되면) 반복문을 멈춘다.
    while (Date.now() < delayUntil) { }

    // 3초가 경과한 이후에 콜백함수(func=foo)를 호출한다.
    func();
  }

  // 2️⃣ 3초 경과 후, foo콜백함수가 호출된다.
  function foo() {
    console.log('foo');
  }

  function bar() {
    console.log('bar');
  }

  // 1️⃣ sleep 함수는 3초 후에 foo함수를 호출한다.
  // sleep(foo, 3 * 1000);

  // ✅ [핵심 키워드 2. 비동기]
  // 타이머 함수인 setTimeout과 setInterval, HTTP요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다.
  // 즉, 일정 시간이 경과한 이후에 콜백 함수 foo를 호출하며, bar함수를 블로킹하지 않는다.
  // 때문에 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식인 비동기 처리를 따른다.
  // 👍 앞선 태스크가 종료될 때까지 이후 태스크들이 블로킹되지 않는다.
  // 👎 실행 순서가 보장되지 않는다.
  setTimeout(foo, 3 * 1000);

  // 3️⃣ foo함수 실행시간 경과후에 bar함수가 호출되므로 3초 이상 블로킹(작업 중단)된다.
  bar();
}

function example2() {
  // ✅ [핵심 키워드 3. 이벤트 루프]
  // 이벤트 루프는 브라우저에 내장되어 있는 기능 중 하나고, 자바스크립트의 동시성을 지원한다.
  // 자바스크립트 엔진은 콜스택, 힙으로 구성되어있고, 콜스택을 통해 요청된 작업을 순차적으로 실행할 뿐이다.
  // 비동기 처리에서 소스코드의 평가와 실행을 제외한 모든 처리는 js엔진을 구동하는 환경인 브라우저 또는 Node.js가 담당하고,
  // 이를 위해 브라우저 환경은 태스크 큐와 이벤트 루프를 제공한다.
  // 콜스택이 비어있고, 태스크 큐에 대기 중인 함수(콜백 함수, 이벤트 핸들러 등)가 있다면,
  // 이벤트 루프는 선입선출로 태스크 큐에 대기 중인 함수를 콜스택으로 이동시킨다.

  // [예제]
  function foo() {
    console.log('foo');
  }

  function bar() {
    console.log('bar');
  }

  // setTimeout의 콜백함수인 foo는 태스크 큐에 푸시되어 대기하다가 콜 스택이 비게되면 비로소 콜 스택에 푸쉬되어 실행된다.
  setTimeout(foo, 3 * 1000);

  bar();

  // ✅ [핵심 키워드 4. 멀티 스레드]
  // js는 싱글 스레드 방식으로 동작하는 언어이다.
  // 그런데 여기서 싱글 스레드로 동작하는 것은 브라우저가 아닌 브라우저에 내장된 js엔진이다.
  // 만약 모든 js코드가 js엔진에서 싱글 스레드 방식으로 동작한다면 js는 비동기로 동작할 수 없다.
  // 즉, js엔진은 싱글 스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다.
}

test("run", () => {
  // expect(example()).toBe();
  expect(example2()).toBe();
});
