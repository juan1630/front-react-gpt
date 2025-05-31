import { useRef, useState, type FormEvent } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorrections: boolean;
  accept?: string
}
export function TextMesaageBoxFile({
  placeholder = "",
  disabledCorrections = false,
  onSendMessage,
  accept
}: Props) {
  const [selectedFile, setselectedFile] = useState<File| null>(null)
  const [message, setmessage] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length == 0) return;
    onSendMessage(message);
    setmessage("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row h-10 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-700 "
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input type="file" accept={accept} ref={inputFileRef} onChange={ (e) => setselectedFile(e.target.files?.item(0)) } hidden />
      </div>
      <div className="flex grow h-2">
        <div className="relative w-full">
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
        <div className="ml-4 h-3">
          <button disabled={!selectedFile} className="btn-primary flex align-center justify-center">
            {
              (!selectedFile)
              ? <span className="mr-2"> Enviar</span>
              : <span className="mr-2"> {selectedFile.name.substring(0,10) + '...'} </span>
            }
            
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
