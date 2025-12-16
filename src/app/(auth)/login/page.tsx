import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginButton } from '@/components/auth/LoginButton'

export default async function LoginPage() {
  // Si ya está logueado, redirige al dashboard
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Trello Clone
          </h1>
          <p className="text-gray-600">
            Organiza tu trabajo y tu vida
          </p>
        </div>
        
        {/* Botones de login */}
        <div className="space-y-3">
          <LoginButton provider="google" />
          <LoginButton provider="github" />
        </div>
        
        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Al continuar, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  )
}