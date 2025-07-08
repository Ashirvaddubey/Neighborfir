"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Lock, Loader2, UserPlus, LogIn, Users, Sparkles, Shield } from "lucide-react"
import { authService } from "@/lib/auth"

interface AuthDialogProps {
  children: React.ReactNode
  onAuthSuccess?: () => void
}

export function AuthDialog({ children, onAuthSuccess }: AuthDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("signin")

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  })

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    name: "",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("Attempting sign in with:", signInForm.email)

    const { user, error } = await authService.signIn(signInForm.email, signInForm.password)

    if (error) {
      console.error("Sign-in error:", error)
      setError(error)
    } else if (user) {
      console.log("Sign-in successful:", user)
      setOpen(false)
      onAuthSuccess?.()
      // Refresh the page to update auth state
      window.location.reload()
    }

    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { user, error } = await authService.signUp(signUpForm.email, signUpForm.password, signUpForm.name)

    if (error) {
      setError(error)
    } else if (user) {
      setOpen(false)
      onAuthSuccess?.()
      // Refresh the page to update auth state
      window.location.reload()
    }

    setLoading(false)
  }

  const handleDemoSignIn = async (email: string) => {
    setLoading(true)
    setError("")

    console.log("Demo sign-in for:", email)

    const { user, error } = await authService.signIn(email, "password")

    if (error) {
      console.error("Demo sign-in error:", error)
      setError(error)
    } else if (user) {
      console.log("Demo sign-in successful:", user)
      setOpen(false)
      onAuthSuccess?.()
      window.location.reload()
    }

    setLoading(false)
  }

  const demoAccounts = authService.getDemoAccounts()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">Welcome to NeighborFit</DialogTitle>
          <p className="text-gray-600">Your AI-powered neighborhood discovery platform</p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 backdrop-blur-sm">
            <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-6 mt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
                  <Users className="h-4 w-4" />
                  Try Demo Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                      <div className="text-xs text-gray-600">{account.email}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDemoSignIn(account.email)}
                      disabled={loading}
                      className="bg-white/80 hover:bg-white border-blue-300 text-blue-700 hover:text-blue-800"
                    >
                      Use Demo
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-xs text-blue-700 mt-3 p-2 bg-blue-100/50 rounded-lg">
                  <Shield className="h-3 w-3" />
                  Demo accounts include pre-filled preferences and search history
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6 mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-gray-700 font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
