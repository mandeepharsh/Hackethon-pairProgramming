import { BrowserRouter,Routes,Route } from 'react-router-dom'


import './App.scss'
import HomePage from './pages/HomePage/HomePage';
import PeerPage from './pages/PeerPage/PeerPage';
import ChatPage from './pages/ChatPage/ChatPage';

function App() {


  return (
    <BrowserRouter>
    <ChatPage/>
     <Routes>
       <Route path='/' element ={<HomePage/>} />
       <Route path='/peerSupport' element ={<PeerPage/>} />  
       <Route path='/chat' element ={<ChatPage/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
