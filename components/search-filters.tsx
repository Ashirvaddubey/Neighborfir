"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const amenities = [
  { id: "gym", label: "Gym" },
  { id: "parking", label: "Parking" },
  { id: "security", label: "24/7 Security" },
  { id: "garden", label: "Garden" },
  { id: "pool", label: "Swimming Pool" },
  { id: "elevator", label: "Elevator" },
  { id: "balcony", label: "Balcony" },
  { id: "furnished", label: "Furnished" },
]

export function SearchFilters({ filters, onFiltersChange, searchQuery, onSearchChange }: SearchFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleAmenity = (amenityId: string) => {
    const currentAmenities = filters.amenities || []
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((id: string) => id !== amenityId)
      : [...currentAmenities, amenityId]
    updateFilter("amenities", newAmenities)
  }

  const clearFilters = () => {
    onFiltersChange({
      budget: [0, 50000],
      propertyType: "all",
      bedrooms: "any",
      location: "",
      amenities: [],
    })
    onSearchChange("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="space-y-2">
            <Label>Search Location</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Enter city or neighborhood..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-3">
            <Label>Budget Range (₹/month)</Label>
            <Slider
              value={filters.budget}
              onValueChange={(value) => updateFilter("budget", value)}
              max={100000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{filters.budget[0].toLocaleString()}</span>
              <span>₹{filters.budget[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="house">Independent House</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <Label>Bedrooms</Label>
            <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={filters.amenities?.includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  <Label htmlFor={amenity.id} className="text-sm">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(filters.amenities?.length > 0 || searchQuery) && (
            <div className="space-y-2">
              <Label>Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {searchQuery}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
                  </Badge>
                )}
                {filters.amenities?.map((amenityId: string) => {
                  const amenity = amenities.find((a) => a.id === amenityId)
                  return amenity ? (
                    <Badge key={amenityId} variant="secondary" className="flex items-center gap-1">
                      {amenity.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleAmenity(amenityId)} />
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          )}

          <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
            Clear All Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
