import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Star, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ready to Find Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  Perfect Neighborhood?
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of satisfied users who found their ideal home location using our AI-powered matching
                platform. Start your journey today and discover your dream neighborhood.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button
                  asChild
                  size="lg"
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Link href="/search">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Searching Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-10 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Link href="/preferences">
                    <Users className="mr-2 h-5 w-5" />
                    Take Preference Quiz
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">2,500+ Users</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium">87% Success Rate</span>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                No credit card required • Free to use • Instant results • Trusted by thousands
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
