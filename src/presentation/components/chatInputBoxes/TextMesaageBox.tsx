import { useState, type FormEvent } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorrections: boolean;
}
export function TextMesaageBox({
  placeholder = "",
  disabledCorrections = false,
  onSendMessage,
}: Props) {
  const [message, setmessage] = useState("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length == 0) return;
    onSendMessage(message);
    setmessage("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-col h-12 gap-6 rounded-xl bg-white w-full"
    >
      <div className="w-full">
        <input
          type="text"
          autoFocus
          name="message"
          className="flex w-full rounded-e-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
          placeholder={placeholder}
          autoComplete={disabledCorrections ? "on" : "off"}
          autoCorrect={disabledCorrections ? "on" : "off"}
          spellCheck={disabledCorrections ? "true" : "false"}
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
      </div>

      <button className="btn-primary w-full flex items-center gap-1 justify-center">
        <span className="mr-2"> Enviar</span>
        <i className="fa-regular fa-paper-plane"></i>
      </button>
    </form>
  );
}
