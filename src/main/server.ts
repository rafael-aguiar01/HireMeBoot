import express from 'express'
import { start, client } from '../infra/VenomBot/venom-initialize'

const app = express()
const port = 5050

app.listen(port, () => {
  start(client)
  console.log(`HireMeBoot listening on port ${port}`)
})
