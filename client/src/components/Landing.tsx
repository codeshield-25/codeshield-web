"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "./AuthContext"
import { FaGoogle } from "react-icons/fa"
import { ArrowRight, CheckCircle2, Shield, Zap, Lock, Users2, Code2, BarChart3, ArrowDown, Youtube } from "lucide-react"
import { VideoSection } from "../components/VideoSection"
import SecurityScannerExtension from "./SecurityScannerExtension"
import { FloatingAnimation } from "@/components/ui/floating-animation"
import { ScrollFade } from "@/components/ui/scroll-fade"
import { PatternBackground } from "@/components/ui/pattern-background"
import { AnimatedCard } from "../components/Animated-card"

export default function Landing() {
  const { user, signIn } = useAuth()
  const featuresRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const videoSectionRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const featureCards = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Quick Scan",
      content: "Rapidly analyze your codebase for vulnerabilities.",
      expandedContent:
        "Our advanced scanning engine quickly identifies potential security issues in your code, helping you address vulnerabilities before they become problems.",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Secure Code Generation",
      content: "Generate secure code snippets and patterns.",
      expandedContent:
        "Leverage AI-powered code generation to create secure code snippets and follow best practices, reducing the risk of introducing vulnerabilities in your codebase.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Penetration Testing",
      content: "Identify vulnerabilities with automated testing.",
      expandedContent:
        "Our automated and guided penetration testing tools simulate real-world attacks, uncovering potential weaknesses in your application's defenses.",
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Team Collaboration",
      content: "Work together seamlessly with built-in features.",
      expandedContent:
        "Enhance your team's productivity with our collaboration tools. Share findings, assign tasks, and track progress in real-time for a more efficient security workflow.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "AI Recommendations",
      content: "Get intelligent suggestions for improved security.",
      expandedContent:
        "Our AI analyzes your codebase and provides tailored recommendations to enhance your application's security posture, learning from industry best practices and your team's patterns.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Security Analytics",
      content: "Track and visualize your security metrics.",
      expandedContent:
        "Gain insights into your application's security health with comprehensive analytics. Monitor trends, track resolution times, and quantify the impact of your security efforts.",
    },
  ]

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="container px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.a href="/" className="flex items-center gap-2 font-bold text-xl" whileHover={{ scale: 1.05 }}>
                <Shield className="h-6 w-6" />
                CodeShield
              </motion.a>
              <nav className="hidden md:flex gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(featuresRef)}
                  className="text-sm font-medium hover:text-primary"
                >
                  Features
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(videoSectionRef)}
                  className="text-sm font-medium hover:text-primary"
                >
                  Demo Video
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(aboutRef)}
                  className="text-sm font-medium hover:text-primary"
                >
                  About
                </motion.button>
              </nav>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
              <Button variant="default" onClick={signIn}>
                <FaGoogle className="mr-2" />
                Sign in with Google
              </Button>
            </motion.div>
          </div>
        </motion.header>

        <main className="flex-1">
          <section className="relative min-h-[100vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>
            <FloatingAnimation className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 mx-auto max-w-[900px]"
              >
                DEVELOP FAST.
                <br />
                STAY SECURE.
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto max-w-[700px] text-lg text-gray-200 md:text-xl mb-8"
              >
                CodeShield gives you the visibility, context, and control you need to work alongside developers on
                reducing application risk.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button onClick={signIn} size="lg" className="text-lg group relative overflow-hidden w-full sm:w-auto">
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Explore Features
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                  onClick={() => scrollToSection(videoSectionRef)}
                >
                  Demo video
                  <Youtube className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-200"
              >
                {["OWASP Top 10 Coverage", "AI-Powered Analysis", "Enterprise Ready"].map((text, i) => (
                  <motion.div key={text} className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                    <CheckCircle2 className="h-5 w-5" />
                    {text}
                  </motion.div>
                ))}
              </motion.div>
            </FloatingAnimation>
          </section>

          <section ref={featuresRef} id="features" className="relative w-full py-16 sm:py-24">
            <div className="container px-4 sm:px-6 lg:px-8">
              <PatternBackground />
              <ScrollFade>
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Comprehensive Security Features
                  </h2>
                  <p className="mt-4 text-muted-foreground md:text-xl">
                    Everything you need to secure your applications and development process
                  </p>
                </div>
              </ScrollFade>
              <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featureCards.map((card, i) => (
                  <AnimatedCard key={card.title} {...card} delay={i * 0.1} />
                ))}
              </div>
            </div>
          </section>

          <section ref={videoSectionRef}>
            <ScrollFade>
              <VideoSection />
            </ScrollFade>
          </section>

          <section
            ref={aboutRef}
            id="about"
            className="relative w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24"
          >
            <div className="container px-4 sm:px-6 lg:px-8">
              <PatternBackground />
              <ScrollFade>
                <h2 className="text-3xl font-bold mb-12 sm:mb-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  About CodeShield
                </h2>
              </ScrollFade>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {[
                  {
                    title: "Comprehensive Security Scanning",
                    content:
                      "CodeShield provides state-of-the-art security scanning for your codebase, identifying vulnerabilities and potential threats before they become problems.",
                  },
                  {
                    title: "AI-Powered Recommendations",
                    content:
                      "Our advanced AI algorithms provide tailored recommendations to improve your code's security, helping you stay one step ahead of potential attackers.",
                  },
                  {
                    title: "Real-Time Collaboration",
                    content:
                      "Work seamlessly with your team in real-time, addressing security concerns and implementing fixes collaboratively.",
                  },
                  {
                    title: "Continuous Protection",
                    content:
                      "CodeShield offers continuous monitoring and protection, ensuring your code remains secure as it evolves and grows.",
                  },
                ].map((item, i) => (
                  <ScrollFade key={item.title}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.content}</p>
                    </motion.div>
                  </ScrollFade>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t py-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-sm text-muted-foreground">
              © 2025 CodeShield. All rights reserved.
            </motion.div>
            <nav className="flex gap-4 text-sm">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    )
  }

  return <SecurityScannerExtension />
}

