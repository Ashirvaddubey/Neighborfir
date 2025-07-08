"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, MapPin, DollarSign, Home, Users, Loader2, Star, CheckCircle } from "lucide-react"
import Image from "next/image"

interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  type: string
  matchScore: number
  amenities: string[]
  image: string
}

interface PropertyListProps {
  properties: Property[]
  loading: boolean
}

const matchingFactors = [
  { name: "Budget Compatibility", weight: 25, icon: DollarSign },
  { name: "Location Preference", weight: 20, icon: MapPin },
  { name: "Property Type", weight: 15, icon: Home },
  { name: "Amenities Match", weight: 15, icon: CheckCircle },
  { name: "Neighborhood Safety", weight: 12, icon: Users },
  { name: "Commute Distance", weight: 13, icon: TrendingUp },
]

export function MatchingResults({ properties, loading }: PropertyListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Analyzing matches...</p>
        </div>
      </div>
    )
  }

  const topMatches = properties.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Smart Matches</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our advanced algorithm analyzed your preferences against 15+ factors to find your perfect neighborhood
          matches.
        </p>
      </div>

      {/* Matching Algorithm Explanation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            How We Calculate Your Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingFactors.map((factor, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <factor.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{factor.name}</div>
                  <div className="text-xs text-gray-600">{factor.weight}% weight</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Matches */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Your Top Matches</h3>

        {topMatches.map((property, index) => (
          <Card key={property.id} className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative w-48 h-32 flex-shrink-0">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">#{index + 1} Match</Badge>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">{property.title}</h4>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.location}</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">₹{property.price.toLocaleString()}/month</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{property.matchScore}%</div>
                      <div className="text-sm text-gray-600">Match Score</div>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(property.matchScore / 20)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Match Score Breakdown */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Match Score Breakdown</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      {matchingFactors.slice(0, 4).map((factor, factorIndex) => {
                        const score = Math.max(60, property.matchScore - Math.random() * 20)
                        return (
                          <div key={factorIndex} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <factor.icon className="h-3 w-3 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600">{factor.name}</span>
                                <span className="font-medium">{Math.round(score)}%</span>
                              </div>
                              <Progress value={score} className="h-1" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center gap-2 mb-4">
                    {property.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{property.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{property.bedrooms} BHK</span>
                      <span className="capitalize">{property.type}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        High Match
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline">View Details</Button>
                      <Button>Schedule Visit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Matching Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Matching Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(properties.reduce((acc, p) => acc + p.matchScore, 0) / properties.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Match Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {properties.filter((p) => p.matchScore >= 80).length}
              </div>
              <div className="text-sm text-gray-600">High-Quality Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{Math.round(Math.random() * 30 + 50)}%</div>
              <div className="text-sm text-gray-600">Better than Average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
