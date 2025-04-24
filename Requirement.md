# 요구 사항 분석

- 인증/인가
    - 로그인 (회원 등록/삭제/수정)
    - Oauth (google login)
- 게시글
    - 게시글 등록/삭제/검색/수정
    - File I/O

## API Endpoints

### Auth

#### Sign Up

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

#### Sign in

`POST /api/v1/auth/sign-in`

```
{
  "email": "email@email.com",
  "password": "sadaf3#fa",
}
```

### Board

#### 게시물 등록

`POST /api/v1/board/{boardNumber}`


#### 게시물 조회

`GET /api/v1/board/{boardNumber}`

```
{
    "code": "SU",
    "message": "Success",
    "boardNumber": 2,
    "title": "제 첫 게시물입니다.",
    "content": "제 첫 게시물입니다. 많이 부족합니다. \n",
    "boardImageList": [
        "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
    ],
    "writeDatetime": null,
    "writerEmail": "email@email.com",
    "writerNickname": "nickname3213",
    "writerProfileImage": null
}
```