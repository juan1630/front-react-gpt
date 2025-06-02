import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMesaageBoxSelect,
  TypingLoaders,
  GptMessageAudio
} from "../../components";
import { TextoToVoiceUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
  type:'text'
}

interface AudioMessage {
  text:string
  isGpt:boolean
  audio:string
  type: 'audio'
}

type Message = Messages  | AudioMessage

const disclaimer = `## ¿Qué audio quieres generar hoy?
* Todo el audio es generado por ia
`

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

export default function TextToAudioPage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false, type:'text' }]);
    
    const { ok, message, audioUrl } = await TextoToVoiceUseCase({prompt: text, selectedVoice})
    
    if(!ok) return

    setMessages((prev) => [...prev, { text: `${selectedVoice} - ${message}`, isGpt: true, type:'audio', audio: audioUrl }])
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
              (message.type === 'audio')
              ? <GptMessageAudio key={index} text={message.text} audio={message.audio} />
              : <GptMessage key={index} text={message.text} />
              
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
        disabledCorrections={false}
        options={voices}
      />
    </div>
  );
}
