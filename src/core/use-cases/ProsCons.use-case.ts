import { type ProsCons } from '../../interfaces'
export const ProsConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if(!resp.ok) throw new Error('Hubo un error con la petición')
    const {content} = await resp.json() as ProsCons

    return {
        ok:true,
        content
    }
  } catch (error) {
    return {
      ok: false,
      content: 'No se pudo hacer la comparación'
    };
  }
};
