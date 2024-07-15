import { Router } from 'express'
import { 
  createPatient, 
  deletePatientById, 
  getAllPatients, 
  getPatientById, 
  updatePatient 
} from '../controllers/PatientController'
import { schemaValidationPatient, validatePatient } from '../validators/patientValidators'

const router = Router()

router.get('/getPatients', getAllPatients)
router.get('/getPatient/:id', getPatientById)
router.post('/createPatient', schemaValidationPatient, createPatient)
/* 
  PUT   -> impacta en todos los atributos del recurso
  PATCH -> solo aplica sobre uno o varios atributos
*/
router.put('/getPatient/:id', validatePatient, updatePatient)
router.patch('/deletePatient/:id', validatePatient, deletePatientById)

export default router