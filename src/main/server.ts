import { create } from 'venom-bot'
import { ServiceBoot } from '../utils/whatsapp/service-boot'
import env from './config/env'

create({
  session: env.sessionName
}).then((client) => {
  ServiceBoot.setInstance(client)
  ServiceBoot.start()
}).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log(`Server running at http://localhost:${5050}`))
}).catch((error) => {
  console.error(error)
})
