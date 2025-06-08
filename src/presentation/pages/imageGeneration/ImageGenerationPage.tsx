import { useState } from "react";
import { ImageGenerationUseCase } from "../../../core/use-cases";
import {
  TextMesaageBox,
  TypingLoaders,
  MyMessage,
  GptMessage,
  GptMessageImage,
} from "../../components";

interface Messages {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export default function ImageGenerationPage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {

    if(text.trim().length == 0 ) return
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false }]);
    //todo: use case

    const imageInfo = await ImageGenerationUseCase({ prompt: text });

    if (!imageInfo || imageInfo == null) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo genear la imagen", isGpt: true }
      ]);
    }

    setMessages((prev) => [...prev, { text, isGpt: true, info: { imageUrl: imageInfo!.url , alt: imageInfo!.alt }}])

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" style={{maxHeight: '580px'}} >
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <GptMessage text="¿Qué imagen deseas genear hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageImage key={index} text={message.text} imageUrl={message!.info!.imageUrl} imageAlt={message!.info!.alt} />
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
