"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  MapPin,
  Briefcase,
  Users,
  Calendar,
  Edit3,
  LogOut,
  Search,
  Eye,
  Heart,
  Clock,
  DollarSign,
  Shield,
  Car,
  Home,
  GraduationCap,
  Music,
  Bus,
  Save,
  Download,
  Share2,
  Bell,
  TrendingUp,
  Target,
  CheckCircle,
  Camera,
} from "lucide-react"
import { authService, type User as UserType } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  // Add local editable user state
  const [editUser, setEditUser] = useState<UserType | null>(null)

  // Preference sliders state
  const [preferences, setPreferences] = useState({
    budgetRange: [25000, 45000],
    safetyPriority: 9,
    commuteImportance: 8,
    familyFriendliness: 9,
    schoolQuality: 8,
    nightlifeDining: 5,
    publicTransport: true,
  })

  // Notifications state
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    marketUpdates: true,
    newMatches: false,
  })

  useEffect(() => {
    console.log("Profile page mounted")
    const currentUser = authService.getCurrentUser()
    console.log("Current user:", currentUser)

    if (!currentUser) {
      console.log("No user found, redirecting to home")
      router.push("/")
      return
    }

    setUser(currentUser)
    setEditUser(currentUser) // initialize editUser
    setLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }, [router])

  const handleSavePreferences = async () => {
    // Save preferences logic
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Add handler for saving edited profile
  const handleSaveProfile = () => {
    if (editUser) {
      setUser(editUser)
      setEditing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  // Add export and share handlers
  const handleExportData = () => {
    const dataStr = JSON.stringify(savedAreas, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'saved-areas.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShareList = async () => {
    const summary = savedAreas.map(area => `${area.name} (${area.location}) - ${area.price}, Match: ${area.match}`).join('\n')
    try {
      await navigator.clipboard.writeText(summary)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  // Add a loading state check
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-300">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Please Sign In</h2>
            <p className="text-gray-400 mb-4">You need to be signed in to view your profile.</p>
            <Button onClick={() => router.push("/")} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const savedAreas = [
    {
      name: "Cyber City",
      location: "Gurgaon, Haryana",
      price: "₹35,000",
      match: "94%",
      change: "+5.2%",
      saved: "2024-01-15",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Koramangala",
      location: "Bangalore, Karnataka",
      price: "₹28,000",
      match: "89%",
      change: "+3.1%",
      saved: "2024-01-10",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Bandra West",
      location: "Mumbai, Maharashtra",
      price: "₹55,000",
      match: "87%",
      change: "+7.8%",
      saved: "2024-01-08",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const quickStats = [
    { label: "Searches", value: "47", icon: Search, color: "text-blue-400" },
    { label: "Areas Viewed", value: "156", icon: Eye, color: "text-green-400" },
    { label: "Avg Match", value: "82.4%", icon: Heart, color: "text-pink-400" },
    { label: "Last Active", value: "2 hours ago", icon: Clock, color: "text-purple-400" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Profile</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your preferences, view analytics, and track your neighborhood search journey.
          </p>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6">
            <Alert className="bg-green-900/20 border-green-500/30 backdrop-blur-xl">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-300">Login successful! Welcome back.</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-blue-500/30">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-1/2 transform translate-x-6 translate-y-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                <p className="text-gray-400 mb-1">{user.email}</p>
                <p className="text-gray-400 mb-6">+91 98765 43210</p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Location:</span>
                    <span className="text-white ml-auto">Gurgaon, Haryana</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Occupation:</span>
                    <span className="text-white ml-auto">Software Engineer</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Family Size:</span>
                    <span className="text-white ml-auto">4 members</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Age:</span>
                    <span className="text-white ml-auto">32 years</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                    onClick={() => setEditing(!editing)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                    onClick={async () => {
                      await authService.signOut()
                      // Trigger auth state change event
                      window.dispatchEvent(new CustomEvent("authStateChanged"))
                      // Redirect to home page
                      window.location.href = "/"
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-400 text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-gray-300 text-sm">{stat.label}</span>
                    </div>
                    <span className="text-white font-semibold">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center - Lifestyle Preferences */}
          <div className="lg:col-span-6">
            {/* Show edit form if editing is true */}
            {editing ? (
              <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-xl">Edit Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-white font-medium">Name</Label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-slate-600"
                      value={editUser?.name || ''}
                      onChange={e => setEditUser(editUser ? { ...editUser, name: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label className="text-white font-medium">Email</Label>
                    <input
                      type="email"
                      className="w-full mt-1 p-2 rounded bg-slate-700 text-white border border-slate-600"
                      value={editUser?.email || ''}
                      onChange={e => setEditUser(editUser ? { ...editUser, email: e.target.value } : null)}
                    />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">Save</Button>
                    <Button onClick={() => { setEditing(false); setEditUser(user); }} variant="outline" className="flex-1">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-400 text-xl">Lifestyle Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Budget Range */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <Label className="text-white font-medium">Budget Range (Monthly Rent)</Label>
                  </div>
                  <Slider
                    value={preferences.budgetRange}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, budgetRange: value }))}
                    max={100000}
                    min={10000}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="text-center text-gray-300">
                    ₹{preferences.budgetRange[0].toLocaleString()} - ₹{preferences.budgetRange[1].toLocaleString()}
                    /month
                  </div>
                </div>

                {/* Safety Priority */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <Label className="text-white font-medium">Safety Priority (1-10)</Label>
                  </div>
                  <Slider
                    value={[preferences.safetyPriority]}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, safetyPriority: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="text-center text-gray-300">{preferences.safetyPriority}/10</div>
                </div>

                {/* Commute Importance */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Car className="h-5 w-5 text-purple-400" />
                    <Label className="text-white font-medium">Commute Importance (1-10)</Label>
                  </div>
                  <Slider
                    value={[preferences.commuteImportance]}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, commuteImportance: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="text-center text-gray-300">{preferences.commuteImportance}/10</div>
                </div>

                {/* Family Friendliness */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="h-5 w-5 text-pink-400" />
                    <Label className="text-white font-medium">Family Friendliness (1-10)</Label>
                  </div>
                  <Slider
                    value={[preferences.familyFriendliness]}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, familyFriendliness: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="text-center text-gray-300">{preferences.familyFriendliness}/10</div>
                </div>

                {/* School Quality */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="h-5 w-5 text-yellow-400" />
                    <Label className="text-white font-medium">School Quality (1-10)</Label>
                  </div>
                  <Slider
                    value={[preferences.schoolQuality]}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, schoolQuality: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="text-center text-gray-300">{preferences.schoolQuality}/10</div>
                </div>

                {/* Nightlife & Dining */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Music className="h-5 w-5 text-orange-400" />
                    <Label className="text-white font-medium">Nightlife & Dining (1-10)</Label>
                  </div>
                  <Slider
                    value={[preferences.nightlifeDining]}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, nightlifeDining: value[0] }))}
                    max={10}
                    min={1}
                    step={1}
                    className="mb-2"
                  />
                  <div className="text-center text-gray-300">{preferences.nightlifeDining}/10</div>
                </div>

                {/* Public Transport Access */}
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bus className="h-5 w-5 text-cyan-400" />
                    <Label className="text-white font-medium">Public Transport Access</Label>
                  </div>
                  <Switch
                    checked={preferences.publicTransport}
                    onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, publicTransport: checked }))}
                  />
                </div>

                <Button
                  onClick={handleSavePreferences}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Saved Areas */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-blue-400 text-lg">Saved Areas</CardTitle>
                <Badge className="bg-blue-500/20 text-blue-300">3 saved</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedAreas.map((area, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <img
                        src={area.image || "/placeholder.svg"}
                        alt={area.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium truncate">{area.name}</h4>
                          <Badge className="bg-green-500/20 text-green-300 text-xs">{area.match}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{area.location}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">{area.price}</span>
                          <span className="text-green-400 text-sm">{area.change}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Saved: {area.saved}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                    onClick={handleExportData}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
                    onClick={handleShareList}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share List
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-400 text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-blue-400" />
                    <span className="text-white text-sm">Price Alerts</span>
                  </div>
                  <Switch
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, priceAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-white text-sm">Market Updates</span>
                  </div>
                  <Switch
                    checked={notifications.marketUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketUpdates: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-pink-400" />
                    <span className="text-white text-sm">New Matches</span>
                  </div>
                  <Switch
                    checked={notifications.newMatches}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newMatches: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
