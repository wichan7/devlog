function requiredEnv(name: string): string {
  const value = process.env[name]

  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const SITE_URL = requiredEnv("SITE_URL")
