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

#### 게시물 조회

`GET /api/v1/board/{boardNumber}`

**Header**

**Request**

**Response**

Success

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

Fail

1. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```


#### 게시물 등록

`POST /api/v1/board/{boardNumber}`

**Header**

```
name         | value
---            ---
Authrization | Bearer Token 
```

**Request**

{
  "title": "제 첫 게시물입니다.",
  "content": "제 첫 게시물입니다. 많이 부족합니다. \n",
  "boardImageList": [
    "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
  ]
}

**Response**

Success 

```
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

2. 존재하지 않는 유저

```
Http Status: 401 (Unauthorized)
{
  "code": "NU",
  "message": "This user does not exist."
}
```

3. 인증 실패

```
Http Status: 401 (Unauthorized)
{
  "code": "AF",
  "message": "Authorization Failed"
}
```

4. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```

#### 게시물 수정

`PATCH /api/v1/board/{boardNumber}`

**Header**

```
name         | value
---            ---
Authrization | Bearer Token 
```

**Request**

```
{
  "title": "제 첫 게시물입니다.",
  "content": "제 첫 게시물입니다. 많이 부족합니다. \n",
  "boardImageList": [
    "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
  ]
}
```

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

5. 권한 없음

```
Http Status: 403 (Forbidden)
{
  "code": "NP",
  "message": "Do not have Permission"
}
```

6. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```

#### 게시물 삭제

`DELETE /api/v1/board/{boardNumber}`

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

5. 권한 없음

```
Http Status: 403 (Forbidden)
{
  "code": "NP",
  "message": "Do not have Permission"
}
```

6. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```

#### 최신 게시물 리스트

`GET /api/v1/board/latest-list`

**Header**

**Request**

**Response**

Success

```
Http Status: 200
{
  "code": "SU",
  "message": "Success",
  "latestList": [
    {
      "boardNumber": 1,
      "title": "제목입니다.",
      "content": "제 첫 게시물입니다. 많이 부족합니다. \n",
      "boardImageList": [
          "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
      ],
      "writeDatetime": null,
      "writerEmail": "email@email.com",
      "writerNickname": "nickname3213",
      "writerProfileImage": null
    },
    {
      "boardNumber": 2,
      "title": "제목입니다2.",
      "content": "제 두번째 게시물입니다. 많이 부족합니다. \n",
      "boardImageList": [
          "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
      ],
      "writeDatetime": null,
      "writerEmail": "email@email.com",
      "writerNickname": "nickname3213",
      "writerProfileImage": null
    }
  ]
}
```

Fail

1. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```

#### 주간 상위 3개 게시물 리스트 

`GET /api/v1/board/top-3`

**Header**

**Request**

**Response**

Success

```
Http Status: 200
{
  "code": "SU",
  "message": "Success",
  "topList": [
    {
      "boardNumber": 1,
      "title": "제목입니다.",
      "content": "제 첫 게시물입니다. 많이 부족합니다. \n",
      "boardImageList": [
          "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
      ],
      "writeDatetime": null,
      "writerEmail": "email@email.com",
      "writerNickname": "nickname3213",
      "writerProfileImage": null
    },
    {
      "boardNumber": 2,
      "title": "제목입니다2.",
      "content": "제 두번째 게시물입니다. 많이 부족합니다. \n",
      "boardImageList": [
          "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
      ],
      "writeDatetime": null,
      "writerEmail": "email@email.com",
      "writerNickname": "nickname3213",
      "writerProfileImage": null
    },
    {
      "boardNumber": 3,
      "title": "제목입니다3.",
      "content": "제 두번째 게시물입니다. 많이 부족합니다. \n",
      "boardImageList": [
          "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
      ],
      "writeDatetime": null,
      "writerEmail": "email@email.com",
      "writerNickname": "nickname3213",
      "writerProfileImage": null
    }
  ]
}
```

Fail

1. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```

### Favorite

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

#### Comment 작성

`POST /api/v1/board/{boardNumber}/comment`

**Header**

```
name         | value
---            ---
Authrization | Bearer Token 
```

**Request**

```
{
  "content": "오늘 점심은 불고기."
}
```

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

#### Comment list 조회

`GET /api/v1/board/{boardNumber}/comment-list`

**Header**

**Request**

**Response**

Success

```
Http Status: 200
{
  "code": "SU",
  "message": "Success",
  "commentList": [
    {
      "nickname": "nickname",
      "profileImage": null,
      "writeDatetime": "2025.04.04.01:33:00",
      "content": "오늘 점심은 불고기"
    },
    {
      "nickname": "nickname2",
      "profileImage": null,
      "writeDatetime": "2025.04.05.11:33:00",
      "content": "오늘 점심은 불고기야?"
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

### Search 

#### 인기 검색어 리스트

`GET /api/v1/search/popular-list`

**Header**

**Request**

**Response**

Success

```
Http Status: 200
{
  "code": "SU",
  "message": "Success",
  "popularWordList": ["아침", "점심", "저녁" ]
}
```

#### 검색 게시물 리스트

`GET /api/v1/board/search-list/{searchWord}`
`GET /api/v1/board/search-list/{searchWord}/{preSearchWord}`

**Header**

**Request**

**Response**

Success

```
Http Status: 200
{
  "code": "SU",
  "message": "Success",
  "searchList": [
    {
      "boardNumber": 1,
      "title": "제목입니다.",
      "content": "제 첫 게시물입니다. 많이 부족합니다. \n",
      "boardImageList": [
          "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
      ],
      "writeDatetime": null,
      "writerEmail": "email@email.com",
      "writerNickname": "nickname3213",
      "writerProfileImage": null
    },
    {
      "boardNumber": 2,
      "title": "제목입니다2.",
      "content": "제 두번째 게시물입니다. 많이 부족합니다. \n",
      "boardImageList": [
          "http://localhost:8080/file/d95ee6f4-5eda-4961-be86-0279493815cb.jpg"
      ],
      "writeDatetime": null,
      "writerEmail": "email@email.com",
      "writerNickname": "nickname3213",
      "writerProfileImage": null
    }
  ]
}
```

Fail

1. 데이터베이스 오류

```
Http Status: 500 (Internal Server Error)
{
  "code": "DBE",
  "message": "Database error"
}
```
