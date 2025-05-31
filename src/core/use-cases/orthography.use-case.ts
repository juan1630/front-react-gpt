import type { RespomseOrthography } from "../../interfaces/orthography";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      }
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    const data: RespomseOrthography = await response.json() as RespomseOrthography;

    
    return {
        ok:true,
        ...data
    }

  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se puedo realizar correción",
    };
  }
};
