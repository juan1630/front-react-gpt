import { useState } from "react";
import {
  ImageGenerationUseCase,
  ImageVariationUseCase,
} from "../../../core/use-cases";
import {
  TextMesaageBox,
  TypingLoaders,
  MyMessage,
  GptMessage,
  GptMessageSelectableImage,
} from "../../components";

interface Messages {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export default function ImageTunningPage() {
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([
    {
      isGpt: true,
      text: "Imagen base",
      info: {
        imageUrl:"http://localhost:3000/gpt/image-generation/1749411677540.png",
        alt: "imagen base",
      },
    },
  ]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariations = async () => {
    setIsLoading(true);
    if (!originalImageAndMask.original) return;
    const response = await ImageVariationUseCase({
      originalImage: originalImageAndMask.original!,
    });
    setIsLoading(false);
    if (!response) return;
    setMessages((prev) => [
      ...prev,
      {
        text: "Variación",
        isGpt: true,
        info: { imageUrl: response.url!, alt: response.alt! },
      },
    ]);
  };
  const handlePost = async (text: string) => {
    if (text.trim().length == 0) return;
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const { mask, original } = originalImageAndMask
    const imageInfo = await ImageGenerationUseCase({
      prompt: text,
      originalImage: original,
      maskImage: mask,
    });

    if (!imageInfo || imageInfo == null) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo genear la imagen", isGpt: true },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        text,
        isGpt: true,
        info: { imageUrl: imageInfo!.url, alt: imageInfo!.alt },
      },
    ]);

    setIsLoading(false);
  };

  return (
    <>
      {originalImageAndMask.original && (
        <div style={{ position: 'absolute', right:'150px' , top:'80px' }} 
          className="fixed flex flex-col items-center top-10 fade-in">
          <span>Editando</span>
          <img
            src={originalImageAndMask.mask && originalImageAndMask.original}
            alt="original image"
            className="border rounded-xl w-36 object-contain"
          />
          <button onClick={handleVariations} className="btn-primary mt-2">
            Generar varicación
          </button>
        </div>
      )}

      <div className="chat-container">
        <div className="chat-messages" style={{ maxHeight: "580px" }}>
          <div className="grid grid-cols-12 gap-y-2">
            {/* Bienvenido */}
            <GptMessage text="¿Qué imagen deseas genear hoy?" />

            {messages.map((message, index) =>
              message.isGpt ? (
                // <GptMessageImage
                <GptMessageSelectableImage
                  key={index}
                  text={message.text}
                  imageUrl={message!.info!.imageUrl}
                  imageAlt={message!.info!.alt}
                  onImageSelected={(url) =>
                    setOriginalImageAndMask({
                      original: message.info?.imageUrl,
                      mask: url,
                    })
                  }
                />
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
          placeholder="Escribe la imagen que deseas generar"
          disabledCorrections={false}
        />
      </div>
    </>
  );
}
