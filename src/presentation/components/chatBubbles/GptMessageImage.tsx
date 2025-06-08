interface Props {
  text: string;
  imageUrl: string;
  imageAlt: string;
  onImageSelected?: (imageUrl:string)=>void
}
export function GptMessageImage({ text, imageAlt, imageUrl, onImageSelected }: Props) {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          J
        </div>
        <div className="flex flex-col justify-center align-middle">
          <span>{text}</span>
          <img
            src={imageUrl}
            alt={imageAlt}
            className="mt-1 rounded-xl w-96 object-cover"
            onClick={()=> onImageSelected && onImageSelected(imageUrl)}
          />
        </div>
      </div>
    </div>
  );
}
