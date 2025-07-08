import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile - NeighborFit",
  description: "Manage your profile, preferences, and saved properties",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
