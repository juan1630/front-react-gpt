interface Options {
  prompt: string
  selectedVoice: string
}

export const TextoToVoiceUseCase = async ({ prompt, selectedVoice }:Options) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/text-to-audio`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, voice:selectedVoice })
      }
    );
    
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    
    const audioFile = await response.blob()
    const audioUrl = URL.createObjectURL(audioFile)

    return {ok:true,audioUrl: audioUrl, message: prompt}

  } catch (error) {
    return {
      ok: false,
      message: "No se puedo generar el audio",
      audioUrl: ''
    };
  }
};
