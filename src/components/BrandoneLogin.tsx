import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { brandonAuth } from '../lib/brandoneFire'

const googleProvider = new GoogleAuthProvider()

export default function BrandoneLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(brandonAuth, googleProvider)
    } catch {
      setError('로그인에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

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

          {/* 안내 텍스트 */}
          <div style={{ fontFamily: "'Noto Sans KR', sans-serif", textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 600, color: '#333333', lineHeight: 1.7 }}>
              클리닉 가이드 캘린더
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 400, color: '#888888', lineHeight: 1.6 }}>
              브랜드원 랩 계정으로 로그인하세요.
            </p>
          </div>

          {/* Google 로그인 버튼 */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                fontFamily: "'Noto Sans KR', sans-serif",
                color: '#ffffff',
                background: loading ? '#9CA3AF' : '#3D1F8F',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(61, 31, 143, 0.25)',
                transition: 'background 0.15s',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', background: '#fff', borderRadius: '4px', flexShrink: 0 }}>
                <GoogleColorIcon />
              </span>
              {loading ? '로그인 중...' : 'Google로 시작하기'}
            </button>

            {error && (
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#EF4444', fontFamily: "'Noto Sans KR', sans-serif", textAlign: 'center' }}>
                {error}
              </p>
            )}
          </div>

          {/* 하단 안내 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C8D96F', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#888888', fontFamily: "'Noto Sans KR', sans-serif" }}>
              승인된 회원 전용 서비스입니다.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

function GoogleColorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}
