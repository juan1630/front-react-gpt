import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoaders,
  TextMesaageBoxSelect,
} from "../../components";
import { translateTextUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export default function TranslatePage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string, selectedLanguage: string) => {
    setIsLoading(true);

    const newMessage = `Traduce: ${text} al ${selectedLanguage}`;
    setMessages((prev) => [...prev, { text: newMessage, isGpt: false }]);
    
    const {ok, message } = await translateTextUseCase({text, lang:selectedLanguage})
    if(!ok) return 
    
    setMessages(prev => [...prev, { text: message, isGpt: true }])

    setIsLoading(false);

  };

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
      <TextMesaageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe lo que deseas"
        options={languages}
        disabledCorrections={false}
      />
    </div>
  );
}
