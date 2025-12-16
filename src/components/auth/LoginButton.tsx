'use client'

import { signIn } from 'next-auth/react'
import { FaGoogle, FaGithub } from 'react-icons/fa'

interface LoginButtonProps {
  provider: 'google' | 'github'
}

export function LoginButton({ provider }: LoginButtonProps) {
  const config = {
    google: {
      icon: FaGoogle,
      label: 'Continuar con Google',
      bg: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300'
    },
    github: {
      icon: FaGithub,
      label: 'Continuar con GitHub',
      bg: 'bg-gray-800 hover:bg-gray-900 text-white'
    }
  }
  
  const { icon: Icon, label, bg } = config[provider]
  
  return (
    <button
      onClick={() => signIn(provider, { callbackUrl: '/dashboard' })}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${bg}`}
    >
      <Icon className="text-xl" />
      {label}
    </button>
  )
}