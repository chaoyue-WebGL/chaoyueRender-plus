export interface EnvironmentConfig {
  isMobile?: boolean
  devicePixelRatio?: number
  gpuMemory?: number
  browserName?: string
  browserVersion?: string
}

export const environment: EnvironmentConfig = {
  isMobile: false,
  devicePixelRatio: 1.0,
  gpuMemory: 512, // in MB
  browserName: '',
  browserVersion: ''
}
