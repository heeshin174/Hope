import Container from 'layouts/Container'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from 'views/Authentication'
import BoardDetail from 'views/Board/Detail'
import BoardUpdate from 'views/Board/Update'
import BoardWrite from 'views/Board/Write'
import Main from 'views/Main'
import Search from 'views/Search'
import UserP from 'views/User'
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useLoginUserStore } from 'stores'
import { GetSignInUserResponseDto } from 'apis/response/user'
import { ResponseDto } from 'apis/response'
import { getSignInUserRequest } from 'apis'
import { User } from 'types/interface'

function App() {

  // state: 로그인 유저 전역 상태
  const { setLoginUser, resetLoginUser } = useLoginUserStore();
  // state: cookie 상태
  const [cookies, setCookies] = useCookies();

  // function: get sign in user response 처리 함수
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF' || code === 'NU' || code === 'DBE') {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...(responseBody as GetSignInUserResponseDto) };
    setLoginUser(loginUser);
  }

  // effect: accessToken cookie 값이 변경될 때마다 실행될 함수
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken])

  // '/': main 화면
  // '/auth': 로그인 + 회원가입 화면
  // '/search/:searchword': 검색 화면
  // '/user/:userEmail': 유저 화면
  // '/board/detail/:boardNumber': 게시물 상세보기
  // '/board/write': 게시물 작성하기
  // '/board/update/:boardNumber': 게시물 수정하기

  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH()} element={<Main />} />
        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
        <Route path={USER_PATH(':userEmail')} element={<UserP />} />
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
        </Route>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App
