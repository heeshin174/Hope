# 요구 사항 분석

- 인증/인가
    - 로그인 (회원 등록/삭제/수정)
    - Oauth (google login)
- 게시글
    - 게시글 등록/삭제/검색/수정
    - File I/O

## API

### Endpoints

`POST /api/v1/auth/sign-up`

```
{
  "email": "email@email.com",
  "password": "sadaf3#fa",
  "nickname": "nickname3213",
  "telNumber": "01012345678",
  "address": "부산광역시 부산진구",
  "addressDetail": "하이몰",
  "agreedPersonal": true
}
```

`POST /api/v1/auth/sign-in`

```
{
  "email": "email@email.com",
  "password": "sadaf3#fa",
}
```