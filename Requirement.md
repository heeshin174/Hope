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
  "password": "sadaf3#fa"
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

#### 좋아요 기능

`PUT /api/v1/board/{boardNumber}/favorite`

**Header**

```
name         | value
---            ---
Authrization | Bearer Token 
```

**Request**


**Response**

Success

```
Http Status: 200
{
  "code": "SU",
  "message": "Success"
}
```

Fail

1. 유효성 검사 실패

```
Http Status: 400 (Bad Request)
{
  "code": "VF",
  "message": "Validation failed"
}
```

2. 존재하지 않는 게시물

```
Http Status: 401 (Unauthorized)
{
  "code": "NB",
  "message": "This board does not exist."
}
```

3. 존재하지 않는 유저

```
Http Status: 401 (Unauthorized)
{
  "code": "NU",
  "message": "This user does not exist."
}
```

4. 인증 실패

```
Http Status: 401 (Unauthorized)
{
  "code": "AF",
  "message": "Authorization Failed"
}
```

5. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```

#### 좋아요 리스트

`GET /api/v1/board/{boardNumber}/favorite-list`

**Header**

**Request**

**Response**

Success

```
Http Status: 200
{
  "code": "SU",
  "message": "Success",
  "favoriteList": [
    {
      "email": "email@email.com",
      "nickname": "nickname",
      "profileImage": null
    },
    {
      "email": "email2@email.com",
      "nickname": "nickname2",
      "profileImage": null
    }
  ]
}
```

Fail

1. 존재하지 않는 게시물

```
Http Status: 401 (Unauthorized)
{
  "code": "NB",
  "message": "This board does not exist."
}
```

2. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```
