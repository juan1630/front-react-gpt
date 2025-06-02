import { type AudioToTextResponse } from "../../interfaces";

export async function audioToTextUseCase(prompt: string, audioFile:File){
    const formData = new FormData()
    formData.append('file', audioFile)
    if(prompt) {
        formData.append('prompt', prompt)
    }

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
          method: "POST",
          body: formData
        });
    
        if(!resp.ok) throw new Error('Hubo un error con la petición')
            const data = await resp.json() as AudioToTextResponse
        return data

      } catch (error) {
        console.log(error)
        return null
      }
}