const postEpisodeReview = async (values: any) => {
  
  try {
    const response = await fetch('https://zustandstorage-6385e-default-rtdb.europe-west1.firebasedatabase.app/reviews.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud POST');
    }
    return response;

  } catch (error) {
    console.error('Error al enviar review:', error);
    throw error;
  }
};

export default postEpisodeReview;
