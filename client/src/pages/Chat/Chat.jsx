import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MiniIcon from '../../Components/RightSide/MiniIcon/MiniIcon';
import "./Chat.scss"
import { userChats } from "../../api/ChatRequests.js";
import MiniChat from '../../Components/ChatComponents/MiniChat/MiniChat';
import Mesajlar from '../../Components/ChatComponents/Mesajlar/Mesajlar';
import { io } from "socket.io-client";
import LogoSearch from '../../Components/HomeComponents/LogoSearch/LogoSearch';

const Chat = () => {



    const dispatch = useDispatch();
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    console.log(user)
    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    // sohbeti datsi
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user._id]);

    //Socket.io baglantisi 
    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);



    // socet.io mesaj gondermek
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    // socet.io dan mesajlari cekmek
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            console.log(data)
            setReceivedMessage(data);
        }

        );
    }, []);


    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };


    return (
        <div className="Chat">
            {/* sol hisse */}
            <div className="Left-side-chat">
                <div className='logom'> <LogoSearch /></div>

                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div
                                onClick={() => {
                                    setCurrentChat(chat);
                                }}
                            >
                                <MiniChat
                                    data={chat}
                                    currentUser={user._id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* sag hisse */}
            <div className="Right-side-chat">
                <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <MiniIcon />
                </div>
                <Mesajlar
                    chat={currentChat}
                    currentUser={user._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>
        </div>
    )
}

export default Chat