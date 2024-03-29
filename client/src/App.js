import './App.css';
import io from 'socket.io-client';
import { useState  } from 'react';
import Chat from './Chat';


const socket = io("http://localhost:1000");

function App() {
  const [userName , setUserName ] = useState("");
  const [room , setRoom ] = useState("");
  const [showChat , setShowChat] = useState(false);


  const joinRoom = ()=>{
    if(userName !== "" && room !== ""){
      socket.emit("join_room",room);
      setShowChat(true);
    }
  };


  return (
    <div className="App">
      {!showChat ? (
         <div className='joinChatContainer'>
         <h3>あああ</h3>
         <input 
           type='text' 
           placeholder="名前"
           onChange={(e) => setUserName(e.target.value)}
         />
         <input 
           type='text' 
           placeholder="番号"
           onChange={(e) => setRoom(e.target.value)}
         />
         <button onClick={()=>joinRoom()}>ルームに参加</button>
       </div>
      )

     :(
       <Chat socket={socket} userName={userName} room={room}/>
       )}
    </div>
  );
}

export default App;
