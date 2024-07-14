import { Router } from 'express'
import { 
  createPatient, 
  deletePatientById, 
  getAllPatients, 
  getPatientById, 
  updatePatient 
} from '../controllers/PatientController'
import { validatePatient } from '../validators/patientValidators'

const router = Router()

router.post('/createPatient', validatePatient,  createPatient)
router.get('/getPatients',         getAllPatients)
router.get('/getPatient/:id',      getPatientById)
router.patch('/deletePatient/:id', deletePatientById)
router.put('/getPatient/:id',      updatePatient)

export default router