import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginButton } from '@/components/auth/LoginButton'
import { CheckCircle2, Layers, Users, Zap } from 'lucide-react';

export default async function LoginPage() {
  // Si ya está logueado, redirige al dashboard
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6 lg:pr-8">
            <div className="space-y-4">
              <div className="inline-block">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                  <Layers className="w-5 h-5" />
                  <span>TaskFlow</span>
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl">
                Organize your work and life, finally.
              </h1>
              <p className="text-xl text-white/90">
                Collaborate, manage projects, and reach new productivity peaks. From high rises to home offices, the way your team works is unique—accomplish it all with TaskFlow.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl mb-1">Boards</h3>
                  <p className="text-white/80">TaskFlow boards keep tasks organized and work moving forward. In a glance, see everything from "things to do" to "aww yeah, we did it!"</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/30">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl mb-1">Collaborate</h3>
                  <p className="text-white/80">Work together in real-time with your team, share updates, and keep everyone on the same page.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/30">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl mb-1">Boost Productivity</h3>
                  <p className="text-white/80">Drag-and-drop simplicity meets powerful organization. Get more done with less effort.</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" max-w-lg mx-12">
            <div className="bg-white rounded-2xl shadow-2xl p-8">

              <div className='w-full max-w-md mx-auto my-12'>
                <h2 className='text-5xl text-center text-gray-900 mb-2'>Sign in to Tasker</h2>
                <p className='text-center text-lg text-gray-600' >Continue to your boards</p>
              </div>

              <div className="">
                <LoginButton provider="google" />
                <LoginButton provider="github" />
              </div>

              <p className="text-center text-gray-500 mt-6 text-sm">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}