// import { useState } from "react";
// // import * as components from "../../components";
// // import { TextMesaageBox } from "../../components/chatInputBoxes/TextMesaageBox";
// // import TypingLoaders from "../../components/loaders/TypingLoaders";

// interface Messages {
//   text: string;
//   isGpt: boolean;
// }

// export default function OrthographyPage() {
//   const [isloading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Messages[]>([]);


//   const handlePost = async( text: string) => {
//     setIsLoading(true)

//     setMessages((prev) => [...prev, { text, isGpt: false }])
//     //todo: use case

//     setIsLoading(false)

//     // todo: message de gpt en true
//   }

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         <div className="grid grid-cols-12 gap-y-2">
//           {/* Bienvenido */}
//           <components.GptMessage text="Puedes escribir tu texto en español" />

//           {messages.map((message, index) =>
//             message.isGpt ? (
//               <components.GptMessage key={index} text="Este es un message de GPT" />
//             ) : (
//               <components.MyMessage key={index} text={message.text} />
//             )
//           )}

//           {isloading ? (
//             <div className="col-start-1 col-end-12 fadein">
//               <TypingLoaders className="fade-in" />
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <TextMesaageBox
//         onSendMessage={handlePost}
//         placeholder="Escribe lo que deseas"
//         disabledCorrections={false}
//       />
//     </div>
//   );
// }
