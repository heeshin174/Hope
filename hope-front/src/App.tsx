import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from 'views/Authentication'
import Main from 'views/Main'

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
      <Route path='/' element={<Main />} />
      <Route path='/auth' element={<Authentication />} />
      <Route path='/' element={<Main />} />
      <Route path='/' element={<Main />} />
    </Routes>
  )
}

export default App
