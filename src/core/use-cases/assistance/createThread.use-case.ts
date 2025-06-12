

export const createThreadUseCase = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_ASSISTANCE_API}/create-thread`,
      {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    
    const {id} = await response.json() as {id: string}
    
    return {
        ok:true,
        data: id
    }

  } catch (error) {
    return {ok: false}
    // throw new Error('Error creating thread')
  }
};
