interface Props {
    threadId:string
    question: string
}

interface UserQuestionsResponse {
    role: string
    content: string[]
}

export const postQuestionsUseCase = async ({ question, threadId }: Props) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ASSISTANCE_API}/user-question`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({question, threadId})
      }
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    
    const data = await response.json() as UserQuestionsResponse[]
    
    return {
        ok:true,
        data
    }

  } catch (error) {
    return {ok: false}
    // throw new Error('Error creating thread')
  }
};
