"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2 } from "lucide-react"

interface Property {
  id: number
  title: string
  location: string
  price: number
  coordinates: [number, number]
  matchScore: number
  bedrooms: number
  type: string
}

interface PropertyMapProps {
  properties: Property[]
  loading: boolean
}

export function PropertyMap({ properties, loading }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = (await import("leaflet")).default

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      // Initialize map centered on Bangalore
      const map = L.map(mapRef.current).setView([12.9716, 77.5946], 11)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map)

      mapInstanceRef.current = map

      // Add property markers
      properties.forEach((property) => {
        const marker = L.marker(property.coordinates).addTo(map)

        const popupContent = `
          <div class="p-2 min-w-[200px]">
            <h3 class="font-semibold text-sm mb-1">${property.title}</h3>
            <p class="text-xs text-gray-600 mb-2">${property.location}</p>
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-green-600">₹${property.price.toLocaleString()}/mo</span>
              <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${property.matchScore}% match</span>
            </div>
            <p class="text-xs text-gray-600">${property.bedrooms} BHK • ${property.type}</p>
          </div>
        `

        marker.bindPopup(popupContent)
      })

      // Fit map to show all markers
      if (properties.length > 0) {
        const group = new L.featureGroup(properties.map((p) => L.marker(p.coordinates)))
        map.fitBounds(group.getBounds().pad(0.1))
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [properties])

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-[1000]">
        <Badge variant="secondary" className="bg-white/90 backdrop-blur">
          <MapPin className="h-3 w-3 mr-1" />
          {properties.length} properties found
        </Badge>
      </div>
      <div ref={mapRef} className="h-[600px] w-full rounded-lg" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
    </div>
  )
}
