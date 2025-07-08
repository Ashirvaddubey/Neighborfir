import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Brain, MapPin, Heart } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Tell Us Your Preferences",
    description: "Share your lifestyle needs, budget, and priorities through our intelligent questionnaire",
    details: ["Budget range & property type", "Commute requirements", "Lifestyle preferences", "Family needs"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI Analysis & Matching",
    description: "Our algorithm analyzes 15+ factors and processes real-time data from multiple sources",
    details: ["Property data aggregation", "Neighborhood scoring", "Preference weighting", "Match calculation"],
    color: "from-purple-500 to-pink-500",
  },
  {
    step: 3,
    icon: MapPin,
    title: "Explore Recommendations",
    description: "Browse personalized matches with interactive maps, detailed insights, and comparisons",
    details: [
      "Interactive neighborhood maps",
      "Property visualizations",
      "Market trend analysis",
      "Detailed comparisons",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    step: 4,
    icon: Heart,
    title: "Find Your Perfect Match",
    description: "Save favorites, get alerts, and make informed decisions with confidence",
    details: ["Save preferred neighborhoods", "Price change alerts", "Market insights", "Decision support"],
    color: "from-orange-500 to-red-500",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Four Simple Steps to Your Dream Neighborhood</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process combines advanced AI with intuitive design to make neighborhood discovery effortless
            and accurate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary">Step {step.step}</Badge>
                      <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
