"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Search, Heart, User, Menu, X, Target, BarChart3, Sparkles } from "lucide-react"
import { AuthDialog } from "@/components/auth-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authService, type User as UserType } from "@/lib/auth"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [savedCount, setSavedCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setSavedCount(currentUser?.savedProperties?.length || 0)

    // Listen for saved properties changes
    const handleSavedPropertiesChange = () => {
      const updatedUser = authService.getCurrentUser()
      setUser(updatedUser)
      setSavedCount(updatedUser?.savedProperties?.length || 0)
    }

    window.addEventListener("savedPropertiesChanged", handleSavedPropertiesChange)
    window.addEventListener("authStateChanged", handleSavedPropertiesChange)

    return () => {
      window.removeEventListener("savedPropertiesChanged", handleSavedPropertiesChange)
      window.removeEventListener("authStateChanged", handleSavedPropertiesChange)
    }
  }, [])

  const handleProfileClick = () => {
    console.log("Profile clicked, current user:", user) // Debug log
    if (!user) {
      console.log("No user found, redirecting to home")
      router.push("/")
      return
    }
    console.log("Navigating to profile page")
    router.push("/profile")
  }

  // Also add a direct profile link in the desktop navigation
  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Profile", href: "/profile", icon: User }, // Add this line
    { name: "Preferences", href: "/preferences", icon: Target },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ]

  const handleSavedClick = () => {
    if (user) {
      router.push("/profile?tab=saved")
    } else {
      // Show auth dialog if not logged in
      return
    }
  }

  return (
    <nav className="glass sticky top-0 z-50 shadow-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg pulse-glow">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">NeighborFit</span>
              <Badge
                variant="secondary"
                className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-pink-600 hover:bg-pink-50 relative"
              onClick={handleSavedClick}
            >
              <Heart className="h-4 w-4 mr-2" />
              Saved
              {savedCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 bg-gradient-to-r from-pink-500 to-red-500 text-xs">
                  {savedCount}
                </Badge>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-blue-500/20"
                  >
                    <Avatar className="h-10 w-10 border-2 border-blue-200">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass shadow-xl" align="end">
                  <div className="flex items-center justify-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/preferences" className="cursor-pointer flex items-center">
                      <Target className="mr-2 h-4 w-4" />
                      Preferences
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await authService.signOut()
                      setUser(null)
                      setSavedCount(0)
                      // Trigger auth state change event
                      window.dispatchEvent(new CustomEvent("authStateChanged"))
                      // Force page reload to ensure clean state
                      window.location.href = "/"
                    }}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <AuthDialog
                  onAuthSuccess={() => {
                    const currentUser = authService.getCurrentUser()
                    setUser(currentUser)
                    setSavedCount(currentUser?.savedProperties?.length || 0)
                  }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 bg-white/80"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </AuthDialog>
                <AuthDialog
                  onAuthSuccess={() => {
                    const currentUser = authService.getCurrentUser()
                    setUser(currentUser)
                    setSavedCount(currentUser?.savedProperties?.length || 0)
                  }}
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </AuthDialog>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 glass">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-600 hover:text-pink-600 hover:bg-pink-50 relative"
                  onClick={() => {
                    handleSavedClick()
                    setIsMenuOpen(false)
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Properties
                  {savedCount > 0 && (
                    <Badge className="ml-auto h-5 w-5 rounded-full p-0 bg-gradient-to-r from-pink-500 to-red-500 text-xs">
                      {savedCount}
                    </Badge>
                  )}
                </Button>
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        handleProfileClick()
                        setIsMenuOpen(false)
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                      onClick={async () => {
                        await authService.signOut()
                        setUser(null)
                        setSavedCount(0)
                        setIsMenuOpen(false)
                        // Trigger auth state change event
                        window.dispatchEvent(new CustomEvent("authStateChanged"))
                        // Force page reload to ensure clean state
                        window.location.href = "/"
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <AuthDialog
                      onAuthSuccess={() => {
                        const currentUser = authService.getCurrentUser()
                        setUser(currentUser)
                        setSavedCount(currentUser?.savedProperties?.length || 0)
                        setIsMenuOpen(false)
                      }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-2 border-gray-200 hover:border-blue-500 bg-white/80"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </AuthDialog>
                    <AuthDialog
                      onAuthSuccess={() => {
                        const currentUser = authService.getCurrentUser()
                        setUser(currentUser)
                        setSavedCount(currentUser?.savedProperties?.length || 0)
                        setIsMenuOpen(false)
                      }}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get Started
                      </Button>
                    </AuthDialog>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
