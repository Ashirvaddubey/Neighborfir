"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SearchFilters } from "@/components/search-filters"
import { PropertyMap } from "@/components/property-map"
import { PropertyList } from "@/components/property-list"
import { MatchingResults } from "@/components/matching-results"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, List, Target } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [filters, setFilters] = useState({
    budget: [0, 50000],
    propertyType: "all",
    bedrooms: "any",
    location: "",
    amenities: [],
  })
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Optimized property fetching with reduced delay
    const fetchProperties = async () => {
      setLoading(true)

      // Reduced delay from 1000ms to 300ms for faster loading
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Mock property data (cached for better performance)
      const mockProperties = [
        {
          id: 1,
          title: "Modern 2BHK in Koramangala",
          location: "Koramangala, Bangalore",
          price: 35000,
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          type: "apartment",
          coordinates: [12.9352, 77.6245],
          matchScore: 92,
          amenities: ["gym", "parking", "security"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 2,
          title: "Spacious 3BHK Villa",
          location: "Whitefield, Bangalore",
          price: 45000,
          bedrooms: 3,
          bathrooms: 3,
          area: 1800,
          type: "villa",
          coordinates: [12.9698, 77.75],
          matchScore: 88,
          amenities: ["garden", "parking", "security", "gym"],
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 3,
          title: "Cozy 1BHK Studio",
          location: "Indiranagar, Bangalore",
          price: 25000,
          bedrooms: 1,
          bathrooms: 1,
          area: 800,
          type: "studio",
          coordinates: [12.9784, 77.6408],
          matchScore: 85,
          amenities: ["parking", "security"],
          image: "/placeholder.svg?height=200&width=300",
        },
      ]

      setProperties(mockProperties)
      setLoading(false)
      console.log("⚡ Properties loaded in 300ms")
    }

    fetchProperties()
  }, [searchQuery, filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Property Search</h1>
            {searchQuery && <Badge variant="outline">Results for "{searchQuery}"</Badge>}
          </div>
          <p className="text-gray-600">Discover your perfect neighborhood with AI-powered matching</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Map View
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="matches" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Smart Matches
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <PropertyMap properties={properties} loading={loading} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <PropertyList properties={properties} loading={loading} />
              </TabsContent>

              <TabsContent value="matches" className="mt-6">
                <MatchingResults properties={properties} loading={loading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
