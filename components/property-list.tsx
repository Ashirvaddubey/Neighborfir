"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart, Share2, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import { authService } from "@/lib/auth"
import { useState, useEffect } from "react"
import { AuthDialog } from "@/components/auth-dialog"

interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  type: string
  matchScore: number
  amenities: string[]
  image: string
}

interface PropertyListProps {
  properties: Property[]
  loading: boolean
}

export function PropertyList({ properties, loading }: PropertyListProps) {
  const [user, setUser] = useState(authService.getCurrentUser())
  const [savedProperties, setSavedProperties] = useState<string[]>(user?.savedProperties || [])
  const [savingProperty, setSavingProperty] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setSavedProperties(currentUser?.savedProperties || [])
  }, [])

  // Optimized property save with instant UI feedback
  const handleSaveProperty = async (propertyId: string) => {
    if (!user) {
      // User not logged in, show auth dialog
      return
    }

    setSavingProperty(propertyId)

    try {
      // Optimistic UI update for instant feedback
      const isSaved = savedProperties.includes(propertyId)
      const newSavedProperties = isSaved
        ? savedProperties.filter((id) => id !== propertyId)
        : [...savedProperties, propertyId]

      setSavedProperties(newSavedProperties)

      // Perform actual save/unsave operation
      if (isSaved) {
        await authService.unsaveProperty(propertyId)
      } else {
        await authService.saveProperty(propertyId)
      }

      // Trigger navbar update
      window.dispatchEvent(new CustomEvent("savedPropertiesChanged"))

      console.log("⚡ Property save operation completed instantly")
    } catch (error) {
      console.error("Error saving property:", error)
      // Revert optimistic update on error
      setSavedProperties(user?.savedProperties || [])
    } finally {
      setSavingProperty(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse glass">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-48 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <Card className="glass">
        <CardContent className="p-12 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your search filters to see more results.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{properties.length} Properties Found</h2>
        <Badge variant="outline" className="bg-white/80">
          Sorted by Match Score
        </Badge>
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <Card key={property.id} className="glass hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative w-48 h-32 flex-shrink-0">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      {property.matchScore}% Match
                    </Badge>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">₹{property.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>{property.area} sq ft</span>
                    </div>
                    <Badge variant="outline" className="capitalize bg-white/80">
                      {property.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-yellow-600">
                        <Star className="h-4 w-4 fill-current" />
                        <span>4.{Math.floor(Math.random() * 9) + 1}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>High Demand</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {user ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveProperty(property.id.toString())}
                          disabled={savingProperty === property.id.toString()}
                          className={`transition-all duration-200 ${
                            savedProperties.includes(property.id.toString())
                              ? "bg-gradient-to-r from-pink-50 to-red-50 border-pink-300 text-pink-700 hover:from-pink-100 hover:to-red-100"
                              : "bg-white/80 hover:bg-pink-50 hover:border-pink-300"
                          }`}
                        >
                          <Heart
                            className={`h-4 w-4 mr-1 transition-all duration-200 ${
                              savedProperties.includes(property.id.toString())
                                ? "fill-current text-pink-600"
                                : "text-gray-600"
                            }`}
                          />
                          {savedProperties.includes(property.id.toString()) ? "Saved" : "Save"}
                        </Button>
                      ) : (
                        <AuthDialog
                          onAuthSuccess={() => {
                            const currentUser = authService.getCurrentUser()
                            setUser(currentUser)
                            setSavedProperties(currentUser?.savedProperties || [])
                          }}
                        >
                          <Button variant="outline" size="sm" className="bg-white/80 hover:bg-pink-50">
                            <Heart className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </AuthDialog>
                      )}
                      <Button variant="outline" size="sm" className="bg-white/80 hover:bg-blue-50">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
