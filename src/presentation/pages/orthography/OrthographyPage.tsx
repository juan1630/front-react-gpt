import { useState } from "react";
import { GptMessage, GptOrthographyMessage, MyMessage, TextMesaageBox, TypingLoaders } from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
  info?: {
    userScore:number;
    errors:string[];
    message: string
  }
}

export default function OrthographyPage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);


  const handlePost = async( text: string) => {
    setIsLoading(true)

    setMessages((prev) => [...prev, { text, isGpt: false }])
    //todo: use case
    const {ok, message, userScore, errors} = await orthographyUseCase(text)
    if(ok){
      setMessages(prev=> ([...prev, 
        {text: message, 
        info:{errors:errors, userScore:userScore, message: message },
        isGpt:true}]))
    }else {
      setMessages(prev=> [...prev, {text: 'No se pudo procesar el texto', isGpt:true}])
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
              <GptOrthographyMessage key={index} errors={message.info!.errors} message={message.info!.message}  userScore={message.info!.userScore}/>
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
