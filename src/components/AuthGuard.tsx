import { useState, useEffect, type ReactNode } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { brandonAuth, brandonDb } from '../lib/brandoneFire'
import BrandoneLogin from './BrandoneLogin'

const BRANDONE_URL = 'https://brandone-lab.web.app'

type AuthState = 'loading' | 'login' | 'allowed' | 'denied'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>('loading')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let unsubFirestore: (() => void) | undefined

    const unsubAuth = onAuthStateChanged(brandonAuth, (currentUser) => {
      // 이전 Firestore 구독 즉시 해제
      unsubFirestore?.()
      unsubFirestore = undefined

      if (!currentUser) {
        setUser(null)
        setState('login')
        return
      }

      setUser(currentUser)
      // auth 콜백 안에서 즉시 Firestore 구독 — React 렌더 사이클 사이 gap 제거
      unsubFirestore = onSnapshot(doc(brandonDb, 'users', currentUser.uid), (snap) => {
        const isApproved = snap.exists() && snap.data()?.status === 'approved'
        setState(isApproved ? 'allowed' : 'denied')
      })
    })

    return () => {
      unsubAuth()
      unsubFirestore?.()
    }
  }, [])

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
  if (state === 'denied') return <NoAccess user={user} />

  return <>{children}</>
}

function NoAccess({ user }: { user: User | null }) {
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
              브랜드원 랩 승인이 필요한 서비스입니다.
            </p>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.83rem', fontWeight: 400, color: '#888888', lineHeight: 1.7, wordBreak: 'keep-all' }}>
              승인된 브랜드원 랩 계정으로 로그인해주세요.
            </p>
            {user?.email && (
              <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 500, color: '#3D1F8F', lineHeight: 1.5 }}>
                현재 계정: {user.email}
              </p>
            )}
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
                color: '#6B7280',
                background: 'transparent',
                border: '1.5px solid #E5E7EB',
                borderRadius: '12px',
                cursor: 'pointer',
              }}
            >
              다른 계정으로 시도
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
