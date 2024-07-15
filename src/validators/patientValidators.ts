import { body, check, checkSchema, query } from 'express-validator'
import { prisma } from '../instancePrisma'

type PatientValidation = 'name' & 'caretaker' & 'email' & 'symptoms'

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

export const schemaValidationPatient = checkSchema<PatientValidation>({
  'name': {
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: value => {
        if (value.length === 0) return 'El nombre del paciente es requerido'
        else if (value.length < 3) return 'El nombre del paciente no puede ser menor a 3 caracteres'
        else if (value.length > 20) return 'El nombre del paciente no puede ser mayor a 20 caracteres'
        return 'El nombre del paciente debe tener entre 4 y 5 caracteres'
      }
    },
    matches: {
      options: /^[a-zA-Z]+$/,
      errorMessage: 'El nombre del paciente no de incluir números o caracteres especiales'
    }
  },
  'caretaker': {
    isLength: {
      options: { min: 4, max: 25 },
      errorMessage: value => {
        if (value.length === 0) return 'El nombre del cuidador es requerido'
        else if (value.length < 4) return 'El nombre del cuidador no puede ser menor a 4 caracteres'
        else if (value.length > 25) return 'El nombre del cuidador no puede ser mayor a 25 caracteres'
        return 'El nombre del cuidador debe tener entre 4 y 25 caracteres'
      }
    },
    matches: {
      options: /^[a-zA-Z]+$/,
      errorMessage: 'El nombre del cuidador no de incluir números o caracteres especiales'
    }
  },
  'email': {
    isEmail: {
      errorMessage: 'Debe ingresar un email válido'
    }
  }
})

export const validateIdPatient = [
  body('id').custom(async id => {
    const patient = await prisma.patient.findFirst({ where: { id: parseInt(id) } })
    if (!patient) {
      throw new Error('Paciente no encontrado')
    }
  })
]