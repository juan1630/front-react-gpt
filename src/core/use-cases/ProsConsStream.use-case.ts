import { type ProsCons } from '../../interfaces'

export const ProsConsStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
      // TODO: AGREGAR ABORT SIGNAL
    });

    if(!resp.ok) throw new Error('Hubo un error con la petición')
    const reader = resp.body?.getReader()

    if(!reader) {
      console.log('No se pudo generar el reader')
      return null
    }
    
    return reader

  } catch (error) {
    return null
  }
};
