import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AtSign, Key, LogIn, User, AlertCircle } from 'lucide-react'

export default function Component() {
  const [emailOrExtension, setEmailOrExtension] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Handle successful login here 
      console.log('Login successful')
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-8  rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 dark:shadow-lg dark:hover:shadow-[#d4ab71] dark:shadow-[#d4ab71]">
        <div className="text-center">
          <div className="inline-block p-4 bg-[#d4ab71] bg-opacity-20 rounded-full">
            <User size={40} className="text-[#d4ab71]" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold ">Welcome Back</h1>
          <p className="mt-2 ">Please sign in to your account</p>
        </div>
        {error && (
          <Alert variant="destructive" className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emailOrExtension" className="text-sm font-medium">
              Email or Extension
            </Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                id="emailOrExtension"
                type="text"
                placeholder="Enter your email or extension"
                value={emailOrExtension}
                onChange={(e) => setEmailOrExtension(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md focus:ring-[#d4ab71] focus:border-[#d4ab71]"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 rounded-md focus:ring-[#d4ab71] focus:border-[#d4ab71]"
                required
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d4ab71] hover:bg-[#c09a60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4ab71] transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm font-medium text-[#d4ab71] hover:text-[#c09a60] transition-colors duration-200">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  )
}