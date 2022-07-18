const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
        //cors(サーバーが違うこと)が起きるとエラーになる,このポート番号だけ許可しますって意味
        origin: "http://localhost:3000",
    },
});

const PORT = 1000;

io.on("connection",(socket)=>{
    console.log("接続しました" + "socket-id:" + socket.id);

    //ルームに入るときのソケット設定 dataはルーム番号
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`ユーザID${socket.id}が${data}に参加しました`)
    })

    //チャット専用ソケット
    socket.on("send_message",(data)=>{
        console.log(data);
        
        //クライアントに返すソケット通信
        socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log("接続が切れました" + "socket-id:" + socket.id)
    })
})

server.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})