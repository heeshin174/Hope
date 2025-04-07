import BoardItem from './components/BoardItem'
import './App.css'
import { latestBoardListMock } from './mocks'

function App() {
  return (
    <>
    {latestBoardListMock.map((boardListItem) => 
      <BoardItem boardListItem={boardListItem} />
    )}
    </>
  )
}

export default App
