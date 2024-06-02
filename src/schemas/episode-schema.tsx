import { z } from 'zod';

export const episodeSchema = z.object({
  episodeId: z.number(),
  rating: z.number({
    required_error: 'Campo Puntuación es requerido',
  }).min(1, {
    message: 'La puntuación debe ser mayor a 0',
  }).max(5),
  comment: z.string({
    required_error: 'Campo Comentario es requerido',
  }).min(10, {
    message: 'Campo Comentario debe tener al menos 10 caracteres',
  }).max(500, {
    message: 'Campo Comentario debe tener menos de 500 caracteres',
  }),
  name: z.string({
    required_error: 'Campo Nombre es requerido',
  }).min(3, {
    message: 'Campo Nombre debe tener al menos 3 caracteres',
  }).max(50, {
    message: 'Campo Nombre debe tener menos de 50 caracteres',
  }),
  email: z.string({
    required_error: 'Campo Email es requerido',
  }).email(),
});

