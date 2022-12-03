import { ServiceBoot } from './serviceBoot'

export async function start () {
  const client = await ServiceBoot.client

  client.onMessage(async (message) => {
    if (!message.isGroupMsg){
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const str = `Olá ${message.notifyName || ''}, sou o HireMeBoot🤖 fui criado por Rafael C. de Aguiar. Minha missão é convencer você de contratá-lo. 
    
      Para saber mais sobre ele, você pode enviar o número da opção que você deseja:
          
      *[ 1 ]* - 👨‍💻 Histórico Profissional 
      *[ 2 ]* - 👫 Histórico Pessoal 
      *[ 3 ]* - 🤔 Rafael é o candidato perfeito? `
      await client.sendText(message.from, str)
        .then()
        .catch((erro) => {
          console.error('Error when sending: ', erro) // return object error
        })
    }
  })
}
