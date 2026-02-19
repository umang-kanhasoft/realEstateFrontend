import { z } from 'zod';

const envSchema = z.object({
  // App
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().default('Real Estate Platform'),

  // API
  NEXT_PUBLIC_API_URL: z.string(),

  // Maps
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),

  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
  NEXT_PUBLIC_EMAIL: z.string().optional(),
  NEXT_PUBLIC_CHAT_API: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  // We use current process.env and validate it
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
    NEXT_PUBLIC_CHAT_API: 'http://192.168.11.135:8000',
  };

  const parsed = envSchema.safeParse(envVars);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    // In production, we might want to fail hard, but for now we just log
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment variables');
    }
    return envVars as Env; // Return what we have in dev
  }

  return parsed.data;
}

export const env = validateEnv();

// Client-safe env (only NEXT_PUBLIC_ vars)
export const clientEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Real Estate Platform',
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  email: process.env.NEXT_PUBLIC_EMAIL,
  chatAPI: env.NEXT_PUBLIC_CHAT_API,
};
