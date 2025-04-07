import BoardItem from './components/BoardItem'
import './App.css'
import { latestBoardListMock, topBoardListMock } from './mocks'
import TopItem from 'components/TopItem'

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
    </>
  )
}

export default App
