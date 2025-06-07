import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMesaageBoxFile,
  TypingLoaders,
} from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
}



const disclaimer = 'Trancripción cread por ia'

export default function AudioToTextPage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string, audioFile:File ) => {
    setIsLoading(true);
    console.log(text, audioFile)

    setMessages((prev) => [...prev, { text, isGpt: false, type: "text" }]);

    const  resp =await audioToTextUseCase(text, audioFile)
    if(!resp) return

    const gptMessage  = `## Transcripción: 
    La duraciónes: ${Math.round(resp.duration) }
    ### El texto es: ${resp.text}
    `
    
    setMessages(prev => [...prev, { text: gptMessage, isGpt: true}])
    for(const segment of resp.segments){
      const segmentMessage = `__De:  ${Math.round(segment.start)} a ${segment.end} segundos __
        ${segment.text}
      `
      setMessages(prev => [...prev, {text: segmentMessage, isGpt:true}])
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <GptMessage text={disclaimer} />

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
      <TextMesaageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe lo que deseas"
        disabledCorrections={false}
        accept="audio/*"
      />
    </div>
  );
}
