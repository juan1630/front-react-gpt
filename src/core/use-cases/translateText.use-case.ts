import type { TranslateResponse } from "../../interfaces";

interface Options {
  text: string;
  lang: string;
}
export const translateTextUseCase = async ({ text, lang }: Options) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      body: JSON.stringify({ prompt:text, lang }),
      headers: { "Content-Type": "application/json" }
    });
    if (!resp.ok) throw new Error("Hubo un problema al traducri");
    const { message } = await resp.json() as TranslateResponse

    return {
      message,
      ok:true
    }

  } catch (error) {
    return {
      data:false,
      message: "No se pudo traducir el text",
    }
  }
}
