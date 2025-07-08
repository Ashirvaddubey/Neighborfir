import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Map, BarChart3, Filter, User, Zap, Shield, Clock, Target, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description:
      "Advanced machine learning algorithms analyze your preferences and match you with perfect neighborhoods",
    badge: "Core Feature",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Map,
    title: "Interactive Mapping",
    description: "Explore neighborhoods with live property data, heatmaps, and detailed boundary visualization",
    badge: "Popular",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Market trends, price predictions, and investment opportunity scoring updated in real-time",
    badge: "Pro Feature",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Natural language search, voice commands, and intelligent filter combinations",
    badge: "Enhanced",
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: User,
    title: "Personal Profiles",
    description: "Customized user profiles with preference tracking and personalized recommendations",
    badge: "Personalized",
    gradient: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-200ms response times with optimized data processing and smart caching",
    badge: "Performance",
    gradient: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
]

const stats = [
  { label: "Match Accuracy", value: "87.3%", icon: Target, color: "from-blue-500 to-cyan-500" },
  { label: "Search Time Reduction", value: "65%", icon: Clock, color: "from-green-500 to-emerald-500" },
  { label: "Data Accuracy", value: "94.2%", icon: Shield, color: "from-purple-500 to-pink-500" },
  { label: "User Satisfaction", value: "89%", icon: User, color: "from-orange-500 to-red-500" },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Perfect Matches
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform combines cutting-edge technology with deep market insights to deliver
            unparalleled neighborhood matching accuracy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium"
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
