import exress from 'express'
import cors from 'cors'
import routesPatient from './routes/patient.routes'

const app = exress()

const port = process.env.PORT ?? 3000

app.use(exress.json())
app.use(cors())

app.use('/api', routesPatient)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}  🚀`)
})