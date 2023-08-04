import express, { Response, Request } from 'express'
import multer from 'multer'
import { WaveFile } from 'wavefile'
import { pipeline } from '@xenova/transformers'
import { textGeneration } from './utils/text-generation'
import fs from 'fs'
import { textToSpeech } from './utils/text-to-speech'
import { getBaseUrl } from './utils/get-base-url'
import { buffer } from 'stream/consumers'

const storage = multer.memoryStorage()

const upload = multer({ storage })

export const router = express.Router()

router.post(
  '/api/text-to-speech',
  async (request: Request, response: Response) => {
    const { text } = request.body

    if (!text) {
      return response.status(400).json({ message: 'Invalid text.' })
    }

    try {
      const fileOutputPath = 'data/output.wav'

      const buffer = await textToSpeech(text)

      fs.writeFileSync(fileOutputPath, buffer)

      const fullUrl = getBaseUrl(request.protocol, request.hostname)
      const fileUrl = new URL(`/data/output.wav`, fullUrl).toString()

      return response.json({ audioUrl: fileUrl })
    } catch (err) {
      console.error(err)
    }
  },
)

router.post(
  '/api/transcription',
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

      return response.json({ transcription })
    } catch (err) {
      console.error(err)
      return response.status(500).send()
    }
  },
)

router.post(
  '/api/text-generation',
  async (request: Request, response: Response) => {
    const { text } = request.body

    if (!text) {
      return response.status(400).json({ message: 'Invalid Text.' })
    }

    try {
      const { output, costInCents } = await textGeneration(text)

      return response.json({ output, costInCents })
    } catch (err) {
      console.error(err)
      return response.status(500).send
    }
  },
)
