export function getBaseUrl(protocol: string, hostname: string): string {
  const nodeEnv = process.env.NODE_ENV
  const PORT = process.env.PORT

  if (nodeEnv === 'PROD') {
    return protocol.concat('://').concat(hostname)
  }

  return protocol.concat('://').concat(hostname).concat(`:${PORT}`)
}
