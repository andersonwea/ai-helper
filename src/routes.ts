import express, { Response, Request } from 'express'
import multer from 'multer'
import wavefile from 'wavefile'
import { pipeline } from '@xenova/transformers'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.post(
  'talk-to-gpt',
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

      const wav = new wavefile.WaveFile(audioFile.buffer)

      wav.toBitDepth('32f')
      wav.toSampleRate(16000)
      let audioData = wav.getSamples()

      if (Array.isArray(audioData)) {
        audioData = audioData[0]
      }

      const transcription = await transcriber(audioData)
    } catch (err) {
      console.error(err)
    }
  },
)
