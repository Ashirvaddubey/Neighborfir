"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export function ProfileNavigation() {
  const router = useRouter()

  const handleProfileClick = () => {
    console.log("Navigating to profile...") // Debug log
    router.push("/profile")
  }

  return (
    <Button
      variant="ghost"
      onClick={handleProfileClick}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium group"
    >
      <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
      Profile
    </Button>
  )
}
