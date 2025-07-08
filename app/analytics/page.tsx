"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Users, MapPin, DollarSign, Home, Target, Clock, Star } from "lucide-react"

const marketData = [
  { area: "Koramangala", avgRent: 35000, growth: 12, demand: "High", safety: 4.5 },
  { area: "Indiranagar", avgRent: 32000, growth: 8, demand: "High", safety: 4.3 },
  { area: "Whitefield", avgRent: 28000, growth: 15, demand: "Medium", safety: 4.1 },
  { area: "HSR Layout", avgRent: 30000, growth: 10, demand: "High", safety: 4.4 },
  { area: "Electronic City", avgRent: 25000, growth: 18, demand: "Medium", safety: 4.0 },
]

const insights = [
  {
    title: "Market Trends",
    value: "+15%",
    description: "Average rent increase this year",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "High Demand Areas",
    value: "8",
    description: "Neighborhoods with 90%+ occupancy",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Average Search Time",
    value: "21 days",
    description: "Down from 45 days last year",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    title: "User Satisfaction",
    value: "4.8/5",
    description: "Based on 2,500+ reviews",
    icon: Star,
    color: "text-yellow-600",
  },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Market Analytics</h1>
            <Badge variant="outline">Real-time Data</Badge>
          </div>
          <p className="text-gray-600">Comprehensive market insights and trends to help you make informed decisions</p>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {insights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                    <insight.icon className={`h-6 w-6 ${insight.color}`} />
                  </div>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{insight.title}</div>
                <div className="text-xs text-gray-600">{insight.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Neighborhood Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {marketData.map((area, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{area.area}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>₹{area.avgRent.toLocaleString()}/month</span>
                            <Badge variant={area.demand === "High" ? "default" : "secondary"} className="text-xs">
                              {area.demand} Demand
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`flex items-center gap-1 ${area.growth > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {area.growth > 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="font-medium">{area.growth}%</span>
                          </div>
                          <div className="text-xs text-gray-600">YoY Growth</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Safety Score</span>
                            <span className="font-medium">{area.safety}/5</span>
                          </div>
                          <Progress value={area.safety * 20} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Market Activity</span>
                            <span className="font-medium">{Math.round(Math.random() * 40 + 60)}%</span>
                          </div>
                          <Progress value={Math.round(Math.random() * 40 + 60)} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Price Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Price Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">1 BHK Average</span>
                    <span className="font-semibold">₹22,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">2 BHK Average</span>
                    <span className="font-semibold">₹35,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">3 BHK Average</span>
                    <span className="font-semibold">₹52,000</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">+12% from last quarter</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Most Sought Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Parking", percentage: 95 },
                    { name: "Security", percentage: 89 },
                    { name: "Gym", percentage: 76 },
                    { name: "Swimming Pool", percentage: 64 },
                    { name: "Garden", percentage: 58 },
                  ].map((amenity, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{amenity.name}</span>
                        <span className="font-medium">{amenity.percentage}%</span>
                      </div>
                      <Progress value={amenity.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Demographics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Young Professionals</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Families</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
