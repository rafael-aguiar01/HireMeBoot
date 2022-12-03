import { create } from 'venom-bot'
import { ServiceBoot } from '../utils/whatsapp/service-boot'
import env from './config/env'
import app from './config/app'

create({
  session: env.sessionName
}).then((client) => {
  ServiceBoot.setInstance(client)
  ServiceBoot.start()
}).catch((error) => {
  console.error(error)
})

app.listen(env.port, () => console.log(`Server running at http://localhost:${5050}`))
