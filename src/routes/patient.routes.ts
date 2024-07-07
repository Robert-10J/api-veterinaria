import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express'

const router = Router()
const prisma = new PrismaClient()

router.post('/patient', async (req: Request, res: Response) => {
  res.send('save patient')
})

router.get('/patients', async (req: Request, res: Response) => {
  const patients = await prisma.patient.findMany()

  if (patients.length === 0) { 
    return res.status(404).json({ 
      code: 404,  
      message: 'No se encontraron pacientes' 
    })
  }

  return res.status(200).json(patients)
})

router.put('/patient/:id', async (req: Request, res: Response) => {

})


export default router