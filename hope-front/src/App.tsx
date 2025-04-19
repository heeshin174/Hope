import Container from 'layouts/Container'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from 'views/Authentication'
import BoardDetail from 'views/Board/Detail'
import BoardUpdate from 'views/Board/Update'
import BoardWrite from 'views/Board/Write'
import Main from 'views/Main'
import Search from 'views/Search'
import User from 'views/User'
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant'

function App() {

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
        <Route path={USER_PATH(':userEmail')} element={<User />} />
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
