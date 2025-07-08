"use client"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences?: UserPreferences
  savedProperties: string[]
  searchHistory: SearchHistory[]
  createdAt: string
}

export interface UserPreferences {
  propertyType: string
  bedrooms: string
  budget: [number, number]
  preferredAreas: string[]
  lifestyle: string[]
  commuteMode: string
  workLocation: string
  maxCommuteTime: [number]
  priorities: string[]
}

export interface SearchHistory {
  id: string
  query: string
  filters: any
  timestamp: string
  results: number
}

// Demo accounts
const DEMO_USERS: User[] = [
  {
    id: "demo-1",
    email: "ramesh124@gmail.com",
    name: "Ramesh Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    preferences: {
      propertyType: "apartment",
      bedrooms: "2",
      budget: [25000, 45000],
      preferredAreas: ["Koramangala", "Indiranagar", "HSR Layout"],
      lifestyle: ["Young Professional", "Fitness Enthusiast", "Work from Home"],
      commuteMode: "public",
      workLocation: "Electronic City",
      maxCommuteTime: [45],
      priorities: ["Good Connectivity", "Safety & Security", "Modern Amenities"],
    },
    savedProperties: ["1", "3"],
    searchHistory: [
      {
        id: "search-1",
        query: "2BHK near Electronic City",
        filters: { budget: [25000, 45000], bedrooms: "2" },
        timestamp: "2024-01-15T10:30:00Z",
        results: 12,
      },
      {
        id: "search-2",
        query: "Koramangala apartments",
        filters: { location: "Koramangala", propertyType: "apartment" },
        timestamp: "2024-01-14T15:20:00Z",
        results: 8,
      },
    ],
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "demo-2",
    email: "raju123@gmail.com",
    name: "Raju Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    preferences: {
      propertyType: "villa",
      bedrooms: "3",
      budget: [40000, 80000],
      preferredAreas: ["Whitefield", "Marathahalli", "Sarjapur"],
      lifestyle: ["Family with Kids", "Pet Owner", "Social Person"],
      commuteMode: "car",
      workLocation: "Whitefield",
      maxCommuteTime: [30],
      priorities: ["Schools & Education", "Parks & Recreation", "Safety & Security"],
    },
    savedProperties: ["2"],
    searchHistory: [
      {
        id: "search-3",
        query: "3BHK villa with garden",
        filters: { bedrooms: "3", propertyType: "villa", amenities: ["garden"] },
        timestamp: "2024-01-16T09:15:00Z",
        results: 5,
      },
    ],
    createdAt: "2024-01-08T12:00:00Z",
  },
]

// Cache for faster lookups
const userCache = new Map<string, User>()
const initializeCache = () => {
  DEMO_USERS.forEach((user) => {
    userCache.set(user.email, user)
  })
}

// Initialize cache immediately
initializeCache()

class AuthService {
  private currentUser: User | null = null
  private users: User[] = [...DEMO_USERS]
  private authPromiseCache = new Map<string, Promise<any>>()

  constructor() {
    // Load user from localStorage on initialization
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("neighborfit_user")
      if (savedUser) {
        try {
          this.currentUser = JSON.parse(savedUser)
          console.log("User loaded from cache:", this.currentUser?.name)
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("neighborfit_user")
        }
      }
    }
  }

  // Optimized sign-in with caching and reduced delay
  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    console.log("🚀 Fast sign-in attempt for:", email)

    // Check cache first for instant lookup
    const cacheKey = `signin_${email}_${password}`
    if (this.authPromiseCache.has(cacheKey)) {
      console.log("⚡ Using cached auth promise")
      return this.authPromiseCache.get(cacheKey)!
    }

    // Create promise and cache it
    const authPromise = this.performSignIn(email, password)
    this.authPromiseCache.set(cacheKey, authPromise)

    // Clear cache after 5 seconds to prevent memory leaks
    setTimeout(() => {
      this.authPromiseCache.delete(cacheKey)
    }, 5000)

    return authPromise
  }

  private async performSignIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    // Reduced API delay from 1000ms to 200ms for faster response
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Use cached user lookup for instant results
    const user = userCache.get(email) || this.users.find((u) => u.email === email)
    console.log("⚡ User found in cache:", !!user)

    if (!user) {
      return { user: null, error: "User not found" }
    }

    // For demo accounts, accept "password" as the password
    // For gmail accounts, accept any password
    if (email.includes("@gmail.com") || password === "password") {
      this.currentUser = user

      // Optimized localStorage write with try-catch
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("neighborfit_user", JSON.stringify(user))
        } catch (error) {
          console.warn("Failed to save user to localStorage:", error)
        }
      }

      console.log("✅ Fast sign-in successful for:", user.name)
      return { user, error: null }
    }

    return { user: null, error: "Invalid credentials" }
  }

  // Optimized sign-up with reduced delay
  async signUp(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
    console.log("🚀 Fast sign-up for:", email)

    // Reduced API delay from 1000ms to 300ms
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Quick cache check for existing user
    if (userCache.has(email) || this.users.find((u) => u.email === email)) {
      return { user: null, error: "User already exists" }
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      savedProperties: [],
      searchHistory: [],
      createdAt: new Date().toISOString(),
    }

    // Add to cache immediately
    userCache.set(email, newUser)
    this.users.push(newUser)
    this.currentUser = newUser

    // Optimized localStorage write
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("neighborfit_user", JSON.stringify(newUser))
      } catch (error) {
        console.warn("Failed to save new user to localStorage:", error)
      }
    }

    console.log("✅ Fast sign-up successful for:", name)
    return { user: newUser, error: null }
  }

  // Instant sign-out with no delays
  async signOut(): Promise<void> {
    console.log("⚡ Instant sign-out for user:", this.currentUser?.name)

    // Clear current user immediately
    this.currentUser = null

    // Clear cache entries for this user
    this.authPromiseCache.clear()

    // Optimized localStorage cleanup
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("neighborfit_user")
        localStorage.removeItem("neighborfit_preferences")
        localStorage.removeItem("neighborfit_searches")
      } catch (error) {
        console.warn("Failed to clear localStorage:", error)
      }
    }

    console.log("✅ Instant sign-out complete")
  }

  // Instant user retrieval
  getCurrentUser(): User | null {
    return this.currentUser
  }

  // Optimized profile updates with reduced delay
  async updateProfile(updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    if (!this.currentUser) {
      return { user: null, error: "Not authenticated" }
    }

    // Reduced API delay from 500ms to 100ms
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Update user object
    this.currentUser = { ...this.currentUser, ...updates }

    // Update cache
    userCache.set(this.currentUser.email, this.currentUser)

    // Update in users array
    const userIndex = this.users.findIndex((u) => u.id === this.currentUser!.id)
    if (userIndex !== -1) {
      this.users[userIndex] = this.currentUser
    }

    // Optimized localStorage update
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("neighborfit_user", JSON.stringify(this.currentUser))
      } catch (error) {
        console.warn("Failed to update user in localStorage:", error)
      }
    }

    console.log("⚡ Fast profile update complete")
    return { user: this.currentUser, error: null }
  }

  // Instant preferences update
  async updatePreferences(preferences: UserPreferences): Promise<{ user: User | null; error: string | null }> {
    return this.updateProfile({ preferences })
  }

  // Instant property save/unsave
  async saveProperty(propertyId: string): Promise<void> {
    if (!this.currentUser) return

    const savedProperties = [...this.currentUser.savedProperties]
    if (!savedProperties.includes(propertyId)) {
      savedProperties.push(propertyId)
      // No await needed for instant response
      this.updateProfile({ savedProperties })
    }
  }

  async unsaveProperty(propertyId: string): Promise<void> {
    if (!this.currentUser) return

    const savedProperties = this.currentUser.savedProperties.filter((id) => id !== propertyId)
    // No await needed for instant response
    this.updateProfile({ savedProperties })
  }

  // Instant search history addition
  async addSearchHistory(search: Omit<SearchHistory, "id">): Promise<void> {
    if (!this.currentUser) return

    const searchHistory = [
      { ...search, id: `search-${Date.now()}` },
      ...this.currentUser.searchHistory.slice(0, 9), // Keep last 10 searches
    ]

    // No await needed for instant response
    this.updateProfile({ searchHistory })
  }

  // Demo account helpers with cache
  getDemoAccounts(): { email: string; name: string }[] {
    return DEMO_USERS.map((user) => ({ email: user.email, name: user.name }))
  }

  // Clear all caches (useful for debugging)
  clearCaches(): void {
    this.authPromiseCache.clear()
    userCache.clear()
    initializeCache()
    console.log("🧹 All caches cleared and reinitialized")
  }
}

export const authService = new AuthService()
