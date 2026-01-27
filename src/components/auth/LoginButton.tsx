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
      label: 'Sign in with Google',
      bg: 'text-red-400 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer my-6'
    },
    github: {
      icon: FaGithub,
      label: 'Sign in with GitHub',
      bg: 'bg-gray-800 hover:bg-gray-900 text-white transition-colors cursor-pointer my-6'
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