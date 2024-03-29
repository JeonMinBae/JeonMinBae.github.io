---
date: '2022-08-26'
title: 'Entity와 상태패턴'
categories: ['Spring', 'Jpa']
summary: 'Entity에서 상태패턴 적용해보기'
thumbnail: 'state_parttern_in_jpa_thumbnail.png'
---



# Entity에 디자인 패턴을 적용시키면 어떨까

프로젝트를 진행하는 도중 여러 도메인 메소드가 엔티티의 상태에 따라 다르게 동작하는 경우가 있었습니다.

상태별 로직의 차이가 몇몇 변수값이 바뀌는 정도 혹은 로직 한 두줄이 추가되는 정도라면 각각의 함수마다 상태를 체크하는 분기를 넣어 로직을 분리를 할 수도 있겠지만 

상태에 따른 동작이 꽤나 상이하게 진행되는 로직으로 함수가 상태에 종류만큼 비대해지며 응집도도 떨어지는 상황이 될 것이 뻔해보였습니다.

그렇기에 상태별로 함수가 다른 로직을 실행했으면 좋겠다고 생각하였고 거기에 맞아 떨어지는 디자인 패턴인

상태패턴이 떠올랐습니다. 

그래서 상태패턴으로 상태별 로직을 분리하여 관리해보기로 했습니다.

> 상태패턴에 대한 설명은 [여기](https://ko.wikipedia.org/wiki/%EC%83%81%ED%83%9C_%ED%8C%A8%ED%84%B4)를 참조
>

<br/>

# Entity 내부의 인터페이스

## Entity의 속성은 인터페이스가 될 수 없다.

JPA는 인터페이스를 지원하지 않습니다. 

그렇기에 상태 패턴을 사용 시 각각의 상태구현체를 담아둘 인터페이스가 필요한데 `entity`에는 넣을 수가 없습니다.

```java
public interface TestState {
    void update(String str);
    void changeState(TestStatus status);
    void changeName(String name);
}

public class T1State implements TestState {
    private TestEntity test;

    public T1State(TestEntity test) {
        this.test = test;
    }

    @Override
    public void update(String str) {
        System.out.println("T1 str = " + str);
    }

    @Override
    public void changeState(TestStatus status) {
        if(TestStatus.IN_PROGRESS.equals(status)){
            test.status = status;
            test.testState = new T3State(test);
        }else{
            throw new IllegalArgumentException("PLANNED can change only to IN_PROGRESS");
        }
    }

    @Override
    public void changeName(String name) {
        test.name = "T1" + name;
    }
}

public class T2State implements TestState {
    TestEntity test;

    public T2State(TestEntity test) {
        this.test = test;
    }

    @Override
    public void update(String str) {
        System.out.println("T2 str = " + str);
        test.changeName(str);
    }

    @Override
    public void changeState(TestStatus status) {
        throw new IllegalArgumentException("STOP can change status");
    }

    @Override
    public void changeName(String name) {
        test.name = "T2" + name;
    }
}

public class T3State implements TestState {
    TestEntity test;

    public T3State(TestEntity test) {
        this.test = test;
    }

    @Override
    public void update(String str) {
        System.out.println("T3 str = " + str);
        test.changeName(str);
    }

    @Override
    public void changeState(TestStatus status) {
        if(TestStatus.STOP.equals(status)){
            test.status = status;
            test.testState = new T2State(test);
        }else{
            throw new IllegalArgumentException("IN_PROGRESS can change only to STOP");
        }
    }

    @Override
    public void changeName(String name) {
        test.name = "T3" + name;
    }
}
```

![img1](./state_parttern_in_jpa1.png)

## @Transient

JPA는`@Transient` 라는 어노테이션을 지원합니다.

이 기능을 이용하면 인터페이스가 영속화 대상에서 제외되며 `entity` 내부에서 인터페이스를 사용할 수  있습니다.

![img2](./state_parttern_in_jpa2.png)

```java
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TestEntity {

    @Id
    @GeneratedValue
    private Long index;
    private String name;
    private TestStatus status;

    @Transient
    private TestState testState;

    @Builder
    public TestEntity(Long index, String name, TestStatus status) {
        this.index = index;
        this.name = name;
        this.status = status;

        switch (status) {
            case PLANNED:
                this.testState = new T1State(this);
                break;
            case STOP:
                this.testState = new T2State(this);
                break;
            case IN_PROGRESS:
                this.testState = new T3State(this);
                break;
        }
    }

    public void update(String str) {
        testState.update(str);
    }

    public void changeState(TestStatus status) {
        testState.changeState(status);
    }

    public void changeName(String name) {
        testState.changeName(name);
    }

  
}
```

<br/>

# 불러온 엔티티의 @Transient 필드는 NULL

이제 상태패턴으로 구현이 되어 문제없이 사용할 수 있을 줄 알았습니다.

테스트코드 작성 후 테스트를 해본 결과 NPE(NullPointerException)가 발생하는 것을 볼 수 있습니다.

```java

@SpringBootTest
@Transactional
class TestTest {

    @Autowired
    TestRepo testRepo;

    
    @Test
    public void test() {
        TestEntity test = TestEntity.builder()
            .index(1L)
            .name("QWE")
            .status(TestStatus.PLANNED)
            .build();
        testRepo.save(test);

        TestEntity found = testRepo.findById(1L).get();
        found.changeName("change"); //여기서 발생, TestEntity의 testState가 null 
        System.out.println("1: found = " + found);

        found.changeState(TestStatus.IN_PROGRESS);
        found.update("change name");
        System.out.println("2: found = " + found);

    }
    
    @Test
    public void exceptionTest() {

      TestEntity test = TestEntity.builder()
          .index(2L)
          .name("QWE")
          .status(TestStatus.PLANNED)
          .build();
      testRepo.save(test);

      TestEntity found = testRepo.findById(2L).get();
      assertThrows(IllegalArgumentException.class, () ->found.changeState(TestStatus.STOP));
    }

}
```

![img3](./state_parttern_in_jpa3.png)

`@Transient` 로 제외한 필드는 영속성 컨텍스트로 관리되지 않기에 

생성할 때는 생성자 함수에서 값을 설정하여 문제가 없지만 

find류 함수로 불러올 때는 값이 채워지지 않은 비어있는 상태로 반환되어 이러한 에러가 발생하는 것입니다.


<br/>

# 해결

그렇다면 사용전에 세팅만 해준다면 문제가 없지 않을까

각각의 `update()`, `changeState()`, `changeName()` 함수 호출 직후 `initState()` 를 바로 호출하여 `testState`를 초기화 해주면 에러가 발생하지 않습니다.

이제 새로운 상태가 추가되었을 때는 상태에 맞는 처리를 하는 클래스를 작성 후 초기화 함수에 추가만 해주면 되게되었습니다.

![img4](./state_parttern_in_jpa4.png)

![img5](./state_parttern_in_jpa5.png)


<br/>

# 고찰

그래도 여전히 찝찝함은 남게되는데 인터페이스 함수를 쓰기 전에는 항상 인터페이스가 초기화 되었는지 직접 확인하는 코드를 작성해여된다는 점입니다.

그래서 다른 더 좋은 방법이 없을까 하여 고민을 해보았는데 결론부터 말씀드리자면 **실패**입니다.

## EntityListener

JPA에는 Entity에서 이벤트가 발생할 때마다 원하는 로직을 실행시킬 수 있게 도와주는 기능이 존재합니다.

`EntityListener` 라고 하며 종류와 이벤트 시점은 아래와 같습니다.

|  | 이벤트 발생시점 |
| --- | --- |
| @PrePersist | insert method가 호출되기 전 |
| @PreUpdate | merge method가 호출되기 전 |
| @PreRemove | delete method가 호출되기 전 |
| @PostPersist | insert method가 호출된 이후 |
| @PostUpdate | merge method가 호출된 이후 |
| @PostRemove | delete method가 호출된 이후 |
| @PostLoad | select 조회가 된 직후 |

이 중에서 `@PostLoad`를 이용해서 초기화 작업을 처리해보겠습니다.

```java
@PostLoad
private void init() {
    initState();
}

private void initState() {
    switch (status) {
        case PLANNED:
            this.testState = new T1State(this);
            break;
        case STOP:
            this.testState = new T2State(this);
            break;
        case IN_PROGRESS:
            this.testState = new T3State(this);
            break;
    }
}
```

위 코드를 추가 함수마다 적어놓은 초기화 코드 제거 후 테스트를 돌려보면 *여전히 실패합니다.*

해당 어노테이션은  `find` 함수직후 불리는 것이 아니라 실제 SQL이 발생 하였을 때 발생하는 것이기 때문입니다.

## Aspect

`@Aspect`는 AOP를 가능하게 하는 AspectJ 프로젝트에서 제공하는 어노테이션으로 AOP의 구현을 쉽게 해줍니다.

하지만 이 역시 스프링의 `Bean`에 등록된 객체만 가능하기에 `entity`에는 적용할 수 없었습니다.


<br/>

# 결론

JPA 엔티티에 상태패턴을 적용하여 처리하기는 성공하였으나 그 방식에 깔끔하지 못해 개선이 필요해보인다.

![img6](./state_parttern_in_jpa6.png)


<br/>

# 마무리

이번 글의 내용 및 코드를 작성하면서 느낀 점은 

기존의 대부분의 spring, jpa 관련된 검색 내용들은 누가 이미 겪은 에러, 상황, 고민 들이었는데

이번의 경우에는 생각보다 관련 내용이 적었습니다. <small>이유가 있던걸지도…</small>

본 글의 방법처럼 적용해 사용해도 문제가 없는 것인지 아니면 JPA와는 맞지 않는 방법인지는 솔직히 잘 모르겠습

니다.

분명 더 좋은 방법이 있을거 같은데 그 해답을 찾지 못하는 부족함을 반성하며 계속해서 개선해 나가야되겠습니다.