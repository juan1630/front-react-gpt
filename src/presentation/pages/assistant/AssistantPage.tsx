import { useState, useEffect } from "react";
import {
  GptMessage,
  MyMessage,
  TextMesaageBox,
  TypingLoaders,
} from "../../components";
import { createThreadUseCase, postQuestionsUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
}
export default function AssistantPage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [threadId, setThreadId] = useState<string>("");

  useEffect(() => {
    const threadId = localStorage.getItem("threadId");

    if (threadId) {
      setThreadId(threadId);
    } else {
      createThreadUseCase()
        .then((data) => {
          setThreadId(data.data!);
          localStorage.setItem("threadId", data.data!);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    if (threadId) {
      setMessages((prev) => [
        ...prev,
        { text: `ID del thread ${threadId}`, isGpt: true },
      ]);
    }
  }, [threadId]);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false }]);
    //todo: use case
    if(!threadId) return
    const resp = await postQuestionsUseCase({ question: text, threadId })
    if(resp.ok){
      for(const reply of resp.data! ){
        for(const message of reply.content ){
          setMessages((prev) => [...prev, { text:message, isGpt: (reply.role == 'assistant') }])
        }
      }
    }
    setIsLoading(false);

    // todo: message de gpt en true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenido */}
          <GptMessage text="Hola, soy sam en ¿qué te puedo ayudar?" />

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
