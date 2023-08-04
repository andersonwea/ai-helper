import { Configuration, OpenAIApi } from 'openai'
import 'dotenv/config'

export async function textGeneration(text: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const openai = new OpenAIApi(configuration)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Você é um assitente direto ao ponto, use respostas curtas',
      },
      { role: 'user', content: text },
    ],
    max_tokens: 100,
  })

  const inputPriceTokenInCents = (0.002 * 100) / 1000
  const outputPriceTokenInCents = (0.0015 * 100) / 1000

  const tokensUsed = completion.data.usage

  const completionTokens = tokensUsed?.completion_tokens ?? 0
  const promptTokens = tokensUsed?.prompt_tokens ?? 0

  const costInCents = (
    completionTokens * outputPriceTokenInCents +
    promptTokens * inputPriceTokenInCents
  ).toFixed(4)

  const output = completion.data.choices[0].message?.content

  return { output, costInCents }
}
