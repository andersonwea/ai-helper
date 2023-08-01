import express, { Response, Request } from 'express'
import multer from 'multer'
import { WaveFile } from 'wavefile'
import { pipeline } from '@xenova/transformers'
import { textGeneration } from './utils/text-generation'
import { priceFormat } from './utils/price-format'
import fs from 'fs'
import { textToSpeak } from './utils/text-to-speech'

const storage = multer.memoryStorage()

const upload = multer({ storage })

export const router = express.Router()

router.post(
  '/talk-to-gpt',
  upload.single('file'),
  async (request: Request, response: Response) => {
    try {
      const audioFile = request.file

      if (!audioFile) {
        return response.status(400).json({ message: 'No audio file provided' })
      }

      const transcriber = await pipeline(
        'automatic-speech-recognition',
        'Xenova/whisper-base',
      )
      const wav = new WaveFile(audioFile.buffer)

      wav.toBitDepth('32f')
      wav.toSampleRate(16000)
      let audioData = wav.getSamples()

      if (Array.isArray(audioData)) {
        audioData = audioData[0]
      }

      const transcription = await transcriber(audioData)

      const { output, usage } = await textGeneration(transcription.text)

      const cost = priceFormat(usage)

      const fileOutputPath = 'data/output.wav'

      if (output) {
        const buffer = await textToSpeak(output)

        fs.writeFileSync(fileOutputPath, buffer)

        const fullUrl = request.protocol.concat('://').concat(request.hostname)
        const fileUrl = new URL(`/data/output.wav`, fullUrl).toString()

        return response.json({ audioUrl: fileUrl, cost })
      }
    } catch (err) {
      console.error(err)
    }
  },
)
