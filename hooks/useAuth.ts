// src/hooks/use-auth.ts
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const session = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ 
      redirect: false
    })
    router.push('/signin')
  }

  return {
    session: session.data,
    status: session.status,
    isAuthenticated: session.status === 'authenticated',
    isLoading: session.status === 'loading',
    logout: handleLogout,
  }
}