"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, TrendingUp, Sparkles, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-20 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">AI-Powered Neighborhood Discovery</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
              {" "}
              Neighborhood
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            AI-powered neighborhood matching that analyzes{" "}
            <span className="font-semibold text-blue-600">15+ lifestyle factors</span> to find your ideal home location.
            Reduce search time by <span className="font-semibold text-green-600">65%</span> with our intelligent
            recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Enter city, neighborhood, or lifestyle preference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-12 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-lg"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Neighborhoods
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-12">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">50,000+ Properties Analyzed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">87.3% Match Accuracy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="font-medium">2,500+ Happy Users</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Smart Matching</h3>
            <p className="text-gray-600 leading-relaxed">
              Advanced algorithm analyzes your preferences against 15+ lifestyle factors for perfect matches
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Real-Time Data</h3>
            <p className="text-gray-600 leading-relaxed">
              Live property data from multiple sources with instant updates and market insights
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Personalized</h3>
            <p className="text-gray-600 leading-relaxed">
              Tailored recommendations based on your unique lifestyle needs and preferences
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
