"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { parseBuffer } from 'music-metadata';
const backendUrl = "http://localhost:3005";
//@ts-ignore
const ChatContext = createContext();
import {lipSyncJson} from "@/lib/lipsync";
export const ChatProvider = ({ children }) => {

  const deepgramApiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY

  const generateAudio = async (text:string) => {
    console.log(deepgramApiKey)
    const url = 'https://api.deepgram.com/v1/speak?model=aura-helios-en';
    const options = { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${deepgramApiKey}`
      }, 
      body: JSON.stringify({ text })
    };
  

    const response = await fetch(url, options);
  
    if (!response.ok) {
      console.log(response)
      throw new Error(`Error fetching audio: ${response.statusText}`);
    }
  
    return await response.arrayBuffer();
  };


  
  const chat = async (message) => {
    setLoading(true);
    const data = await generateAudio(message[0].text);

    const metadata:any = await parseBuffer(Buffer.from(data), 'audio/mpeg')

    const duration = Math.floor(metadata.format.duration)
    const realDuration = Math.floor(metadata.format.duration*1000)
    console.log(duration)
    let lipsync
    for(let j=0; j< lipSyncJson.length; j++) {
        if(Math.floor(lipSyncJson[j].metadata.duration) == duration) {
          lipsync = lipSyncJson[j]
        }
    }
   
    const resp = [{
      audio: Buffer.from(data).toString('base64'),
        lipsync:  lipsync,
        animation: message[0].animation,
        duration: duration,
        realDuration: realDuration
        
    }]
   //@ts-ignore
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        messages,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
