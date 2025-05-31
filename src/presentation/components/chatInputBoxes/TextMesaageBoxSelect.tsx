import { useState, type FormEvent } from "react";
interface Option {
  id: string;
  text: string;
}
interface Props {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disabledCorrections: boolean;
  options: Option[];
}
export function TextMesaageBoxSelect({
  placeholder = "",
  disabledCorrections = false,
  onSendMessage,
  options,
}: Props) {
  const [message, setmessage] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length == 0) return;
    if(selectedOption == '') return
    onSendMessage(message, selectedOption);
    setmessage("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex justify-center h-12 rounded-xl bg-white w-full px-4"
    >
      <div className="flex w-full h-2">
        <div className="w-full flex justify-center">
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
          <select value={selectedOption} onChange={(e)=> setSelectedOption(e.target.value)} className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focue:border-indigo-300 pl-4 h-10" name="select">
          <option value=""> Selecciona una opción</option>
          {options.map(({id, text}) => <option key={id} value={id} > {text} </option>)}
          </select>
        </div>
        <div className="ml-4 h-3">
          <button className="btn-primary flex align-center justify-center">
            <span className="mr-2"> Enviar</span>
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
