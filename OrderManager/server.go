package main

import (
	"OrderManager/globals"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		fmt.Println("Origin:", origin)
		fmt.Println("WEBSOCKET_ORIGIN:", globals.WEBSOCKET_ORIGIN)
		return origin == globals.WEBSOCKET_ORIGIN

	},
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		fmt.Println("Origin:", origin)
		return true
	}
	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}
		fmt.Printf("Received: %s\n", message)

		err = conn.WriteMessage(messageType, message)
		if err != nil {
			log.Println("Write error:", err)
			break
		}
	}
}

func main() {
	http.HandleFunc("/ws", handleWebSocket)
	log.Println("Server started on :3002")
	err := http.ListenAndServe(":3002", nil)
	if err != nil {
		log.Fatal("ListenAndServe error:", err)
	}
}
