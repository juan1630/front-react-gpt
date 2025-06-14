import { useEffect, useRef, useState } from "react";

interface Props {
  text?: string;
  imageUrl: string;
  imageAlt?: string;
  onImageSelected?: (url: string) => void;
}
export function GptMessageSelectableImage({
  imageUrl,
  onImageSelected,
}: Props) {
  const originalImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;
    originalImageRef.current = image;

    image.onload = () => {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const onMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);

    // Obtener las coordenadas del mouse relativo al canvas
    const startX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const startY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // console.log({startX, startY});
    setCoords({ x: startX, y: startY });
  };

  const onMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL("image/png");
    console.log(url)
    // https://jaredwinick.github.io/base64-image-viewer/
    onImageSelected && onImageSelected(url);
  };

  const onMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;

    const currentX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const currentY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // Calcular el alto y ancho del rectángulo
    const width = currentX - coords.x;
    const height = currentY - coords.y;

    const canvaWidth = canvasRef.current!.width;
    const canvaHeight = canvasRef.current!.height;

    // Limpiar el canva
    const ctx = canvasRef.current!.getContext("2d")!;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(originalImageRef.current!, 0, 0, canvaWidth, canvaHeight);

    // Dibujar el rectangulo, pero en este caso, limpiaremos el espacio
    // ctx. fillRect(coords.x, coords.y, width, height);
    ctx.clearRect(coords.x, coords.y, width, height);
  };

  const resetCanva = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(
      originalImageRef.current!,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );

    onImageSelected && onImageSelected(imageUrl);
  };

  return (
    <div className="col-start-1 col-end-10 p-3 rounded-lg">
      {/* {!imageUrl ? null : ( */}
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
            G
          </div>
          <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
            <div className="flex flex-col gap-3 justify-center align-middle">
              <canvas
                width={370}
                height={400}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
              />
              {/* {isDrawing ? ( */}
                <button className="btn-primary w-50" onClick={resetCanva}>
                  Borrar selección
                </button>
              {/* ) : null} */}

              {/* <span>{text}</span>
          <img
            src={imageUrl}
            alt={imageAlt}
            className="mt-1 rounded-xl w-96 object-cover"
          /> */}
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}
