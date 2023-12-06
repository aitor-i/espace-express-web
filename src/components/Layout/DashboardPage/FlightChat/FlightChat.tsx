import React, { FormEvent, useEffect, useState } from "react";
import { UUID } from "crypto";

interface Message {
  messageId?: UUID;
  status: "typing" | "message";
  message: string | undefined;
  userId: string;
  userAlias: string;
  roomId: string;
  isTyping: boolean;
}

interface TypingObject {
  userId: string;
  userAlias: string;
  roomId: string;
}

interface Request {
  status: "typing" | "message";
  message: Message | undefined;
  isTyping: boolean;
  typingObject?: TypingObject;
}

interface Response {
  status: "typing" | "message";
  message: Message[] | undefined;
  isTyping: boolean;
  typingObject?: TypingObject;
}

export function FlightChat() {
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (socket && socket.readyState === WebSocket.OPEN) {
      const textMessage = formData.get("message")?.toString();
      const message: Message = {
        isTyping: false,
        message: textMessage,
        roomId: "roomId",
        status: "message",
        userAlias: "userAlias",
        userId: "userId",
      };

      const request: Request = {
        isTyping: false,
        message,
        status: "message",
      };

      const messageString = JSON.stringify({
        ...request,
      });

      socket.send(messageString);
      console.log("Socket send");
    }
    event.currentTarget.reset();
  };

  useEffect(() => {
    // Create a WebSocket connection
    const newSocket = new WebSocket("ws://localhost:4001/", "roomID");

    // Event handler for WebSocket open event
    newSocket.onopen = (res) => {
      console.log("Connection response: ", res);
      console.log("WebSocket connection established.");
    };

    // Event handler for WebSocket message event
    newSocket.onmessage = (event) => {
      const response: Response = JSON.parse(event.data);
      console.log(response);
      if (response.status === "message") {
        setMessages(response?.message!);
      }

      if (response.status) {
        setIsTyping(response.isTyping);
      }
    };

    // Event handler for WebSocket close event
    newSocket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(newSocket);

    // Cleanup function for WebSocket connection when component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  console.log("Messages: ", messages);

  return (
    <div>
      <h3>Flight Chat</h3>
      <p>Chat whit other passengers from the flight</p>
      {messages &&
        messages.map((message) => (
          <p key={message.messageId}>
            {message.userAlias}: {JSON.stringify(message.message)}
          </p>
        ))}

      <form className="mt-10 self-end " onSubmit={submitHandler}>
        <input name="message" type="text" />
        <button
          type="submit"
          className=" p-1 pl-2 pe-2 bg-blue-600  rounded-lg text-gray-50 font-bold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
