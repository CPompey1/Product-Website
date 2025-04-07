import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ORDER_TRACKING_STATUS from './OrderTrackingUtility'
import TestWsPage from '../../Pages/TestWsPage';
import { GO_SERVER_HOST } from '../../../globals';
import { Avatar, Grid, TextField } from '@mui/material';
import './ChatMessagesStyles.css'
import AvatarIcon from '../AvatarIcon';
import { serializeMessage } from './MessageParser';

function UserToCourrierCommunication({status, orderId}) {
    const [lastMessage, setLastMessage] = useState({})
    const [messageHistory, setMessageHistory] = useState([])

    // var ws = new WebSocket(`ws:${GO_SERVER_HOST}/get_buyer_connection/${orderId}`);
    var ws = new WebSocket(`ws:${GO_SERVER_HOST}/ws`);
    ws.onopen = function() {
        console.log('Websocket connected');
    };

    ws.onmessage = function(event) {
        console.log('Message recieved: ' + event.data);
        setLastMessage(event.data)
        setMessageHistory([...messageHistory,event.data])
    }

    ws.onerror = function(event) {
        console.log('Websocket error: ' + event.data);
    }

    ws.onclose = function() {
        console.log('Websocket closed');
    }

    const onSendMessage = (message) => {
      console.log('Sending message: ' + message)
      setMessageHistory([...messageHistory,message])
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <UserToCourrierTracking lastMessage={lastMessage}/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                   {/* <UserToCourrierChatService lastMessage={lastMessage} messageHistory={messageHistory} ws={ws}/> */}
                    <ChatMessagesContainer messageHistory={messageHistory} ws={ws} onSendMessage={onSendMessage}/>
                </Grid>
            </Grid>

             
        </>
    )
}

function ChatMessage({message, iconSrc,isUser}){
  return (
    <>
      {isUser ? 
      <div className='chat-message'>
        <Grid container spacing={2}>
          
          <Grid item xs={10}>
            <div className='chat-message-text'>{message}</div>
          </Grid>
          <Grid item xs={2}>
            <Avatar src={iconSrc}/>
          </Grid>
        </Grid>
      </div>
      :
      <div className='chat-message'>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Avatar src={iconSrc}/>
            </Grid>
            <Grid item xs={10}>
              <div className='chat-message-text'>Hello</div>
            </Grid>
          </Grid>
      </div>
    }
    </>
  )
}
function UserToCourrierTracking({lastMessage}) {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    
    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiY3BvbXBleSIsImEiOiJjbTVlZDRvbjkyYmY3MmxwbjBlNmQ0NDV2In0.Dh7THMwdnp0bXp_eqjLP7A';
  
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
    });
  
    return (
      <div>
        <div
            style={{ height: '500px' }}
            ref={mapContainerRef}
            className="map-container"
          />
      </div>
    )
  }
  
  function UserToCourrierChatService({lastMessage,messageHistory,ws}) {
    return (
      <div>
        <h1>Chat</h1>
        <div>
            <button onClick={() => ws.send('Hello')}>Send Hello</button>
            <button onClick={() => ws.send('Goodbye')}>Send Goodbye</button>
        </div>
        <div>
            <h2>Messages recieved:</h2>
            <ul>
                {messageHistory.map((message,index) => {
                    return <li key={index}>{message}</li>
                })}
            </ul>
        </div>
      </div>
    )
  }
  
  function ChatMessagesContainer({messageHistory,ws,userIconSrc,courrierIconSrc,userId,onSendMessage}) {


    const handleSendMessage = (e) => {
      e.preventDefault()
      const message = e.target.elements[0].value
      ws.send(serializeMessage(message))
      onSendMessage(message)
    }

    return (
      <div className='chat-messages-container'>
        <div className='chat-messages-list'>

          <div className='chat-messages-list-contents'>
            {/* chatMessages */}
            {messageHistory.map(message => (
              // <ChatMessage message={message} iconSrc={message.senderId == userId ? userIconSrc : courrierIconSrc} isUser={message.senderId == userId}/>
              <ChatMessage message={message} iconSrc='https://www.w3schools.com/howto/img_avatar.png' isUser={true}/>
            ))
            }
            {/* <ChatMessage message='Hello' iconSrc='https://www.w3schools.com/howto/img_avatar.png' isUser={true}/>
            <ChatMessage message='Hello' iconSrc='https://www.w3schools.com/howto/img_avatar.png' isUser={false}/> */}

          </div>

        </div>
        {/* textBox */}
        <form className='chat-text-box' onSubmit={handleSendMessage}>
          <TextField className='text-field' id="standard-flexible" fullWidth variant="standard" label="Message" />
        </form>
    </div>
    )
  }
  export default UserToCourrierCommunication;