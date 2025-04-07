import BoardItem from './components/BoardItem'
import './App.css'
import { commentListMock, favoriteListMock, latestBoardListMock, topBoardListMock } from './mocks'
import TopItem from 'components/TopItem'
import CommentItem from 'components/CommentItem'
import FavoriteItem from 'components/FavoriteItem'

function App() {
  return (
    <>
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
    </>
  )
}

export default App
