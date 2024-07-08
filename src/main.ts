import exress from 'express'
import cors from 'cors'
import routesPatient from './routes/patient.routes'

const app = exress()
const PORT = process.env.PORT ?? 3000

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(exress.json())
app.use('/api', routesPatient)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}  🚀`)
})