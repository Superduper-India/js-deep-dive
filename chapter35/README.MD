# 35장 스프레드 문법

```
35.1 함수 호출문의 인수 목록에서 사용하는 경우
35.2 배열 리터럴 내부에서 사용하는 경우
____35.2.1 concat
____35.2.2 splice
____35.2.3 배열 복사
____35.2.4 이터러블을 배열로 변환
35.3 객체 리터럴 내부에서 사용하는 경우
```

<details>
  <summary>스프레드 문법을 사용하는 경우에 대해 아는대로 설명하라</summary>
  
  - 함수 호출문의 인수 목록
    - `Math.max()`메서드를 사용하는 경우, 이는 가변 인자 함수다. 즉, 개수가 정해져 있지 않은 여러 개의 숫자를 인수로 받아 최대값을 반환한다.
  - 배열 리터럴의 요소 목록
    - concat, splice 등의 메서드를 대신하여 사용한다.
    - 배열의 얕은 복사, 이터러블 혹은 이터러블이면서 유사 배열 객체를 배열로 변환
      - 각각의 경우에 대해 설명하라 + 이터러블이 아닌 유사 배열 객체를 배열로 변환하는 방법은 무엇인가?
  - 객체 리터럴의 프로퍼티 목록
</details>
<details>
  <summary>Rest파라미터와 스프레드 문법의 차이점은 무엇인가?</summary>
  
  - Rest파라미터는 함수에 전달된 인수들의 목록을 배열로 받기 위한 것이고, 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만드는 것이다.
</details>
