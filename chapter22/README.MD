# 22장 this

```
22.1 this 키워드
22.2 함수 호출 방식과 this 바인딩
____22.2.1 일반 함수 호출
____22.2.2 메서드 호출
____22.2.3 생성자 함수 호출
____22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출
```

## 22.1 this 키워드

<details>
  <summary>객체란 무엇인가?</summary>
  
  상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.
</details>

<details>
  <summary>this란 무엇인가?</summary>
  
  this는 자신이 속한 객체 혹인 자신이 생성할 인스턴스를 가르키는 자기 참조 변수이다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
</details>

<details>
  <summary>this에 바인딩되는 값에 대해서 아는데로 설명하라</summary>
  
  - 함수가 호출되는 방식에 따라 this 바인딩이 동적으로 결정된다.
    - 전역에서 this는 window객체를 가리킨다.
    - 어떠한 함수라도 일반함수로 호출되면 함수 내부에서 this는 window객체를 가리킨다.
    - 단, 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    - 메서드 내부에서 this는 메서드를 호출한 객체(즉, 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체)를 가리킨다.
    - 생성자함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    - Function.prototype.apply/call/bind 메서드에 의한 간접 호출 => 첫번째 인수로 전달한 객체를 가리킨다.
</details>
<br/>
