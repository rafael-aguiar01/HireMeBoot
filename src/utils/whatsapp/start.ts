import { ServiceBoot } from './service-boot'

import {
  defaultMessage,
  professionalBackground,
  personalBackground,
  yearlyGoals,
  perfectCandidate
} from './messages/index'

export async function start () {
  const client = await ServiceBoot.client

  client.onMessage(async (message) => {
    if (!message.isGroupMsg){
      const messages = [
        null,
        professionalBackground,
        personalBackground,
        yearlyGoals,
        perfectCandidate
      ]
      let answer = messages[message.body]
      if (!answer) {
        answer = defaultMessage
      }
      await client.sendText(message.from, answer(message.notifyName))
        .then()
        .catch((erro) => {
          console.error('Error when sending: ', erro)
        })
    }
  })
}
