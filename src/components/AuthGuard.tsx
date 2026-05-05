import { useState, useEffect, type ReactNode } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { brandonAuth, brandonDb } from '../lib/brandoneFire'
import BrandoneLogin from './BrandoneLogin'

const APP_KEY = 'clinic-guide'
const BRANDONE_URL = 'https://brandone-lab.web.app'

type AuthState = 'loading' | 'login' | 'allowed' | 'denied'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>('loading')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return onAuthStateChanged(brandonAuth, (currentUser) => {
      if (!currentUser) {
        setUser(null)
        setState('login')
        return
      }
      setUser(currentUser)
    })
  }, [])

  useEffect(() => {
    if (!user) return

    return onSnapshot(doc(brandonDb, 'users', user.uid), (snap) => {
      const data = snap.data()
      const hasAccess = data?.appAccess?.[APP_KEY] === true
      setState(hasAccess ? 'allowed' : 'denied')
    })
  }, [user])

  if (state === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{
          width: '20px', height: '20px',
          border: '2px solid #E5E7EB',
          borderTopColor: '#3D1F8F',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (state === 'login') return <BrandoneLogin />
  if (state === 'denied') return <NoAccess />

  return <>{children}</>
}

function NoAccess() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');`}</style>

      {/* 상단 퍼플 라인 */}
      <div style={{ width: '100%', height: '4px', background: '#3D1F8F', flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

          {/* 로고 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.02em', lineHeight: 1 }}>
              <span style={{ color: '#3D1F8F' }}>BRA</span>
              <span style={{ color: '#C8D96F' }}>ND</span>
              <span style={{ color: '#C8D96F' }}> O</span>
              <span style={{ color: '#3D1F8F' }}>NE.</span>
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.02em', lineHeight: 1, color: '#3D1F8F' }}>
              LAB
            </div>
          </div>

          {/* 안내 메시지 */}
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.6rem', fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5 }}>
              접근 권한이 없습니다.
            </p>
            <p style={{ margin: 0, fontSize: '0.83rem', fontWeight: 400, color: '#888888', lineHeight: 1.7, wordBreak: 'keep-all' }}>
              브랜드원 랩에서 해당 앱의<br />이용 권한을 신청해주세요.
            </p>
          </div>

          {/* 버튼 그룹 */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={BRANDONE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                fontFamily: "'Noto Sans KR', sans-serif",
                color: '#ffffff',
                background: '#3D1F8F',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(61, 31, 143, 0.25)',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              브랜드원 랩 바로가기
            </a>
            <button
              onClick={() => signOut(brandonAuth)}
              style={{
                width: '100%',
                padding: '0.9rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: "'Noto Sans KR', sans-serif",
                color: '#888888',
                background: 'transparent',
                border: '1.5px solid #E5E7EB',
                borderRadius: '12px',
                cursor: 'pointer',
              }}
            >
              로그아웃
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
