import React, { useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Confetti from 'react-confetti';

import Rating from './ui/rating';
import post from '@/utils/api-fake-post';
import { episodeSchema } from '@/schemas/episode-schema';

interface EpisodeReviewFormProps {
  episodeId: string;
}

const EpisodeReviewForm: React.FC<EpisodeReviewFormProps> = ({ episodeId }) => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    const submittedEpisodes = JSON.parse(localStorage.getItem('submittedEpisodes') || '{}');
    if (submittedEpisodes[episodeId]) {
      setIsSubmitted(true);
    }
  }, [episodeId]);

  const handleSubmit = async (values: any) => {
    
    try {
      episodeSchema.parse(values);
      const response = await post(values);
      
      if (response.status === 200){
        const submittedEpisodes = JSON.parse(localStorage.getItem('submittedEpisodes') || '{}');
        submittedEpisodes[episodeId] = true;
        localStorage.setItem('submittedEpisodes', JSON.stringify(submittedEpisodes));
        setIsSubmitted(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      } 

    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Error de validación:', error.errors);
      } else {
        console.error('Error al enviar evaluación:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {showConfetti && <Confetti />}
      {isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl green font-semibold mb-4">¡Gracias por su colaboración!</h2>
        </div>
      ) : (
        <>
        
      {/* Form */}
      <Formik
        initialValues={{
          episodeId,
          rating: 0,
          comment: '',
          name: '',
          email: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(episodeSchema)}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Valora el episodio</h2>

            {/* Rating */}
            <div className="mb-4">
              <label htmlFor="rating" className="block text-lg font-medium text-gray-700 mb-1">Puntuación:</label>
              <Rating
                value={values.rating}
                onChange={(value) => setFieldValue('rating', value)}     
              />
              <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Input: Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">Nombre:</label>
              <Field type="text" id="name" name="name" className="block w-full p-2 border border-gray-300 rounded mt-1" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Input: Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">Correo electrónico:</label>
              <Field type="email" id="email" name="email" className="block w-full p-2 border border-gray-300 rounded mt-1" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Input: Comment */}
            <div className="mb-4">
              <label htmlFor="comment" className="block text-lg font-medium text-gray-700 mb-1">Comentario:</label>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Comentario (máx. 500 caracteres)"
                className="block w-full p-2 border border-gray-300 rounded mt-1"
                maxLength={500}
              />
              <ErrorMessage name="comment" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mb-4">
              Enviar
            </button>

          </Form>
        )}
      </Formik>
      </>
      )}
    </div>
  );
};

export default EpisodeReviewForm;
