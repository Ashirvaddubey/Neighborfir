"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Home, DollarSign, MapPin, Users, Car, Heart, ArrowRight, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"

const steps = [
  { id: "basic", title: "Basic Info", icon: Home },
  { id: "budget", title: "Budget", icon: DollarSign },
  { id: "location", title: "Location", icon: MapPin },
  { id: "lifestyle", title: "Lifestyle", icon: Users },
  { id: "commute", title: "Commute", icon: Car },
  { id: "priorities", title: "Priorities", icon: Heart },
]

export default function PreferencesPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState({
    propertyType: "",
    bedrooms: "",
    budget: [25000, 50000],
    preferredAreas: [],
    lifestyle: [],
    commuteMode: "",
    workLocation: "",
    maxCommuteTime: [30],
    priorities: [],
  })

  const updatePreference = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete preferences and save to user profile
      if (authService.getCurrentUser()) {
        await authService.updatePreferences(preferences)
      }
      router.push("/search?preferences=set")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user?.preferences) {
      setPreferences(user.preferences)
    }
  }, [])

  // Get current step icon component
  const CurrentStepIcon = steps[currentStep].icon

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us Your Preferences</h1>
          <p className="text-gray-600">Help us find your perfect neighborhood by sharing your preferences</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index < currentStep ? <CheckCircle className="h-5 w-5" /> : <StepIcon className="h-4 w-4" />}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CurrentStepIcon className="h-5 w-5" />
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step Content */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What type of property are you looking for?</Label>
                  <RadioGroup
                    value={preferences.propertyType}
                    onValueChange={(value) => updatePreference("propertyType", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apartment" id="apartment" />
                      <Label htmlFor="apartment">Apartment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="villa" id="villa" />
                      <Label htmlFor="villa">Villa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="studio" id="studio" />
                      <Label htmlFor="studio">Studio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="house" id="house" />
                      <Label htmlFor="house">Independent House</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>How many bedrooms do you need?</Label>
                  <RadioGroup
                    value={preferences.bedrooms}
                    onValueChange={(value) => updatePreference("bedrooms", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="1bhk" />
                      <Label htmlFor="1bhk">1 BHK</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="2bhk" />
                      <Label htmlFor="2bhk">2 BHK</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="3bhk" />
                      <Label htmlFor="3bhk">3 BHK</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4+" id="4bhk" />
                      <Label htmlFor="4bhk">4+ BHK</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What's your monthly budget range?</Label>
                  <Slider
                    value={preferences.budget}
                    onValueChange={(value) => updatePreference("budget", value)}
                    max={100000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{preferences.budget[0].toLocaleString()}</span>
                    <span>₹{preferences.budget[1].toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Budget Recommendation</h4>
                  <p className="text-sm text-blue-700">
                    Based on your selection, we recommend allocating 25-30% of your income for rent. This ensures
                    comfortable living while maintaining financial flexibility.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Which areas are you interested in? (Select multiple)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Koramangala",
                      "Indiranagar",
                      "Whitefield",
                      "Electronic City",
                      "HSR Layout",
                      "Marathahalli",
                      "Jayanagar",
                      "Rajajinagar",
                      "Banashankari",
                      "JP Nagar",
                      "Bellandur",
                      "Sarjapur",
                    ].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={preferences.preferredAreas.includes(area)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updatePreference("preferredAreas", [...preferences.preferredAreas, area])
                            } else {
                              updatePreference(
                                "preferredAreas",
                                preferences.preferredAreas.filter((a: string) => a !== area),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={area} className="text-sm">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Or enter a specific location</Label>
                  <Input placeholder="Enter neighborhood, landmark, or area..." />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What describes your lifestyle? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Young Professional",
                      "Family with Kids",
                      "Student",
                      "Senior Citizen",
                      "Work from Home",
                      "Frequent Traveler",
                      "Fitness Enthusiast",
                      "Social Person",
                      "Pet Owner",
                      "Vegetarian",
                      "Night Owl",
                      "Early Riser",
                    ].map((lifestyle) => (
                      <div key={lifestyle} className="flex items-center space-x-2">
                        <Checkbox
                          id={lifestyle}
                          checked={preferences.lifestyle.includes(lifestyle)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updatePreference("lifestyle", [...preferences.lifestyle, lifestyle])
                            } else {
                              updatePreference(
                                "lifestyle",
                                preferences.lifestyle.filter((l: string) => l !== lifestyle),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={lifestyle} className="text-sm">
                          {lifestyle}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Where do you work?</Label>
                  <Input
                    placeholder="Enter your work location..."
                    value={preferences.workLocation}
                    onChange={(e) => updatePreference("workLocation", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>How do you prefer to commute?</Label>
                  <RadioGroup
                    value={preferences.commuteMode}
                    onValueChange={(value) => updatePreference("commuteMode", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="car" id="car" />
                      <Label htmlFor="car">Personal Car</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public Transport</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bike" id="bike" />
                      <Label htmlFor="bike">Two Wheeler</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="walk" id="walk" />
                      <Label htmlFor="walk">Walking Distance</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Maximum acceptable commute time (minutes)</Label>
                  <Slider
                    value={preferences.maxCommuteTime}
                    onValueChange={(value) => updatePreference("maxCommuteTime", value)}
                    max={120}
                    min={15}
                    step={15}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600">{preferences.maxCommuteTime[0]} minutes</div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>What are your top priorities? (Rank by importance)</Label>
                  <div className="space-y-3">
                    {[
                      "Low Rent/Budget Friendly",
                      "Safety & Security",
                      "Good Connectivity",
                      "Shopping & Entertainment",
                      "Schools & Education",
                      "Healthcare Facilities",
                      "Parks & Recreation",
                      "Restaurants & Food",
                      "Peaceful Environment",
                      "Modern Amenities",
                    ].map((priority, index) => (
                      <div key={priority} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{priority}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Priority {index + 1}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Almost Done!</h4>
                  <p className="text-sm text-green-700">
                    Based on your preferences, we'll find neighborhoods that match your lifestyle and provide
                    personalized recommendations.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button onClick={nextStep}>
            {currentStep === steps.length - 1 ? (
              <>
                Find My Matches
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
