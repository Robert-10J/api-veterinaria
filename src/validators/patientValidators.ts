import { body, check, query } from 'express-validator'

export const validatePatient = [
  body('name', 'EL nombre del paciente es requerido').notEmpty().escape(),
  body('name', 'El nombre del paciente no de incluir números o caracteres especiales').matches('^[a-zA-Z]+$'),
  body('caretaker', 'El  nombre del cuidador es requerido').notEmpty().escape(),
  body('email', 'El email del cuidador es requerido').notEmpty().escape(),
  body('email', 'Debe ingresar un email válido').isEmail().escape(),
  body('symptoms').notEmpty().escape(),
  body('symptoms', 'La descripción debe estar mejor redactada y no mayor a 400 caracteres').isLength({ 
    min: 8,
    max: 400
  })
]

export const checkValidationPatient = {

}