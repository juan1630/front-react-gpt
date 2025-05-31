import { useState } from "react";
import { GptMessage, MyMessage, TypingLoaders  } from "../../components";
import { TextMesaageBox } from "../../components/chatInputBoxes/TextMesaageBox";
import { ProsConsUseCase } from '../../../core/use-cases'

interface Messages {
  text: string;
  isGpt: boolean;
}

export default function OrthographyPage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);


  const handlePost = async( text: string) => {
    setIsLoading(true)

    setMessages(prev=> [...prev, { text, isGpt:false }])
    //todo: use case
    const {ok, content } = await ProsConsUseCase(text)
    
    if(ok){
      setMessages(prev=> [...prev, { text: content, isGpt: true }])
    }
    setIsLoading(false)

    // todo: message de gpt en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <GptMessage text="Puedes escribir tu texto en español" />

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
