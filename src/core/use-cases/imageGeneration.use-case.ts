type GeneratedImage = Image | null;

interface Props {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

interface Image {
  url: string;
  alt: string;
}

export const ImageGenerationUseCase = async ({
  prompt,
  originalImage,
  maskImage,
}: Props): Promise<GeneratedImage> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, originalImage, maskImage }),
    });
    if (!response.ok) throw new Error("Hubo un error");

    const { url, revised_prompt: alt } = await response.json();
    
    return {url, alt}

  } catch (error) {
    console.error(error);
    return null;
  }
};
