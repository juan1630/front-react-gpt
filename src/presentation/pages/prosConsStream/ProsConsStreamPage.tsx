import { useRef, useState } from "react";
import { GptMessage, MyMessage, TypingLoaders  } from "../../components";
import { TextMesaageBox } from "../../components/chatInputBoxes/TextMesaageBox";
import { ProsConsStreamGenaratorUseCase } from '../../../core/use-cases'

interface Messages {
  text: string;
  isGpt: boolean;
}

export default function ProsConsStreamPage() {
  const abortController = useRef(new AbortController())
  const isRunning = useRef(false)
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);


  const handlePost = async( text: string) => {

    if(isRunning.current){
      abortController.current.abort()
      abortController.current = new AbortController()
    }
    setIsLoading(true)
    isRunning.current = true

    setMessages(prev=> [...prev, { text, isGpt:false }])
    //todo: use case
    
    const stream =  ProsConsStreamGenaratorUseCase(text, abortController.current.signal)
    setIsLoading(false)
    
    setMessages(prev => [...prev, {text: '', isGpt:true}])
    
    for await (const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages]
        newMessages[newMessages.length -1].text += text
        return newMessages
      })
    }
   
    isRunning.current = false
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <GptMessage text="¿Qué deseas comparar hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isloading ? (
            <div className="col-start-1 col-end-12 fadein">
              <TypingLoaders className="fade-in" />
            </div>
          ) : null}
        </div>
      </div>
      <TextMesaageBox
        onSendMessage={handlePost}
        placeholder="Escribe lo que deseas"
        disabledCorrections={false}
      />
    </div>
  );
}
