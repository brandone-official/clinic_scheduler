import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_BRANDONE_API_KEY,
  authDomain: import.meta.env.VITE_BRANDONE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_BRANDONE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_BRANDONE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_BRANDONE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_BRANDONE_APP_ID,
}

const brandonApp = getApps().find(a => a.name === 'brandone') ?? initializeApp(config, 'brandone')

export const brandonAuth = getAuth(brandonApp)
export const brandonDb = getFirestore(brandonApp)
