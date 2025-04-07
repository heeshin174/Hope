import { useState } from 'react'
import BoardItem from './components/BoardItem'
import './App.css'
import { commentListMock, favoriteListMock, latestBoardListMock, topBoardListMock } from './mocks'
import TopItem from 'components/TopItem'
import CommentItem from 'components/CommentItem'
import FavoriteItem from 'components/FavoriteItem'
import InputBox from 'components/InputBox'
import Footer from 'layouts/Footer'

function App() {

  const [value, setValue] = useState<string>("")

  return (
    <>
    <InputBox label='제목' type='text' placeholder='제목을 입력하세요' value={value} setValue={setValue} error={true} message="asssss" />
    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
      {topBoardListMock.map((topListItem) => 
        <TopItem topListItem={topListItem} />
      )}
    </div>
    {latestBoardListMock.map((boardListItem) => 
      <BoardItem boardListItem={boardListItem} />
    )}
    {commentListMock.map((commentListItem) =>
      <CommentItem commentListItem={commentListItem} />
    )}
    {favoriteListMock.map((favoriteListItem) => 
      <FavoriteItem favoriteListItem={favoriteListItem} />
    )}
    <Footer />
    </>
  )
}

export default App
