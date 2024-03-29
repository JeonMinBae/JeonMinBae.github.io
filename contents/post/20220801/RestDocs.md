---
date: '2022-08-01'
title: 'Spring Rest Docs Docs'
categories: ['Spring', 'Test']
summary: '테스트코드 기반 API 문서 자동화 Rest Docs'
thumbnail: 'RestDocs_thumbnail.png'
---

<style>
  qq{
    color: red; 
    background-color: whitesmoke; 
    border-radius: 10%; 
    font-size: 80%;
  }
  ww{
    color: orange; 
    background-color: whitesmoke; 
    border-radius: 10%; 
    font-size: 80%;
  }
</style>

# Rest Docs란

<blockquote>Spring REST Docs의 목표는 RESTful 서비스에 대한 정확하고 읽기 쉬운 문서를 생성하도록 돕는 것입니다. <br/>
고품질 문서를 작성하는 것은 어렵습니다. 그 어려움을 완화하는 한 가지 방법은 작업에 잘 맞는 도구를 사용하는 것입니다. <br/>
이를 위해 Spring REST Docs는 기본적으로 <qq>Asciidoctor</qq> 를 사용합니다. <br/>
<qq>Asciidoctor</qq>는 일반 텍스트를 처리하고 필요에 맞게 스타일이 지정되고 배치된 HTML을 생성합니다. <br/>
원하는 경우 <qq>Markdown</qq>을 사용하도록 Spring REST Docs를 구성할 수도 있습니다. <br/>
Spring REST Docs는 Spring MVC의 <qq>테스트 프레임워크</qq> , 
Spring WebFlux <qq>WebTestClient</qq>또는 <qq>REST Assured 3</qq> 로 작성된 테스트에서 생성된 스니펫을 사용합니다 . <br/>
이 테스트 기반 접근 방식은 서비스 문서의 정확성을 보장하는 데 도움이 됩니다. 스니펫이 올바르지 않으면 이를 생성하는 테스트가 실패합니다. <br/>
RESTful 서비스를 문서화하는 것은 주로 리소스를 설명하는 것입니다. 각 리소스 설명의 두 가지 핵심 부분은 소비하는 HTTP 요청의 세부 정보와 생성하는 HTTP 응답입니다. <br/>
Spring REST Docs를 사용하면 이러한 리소스와 HTTP 요청 및 응답으로 작업하여 서비스 구현의 내부 세부 사항으로부터 문서를 보호할 수 있습니다. 
이 분리는 구현이 아닌 서비스의 API를 문서화하는 데 도움이 됩니다. 또한 문서를 다시 작업하지 않고도 구현을 발전시킬 수 있습니다. <br/>
<br/>
-docs.spring.io의 소개 글-
</blockquote>

API문서 작성을 자동화해주는 도구로 테스코드 기반으로 API문서를 작성하기 때문에 소스코드에 영향을 주지 않으며 문서의 정확성을 보장하는데
도움을 줍니다.

# Rest Docs vs 스웨거

API문서 자동화라고하면 Rest Docs 이외에도 스웨거가 많이 거론됩니다.

이 둘을 장단점을 비교해보겠습니다.

|  | Rest Docs | Swagger |
| --- | --- | --- |
| 장점 | 소스코드에 영향이 없다. <br/> 테스트코드 기반으로 소스코드에 변경이 있을 시 문서와의 동기화가 잘 된다. | API를 테스트 해볼 수 있는 환경이 제공된다. <br/>적용이 쉽고 간단한 편이다. |
| 단점 | 적용하기 비교적 어렵다. | 소스코드 내부에 문서와 관련된 어노테이션을 추가해야한다. <br/>코드와 문서간의 불일치가 발생할 가능성이 있다. |

# 설정

- <qq>springboot: 2.7.0</qq>
- <qq>gradle: 7.4.1</qq>
- <qq>JUnit5</qq>
- <qq>MockMvc</qq>
- <qq>Asciidoctor</qq>

## build.gradle

```gradle
plugins {
        // gradle 7.0 이상부터는 jvm 사용
        // id 'org.asciidoctor.convert' version '1.5.6' gradle7 이전 버전에서 사용
	id 'org.asciidoctor.jvm.convert' version '3.3.2'
}

configurations {
	// build/generated-snippets 에 생긴 .adoc 조각들을 프로젝트 내의 .adoc 파일에서 읽어들일 수 있도록 연동해줍니다.
	// 이 덕분에 .adoc 파일에서 operation 같은 매크로를 사용하여 스니펫 조각들을 연동할 수 있는 것입니다.
	// 그리고 최종적으로 .adoc 파일을 HTML로 만들어 export 해줍니다.
	asciidoctorExtensions
}

ext {
	snippetsDir = file('build/generated-snippets')
}

test {
	outputs.dir snippetsDir
	useJUnitPlatform()
}

asciidoctor {
	inputs.dir snippetsDir
	configurations 'asciidoctorExtensions'
	dependsOn test

	// 특정 .adoc에 다른 adoc 파일을 가져와서(include) 사용하고 싶을 경우 경로를 baseDir로 맞춰주는 설정입니다.
	// 개별 adoc으로 운영한다면 필요 없는 옵션입니다.
	baseDirFollowsSourceFile()
}

asciidoctor.doFirst {
	// 기존에 존재하던 문서파일 삭제
	delete file('src/main/resources/static/docs')
}

// asccidoctor 작업 이후 생성된 HTML 파일을 static/docs 로 copy
task copyDocument(type: Copy) {
	dependsOn asciidoctor
	from file("build/docs/asciidoc")
	into file("src/main/resources/static/docs")
}

build {
	dependsOn copyDocument
}

dependencies {
        //...

        // rest docs
	asciidoctorExtensions 'org.springframework.restdocs:spring-restdocs-asciidoctor'
	testImplementation 'org.springframework.restdocs:spring-restdocs-mockmvc'

}
```

## *.adoc 생성

<p><ww>src/docs/asciidoc</ww> 디렉터리 안에 .adoc로 끝나는 파일을 미리 생성해 두어야 합니다.</p>

파일의 이름은 원하는대로 설정 가능하며, <ww>build.gradle</ww>에 설정한 경로인 <ww>
src/resources/static/docs</ww> 에 같은 이름의 html파일로 복사됩니다.

![img1](./RestDocs1.png) 

![img2](./RestDocs2.png)

인텔리제이에서는 플러그인 설치 시 해당 파일의 결과를 미리볼 수 있습니다.

![img3](./RestDocs3.png)

# 빌드

테스트코드 기반인 만큼 빌드 시 테스트코드 동작 후 테스트 통과 시 문서를 자동생성하며 테스트 실패 시 문서가 생성되지 않습니다.

문서들은 <ww>build.gradle</ww>에 설정한 경로인 <ww>build/generated-snippets</ww>에 생성됩니다.

![img4](./RestDocs4.png)

## 빌드 실패 원인확인

빌드 실패 시 <ww>build/reports/tests/test/index.html</ww>에서 테스트 결과와 실패 원인을 확인해 볼 수
있습니다.

![img5](./RestDocs5.png)

# 문서 조합

> asciidoc 기본 사용법: [https://narusas.github.io/2018/03/21/Asciidoc-basic.html](https://narusas.github.io/2018/03/21/Asciidoc-basic.html)


<p><ww>include::{snippets}/index/curl-request.adoc[]</ww> 형식으로 문서에 스니펫을 추가할 수 있습니다.</p>

## 자동조합

위의 <ww>include</ww>를 매 파일마다 입력하기란 매우 번거로운 작업입니다.

asciidoc에서는 operation 키워드를 이용해 해당 위치의 파일들을 자동으로 읽어올 수 있습니다.
스니펫을 불러오면서 헤더도 자동으로 생성해 줍니다.

<ww>operation::document-identifier[option]</ww>

option 입력 시 원하는 파일을 선택하여 조합이 가능합니다. (주의: ,에 띄어쓰기를 사용하면 안됨)

(o)<ww>operation::
user[snippets='http-request,http-response,response-fields']</ww>
(x)<ww>operation::
user[snippets='http-request, http-response, response-fields']</ww>

만약 헤더의 이름이 마음에 들지 않는다면 직접 지정할 수도 있습니다.
<ww>:operation-http-request-title: header name sample</ww>

![img6](./RestDocs6.png)

![img7](./RestDocs7.png)

# 스니펫 커스텀

> <p><qq>.snippet</qq> 파일은 <qq>mustache</qq>를 기반으로 작성되어 있습니다.</p>

자동으로 생성되는 스니펫은 간편하고 유용하지만 추가정보를 담거나 형태를 수정하고 싶은 경우가 있습니다.

## 파일 커스텀

<p><ww>test/resources/org/springframework/restdocs/templates</ww> 에 원하는 스니펫 파일을 원본 이름과 같게 만들어 커스텀 가능합니다.</p>

![img8](./RestDocs8.png)

기본 템플릿은 <ww>spring-restdocs-core</ww>의  <ww>
org.springframework.restdocs.templates.asciidoctor</ww>에 존재합니다.

이를 참고하여 기본형태에 원하는 값을 추가할 수도 있고 형태를 변경 시킬 수도 있습니다.

![img9](./RestDocs9.png)

## 데이터 커스텀

<p><ww>FieldDescriptor</ww> 의 요소 중에는 <ww>attributes</ww> 라는 메서드가 있으며 해당 메서드를 이용하여 속성을 추가, 수정할 수 있습니다.</p>

속성 추가

```java
public interface DocumentAttributeGenerator {
  static Attributes.Attribute getDateTimeFormat() {
    return Attributes.key("format").value("yyyy-MM-ddTHH:mm:ss.SSSSS");
  }

  static Attributes.Attribute getDateFormat() {
    return Attributes.key("format").value("yyyy-MM-dd");
  }
}
```

속성 적용

```java
resultActions.andExpect(status().isOk())
  // ...

  responseFields(
  // ...

  fieldWithPath("createdDateTime").type(JsonFieldType.STRING).attributes(getDateTimeFormat()).description("생성일자"),
  fieldWithPath("updatedDateTime").type(JsonFieldType.STRING).attributes(getDateTimeFormat()).description("수정일자")

  // ...
  )
  ));
```

## 예시

기본형태
![mustache1](./mustache1.png)

스니펫을 커스텀하여 <ww>Optional</ww>, <ww>Format</ww> 을 추가한 형태
![mustache2](./mustache2.png)

![img10](./RestDocs10.png)

# 예시 및 결과

```java
//사용자 수정 테스트코드
@Test
@WithMockUser(username = "qwe", password = "qwe", authorities = {"ROLE_ADMIN", "ROLE_USER"})
public void update()throws Exception{

  UpdateUserDto updateUserDto=UpdateUserDto.builder()
  .userName("asd")
  .userRole(Role.ROLE_USER)
  .userPhoneNumber("010-1111-2223")
  .locked(false)
  .build();

  UserDetailDto detailDto=UserDetailDto.builder()
  .userIndex(1L)
  .userId("qwe")
  .userName("asd")
  .userRole(Role.ROLE_USER)
  .userPhoneNumber("010-1111-2223")
  .locked(false)
  .isDelete(false)
  .createdDateTime(LocalDateTime.of(2022,6,24,15,30))
  .updatedDateTime(LocalDateTime.of(2022,6,24,15,30))
  .build();

  when(userService.updateUser(any(),any())).thenReturn(detailDto);

  ResultActions resultActions=this.mockMvc.perform(RestDocumentationRequestBuilders.put("/api/users/{userIndex}",1)
  .header(TokenProvider.AUTHORIZATION_HEADER_NAME,"here is jwt")
  .content(objectMapper.writeValueAsString(updateUserDto))
  .contentType(MediaType.APPLICATION_JSON)
  .accept(MediaType.APPLICATION_JSON)
  );

  resultActions.andExpect(status().isOk())
  .andDo(document("user-update",
  ApiDocumentUtils.getDocumentRequest(),
  ApiDocumentUtils.getDocumentResponse(),
  pathParameters(
  parameterWithName("userIndex").description("인덱스")
  ),
  requestFields(
  fieldWithPath("userName").type(JsonFieldType.STRING).description("이름").optional(),
  fieldWithPath("userPhoneNumber").type(JsonFieldType.STRING).description("핸드폰번호").optional(),
  fieldWithPath("userRole").attributes(getEnumAttr(Role.class)).description("권한").optional(),
  fieldWithPath("locked").type(JsonFieldType.BOOLEAN).description("잠금여부").optional()
  ),
  responseFields(
  fieldWithPath("userIndex").type(JsonFieldType.NUMBER).description("인덱스"),
  fieldWithPath("userId").type(JsonFieldType.STRING).description("아이디"),
  fieldWithPath("userName").type(JsonFieldType.STRING).description("이름"),
  fieldWithPath("userPhoneNumber").type(JsonFieldType.STRING).description("핸드폰번호"),
  fieldWithPath("userRole").attributes(getEnumAttr(Role.class)).description("권한"),
  fieldWithPath("locked").type(JsonFieldType.BOOLEAN).description("잠금여부"),
  fieldWithPath("isDelete").type(JsonFieldType.BOOLEAN).description("삭제처리여부"),
  fieldWithPath("createdDateTime").type(LocalDateTime.class).attributes(getDateTimeFormat()).description("생성일자"),
  fieldWithPath("updatedDateTime").type(LocalDateTime.class).attributes(getDateTimeFormat()).description("수정일자")
  )));
  }
```

![img11](./RestDocs11.png)

# 마무리

팀 내부에서 API명세에 대한 정보를 노션을 공유하고 있습니다.

이에 따라서 벡앤드 개발자는 개발 후 API문서를 따로 작성해야되며,

개발도중 API명세가 바뀔 경우는 해당 문서를 다시 수정해야되는 번거로움이 있습니다.

그래서 저는 이러한 불편함을 개선하고자 API문서를 자동화를 할 수 있는 라이브러리를 찾았고 처음에는 스웨거를 적용하게 되었습니다.

스웨거는 간편하고 좋았으나 점점 소스코드에 절반 이상이 문서관련 어노테이션으로 잠식당했으며 코드 수정 시 해당 어노테이션을 수정해야된다는 점은
기존과 큰 차이가 없어보였습니다.

어노테이션을 yml파일로 추출하는 방법을 찾아보던 중 Rest Docs라는 라이브러리를 알게되었고

테스트코드 기반의 Rest Docs는 위의 두 가지 문제를 해결해주었습니다.

물론 Rest Docs의 단점에 거론된 적용이 번거롭다는 단점은 명확했습니다.

- build.gradle 설정도중 플러그인의 버전이 맞지않아 헤메고
- .adoc를 작성하는 방법을 찾아보고
- 스니펫을 커스텀하면서 오류를 마주하고

하지만 초기설정만 끝나면 그 이후에는 테스트코드작성과 .adoc에 스니펫을 추가하기만 하면 간단하게 문서가 작성되었기에 오히려 편하게 문서를
작성할 수 있었으며

따로 문서를 공유할 필요없이 초기에 해당 API가이드에 접근할 수 있는 링크만 건네고 명세가 갱신되었을 때는 갱신 여부와 갱신된 영역만을
알려주면 되어 편하게 작업이 가능했습니다.

아직은 작은 프로젝트에만 적용되어 사용 중이지만 이후에는 전반적인 프로젝트에 적용하여 사용할 예정입니다.

> 참조:  <br/>[https://techblog.woowahan.com/2597/](https://techblog.woowahan.com/2597/) <br/>
> [https://johngrib.github.io/wiki/restdoc-item-generator/](https://johngrib.github.io/wiki/restdoc-item-generator/) <br/>
> [https://velog.io/@dae-hwa/Spring-REST-Docs-살펴볼만한-기능들](https://velog.io/@dae-hwa/Spring-REST-Docs-%EC%82%B4%ED%8E%B4%EB%B3%BC%EB%A7%8C%ED%95%9C-%EA%B8%B0%EB%8A%A5%EB%93%A4) <br/>
> [https://backtony.github.io/spring/2021-10-15-spring-test-3](https://backtony.github.io/spring/2021-10-15-spring-test-3)