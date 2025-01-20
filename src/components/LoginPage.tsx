import { useEffect } from 'react'
import { useAuth } from './AuthContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaGoogle } from 'react-icons/fa'

export default function LoginPage() {
  const { user, signIn } = useAuth()

  useEffect(() => {
    // Smooth scroll to the login card when the page loads
    const loginCard = document.getElementById('login-card')
    if (loginCard) {
      loginCard.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CodeShield</h1>
        <p className="text-xl mb-8">Secure your code. Protect your future.</p>
      </section>

      {/* Login Card */}
      <Card id="login-card" className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign in to CodeShield</CardTitle>
          <CardDescription>Continue with Google to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={signIn} className="w-full">
            <FaGoogle className="mr-2" />
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>

      {/* About CodeShield Section */}
      <section className="w-full max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About CodeShield</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Comprehensive Security Scanning</h3>
            <p>CodeShield provides state-of-the-art security scanning for your codebase, identifying vulnerabilities and potential threats before they become problems.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Recommendations</h3>
            <p>Our advanced AI algorithms provide tailored recommendations to improve your code's security, helping you stay one step ahead of potential attackers.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Real-Time Collaboration</h3>
            <p>Work seamlessly with your team in real-time, addressing security concerns and implementing fixes collaboratively.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Continuous Protection</h3>
            <p>CodeShield offers continuous monitoring and protection, ensuring your code remains secure as it evolves and grows.</p>
          </div>
        </div>
      </section>
    </div>
  )
}