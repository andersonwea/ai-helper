import axios, { ResponseType } from 'axios'

export async function textToSpeak(text: string) {
  const voiceId = 'NUFn2pGaTh1p4u6Co1l4'
  const model = 'eleven_multilingual_v1'

  const options = {
    method: 'POST',
    url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    headers: {
      accept: 'audio/mpeg',
      'content-type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
    },
    data: {
      text,
      model_id: model,
    },
    responseType: 'arraybuffer' as ResponseType,
  }

  const response = await axios.request(options)

  return response.data
}
