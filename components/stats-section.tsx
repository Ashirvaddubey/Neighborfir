import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Clock, Star, Sparkles } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Daily Active Users",
    description: "Growing community of home seekers",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Clock,
    value: "12 min",
    label: "Average Session",
    description: "Highly engaged user experience",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    icon: TrendingUp,
    value: "78%",
    label: "Return Rate",
    description: "Users come back for more insights",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Star,
    value: "23%",
    label: "Conversion Rate",
    description: "From search to successful match",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
  },
]

export function StatsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-white to-indigo-50/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Trusted Platform</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Thousands
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform delivers exceptional results with industry-leading performance metrics and user satisfaction
            rates that speak for themselves.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className={`p-8 text-center bg-gradient-to-br ${stat.bgGradient} relative`}>
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
