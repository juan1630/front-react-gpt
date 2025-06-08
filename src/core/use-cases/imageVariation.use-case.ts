type GeneratedImage = Image | null;

interface Props {
  originalImage: string;
}

interface Image {
  url: string;
  alt: string;
}

export const ImageVariationUseCase = async ({
  originalImage,
}: Props): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation-variation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baseImage:originalImage }),
    });
    if (!response.ok) throw new Error("Hubo un error");

    const { url, revised_prompt: alt } = await response.json();
    
    return {url, alt}

  } catch (error) {
    console.error(error);
    return null;
  }
};
