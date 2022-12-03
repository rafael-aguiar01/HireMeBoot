import express from 'express'
import { create } from 'venom-bot'
import { ServiceBoot } from './serviceBoot'

const app = express()
const port = 5050
app.use(express.json())

create({
  session: 'HireMeBoot'
}).then((client) => {
  ServiceBoot.setInstance(client)
  ServiceBoot.start()
}).catch((error) => {
  console.error(error)
})

app.listen(port, () => {
  console.log(`HireMeBoot listening on port ${port}`)
})
