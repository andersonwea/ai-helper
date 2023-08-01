import { Readable } from 'stream'

export const bufferToStream = (buffer: Buffer) => {
  return Readable.from(buffer)
}
