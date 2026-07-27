import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import PublishingList from './pages/PublishingList.jsx'

export default function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publishing" element={<PublishingList />} />
        </Routes>
      </div>
    </>
  )
}
