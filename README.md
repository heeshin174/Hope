# HOPE

![](KIP.png)

> [!NOTE]
> 각 기술 스택을 직접 사용해보며 공부하는 toy project입니다.

HOPE는 인터넷에 널리 퍼져있는 여러 개발 지식을 모아놓은 플랫폼입니다. 다양한 기술들을 직접 사용해보며 공부도 같이 할 수 있는 웹 어플리케이션을 제작해봅니다. (server 위주)

많은 개발 지식들이 영어로 작성되어 있고, 주니어 개발자라면 무엇을 어떻게 공부해야 할 지도 막막합니다. 개발이 좋다고는 하는 데 막상 어디서부터 어떻게 시작해야 할 지가 막막합니다.

그래서 초기 아이디어는 개발자로서 배우면 좋은 roadmap, 각 이론 별 실습할 내용들, Q & A, 정보 공유, 최신 개발 트렌드 들을 정리한 사이트가 있으면 좋겠다는 생각이 들었습니다. 

쉽게 말하면 초보 개발자를 위한 커뮤니티를 만들어 보는 것입니다.

## 요구 사항 분석

- 인증/인가
    - 로그인 (회원 등록/삭제/수정)
    - Oauth (google login)
- 게시글
    - 게시글 등록/삭제/검색/수정
    - File I/O

See details at [Requirement](./requirement.md)

## 개발 환경

### Back-end

- Spring boot:3.4.4 (Java21)
    - SpringData JPA
    - Gradle
    - Spring Security
- MySQLDB
- Redis
- Docker & k8s
- Jenkins
- Apache Kafka
- RabbitMQ
- AWS

### Front-end

- React:19.0.0 (typescript + SWC /w vite)

## Troubleshooting

See details at [Troubleshooting](./Trobleshooting.md)

## 블로그

- 글 맨 위에 주제를 한 줄로 간단히 소개한다.
- 글을 읽기 전 이 글에서 얻을 수 있는 키 컨셉을 퀴즈로 보여준다. 
  - 이미 아는 사용자이거나, 특정 내용이 궁금한 사용자는 거기에 맞춰 글을 읽는다.
- 글 중간 중간에 자료 연결하기
- 글은 한 feature만 다루기

**기억 인출과 연결하는 법**

이 모든 건 AI 생성 또는 본인이 직접 생성 중 택 1

1. 퀴즈를 글 시작에 제공 
  - 직접 질문에 답하며 피드백 받음
2. 글 중간 중간에 빈칸 (highlight, bold text, colored text, ...)을 껐다 켤 수 있는 기능을 제공
3. 이미지 역시 text와 섞인 이미지면 텍스트 숨기기 기능 제공
4. 이 내용으로 무엇을 할 수 있는 지 실습 내용 제공

