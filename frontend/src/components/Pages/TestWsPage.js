import React from 'react'
import { useState } from 'react';
import {GO_SERVER_HOST} from '../../globals'
export default function TestWsPage() {
    
    const [recievedMessagesState,setRecievedMessagesState] = useState([])
    
    var ws = new WebSocket('ws:' + GO_SERVER_HOST + '/ws');
    
    ws.onopen = function() {
        console.log('Websocket connected');
    };

    ws.onmessage = function(event) {
        console.log('Message recieved: ' + event.data);
        setRecievedMessagesState([...recievedMessagesState,event.data])
    }

    ws.onclose = function() {
        console.log('Websocket closed');
        return (
            <div>Socket closed</div>
        )
    }
    return (
    <div>
        <h1>Websocket test</h1>
        <div>
            <button onClick={() => ws.send('Hello')}>Send Hello</button>
            <button onClick={() => ws.send('Goodbye')}>Send Goodbye</button>
        </div>
        <div>
            <h2>Messages recieved:</h2>
            <ul>
                {recievedMessagesState.map((message,index) => {
                    return <li key={index}>{message}</li>
                })}
            </ul>
        </div>
    </div>
  )
}
