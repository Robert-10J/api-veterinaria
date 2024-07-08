import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { Patient } from '../types'

const prisma = new PrismaClient()

export const createPatient = async (req: Request, res: Response) => {
  const dataPatient: Patient = req.body

  const newPatient = await prisma.patient.create({
    data: dataPatient
  })

  return res.status(200).json({
    code: 201,
    message: 'Paciente creado correctamente',
    data: newPatient
  })
}

export const getAllPatients = async (_req: Request, res: Response): Promise<Response<Patient[]>> => {
  const allPatients = await prisma.patient.findMany({
    where: { deleted: false }
  })

  if (allPatients.length === 0) { 
    return res.status(404).json({
      code: 404,  
      message: 'No se encontraron pacientes' 
    })
  }

  return res.status(200).json({
    code: 200,
    data: allPatients
  })
}

export const getPatientById = async (req: Request, res: Response): Promise<Response<Patient>> => {
  const patientId = req.params.id

  const patient = await prisma.patient.findFirst({
    where: { id: parseInt(patientId) }
  })

  if (!patient) {
    return res.status(404).json({ 
      code: 404,  
      message: 'Paciente no encontrado' 
    })
  }

  return res.status(200).json(patient)
}

export const deletePatientById = async (req: Request, res: Response) => {
  const patientId = req.params.id

  if (!patientId) {
    return res.status(400).json({ 
      code: 400,  
      message: 'Debe seleccionar un paciente a eliminar' 
    })
  }

  const patient = await prisma.patient.update({
    where: { id: parseInt(patientId) },
    data: { deleted: true }
  })

  if(!patient) {
    return res.status(404).json({ 
      code: 404,  
      message: 'Paciente no encontrado' 
    })
  }

  return res.status(200).json({ 
    code: 200,  
    message: 'Paciente eliminado correctamente' 
  })
}

export const updatePatient = async (req: Request, res: Response) => {
  const patientId = req.params.id

  const patient = await prisma.patient.update({
    where: { id: parseInt(patientId) },
    data: req.body
  })

  return res.status(200).json(patient)
  
}