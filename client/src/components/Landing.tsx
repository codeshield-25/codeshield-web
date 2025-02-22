"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "./AuthContext"
import { FaGoogle } from "react-icons/fa"
import { ArrowRight, CheckCircle2, Shield, Zap, Lock, Users2, Code2, BarChart3, Youtube } from "lucide-react"
import { EnhancedVideoSection } from "../components/EnhancedVideoSection"
import SecurityScannerExtension from "./SecurityScannerExtension"
import { FloatingAnimation } from "@/components/ui/floating-animation"
import { ScrollFade } from "@/components/ui/scroll-fade"
import { PatternBackground } from "@/components/ui/pattern-background"
import { HeroSection3D } from "../components/HeroSection3D"
import { FeatureCard } from "../components/FeatureCard"

export default function Landing() {
  const { user, signIn } = useAuth()
  const featuresRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const videoSectionRef = useRef<HTMLElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
      examples: [
        "Detect SQL injection vulnerabilities in real-time",
        "Identify insecure dependency versions",
        "Flag potential XSS vulnerabilities in React components",
      ],
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Secure Code Generation",
      content: "Generate secure code snippets and patterns.",
      expandedContent:
        "Leverage AI-powered code generation to create secure code snippets and follow best practices, reducing the risk of introducing vulnerabilities in your codebase.",
      examples: [
        "Generate secure React components with input validation",
        "Create secure API endpoints with authentication",
        "Automate the creation of secure configuration files",
      ],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Penetration Testing",
      content: "Identify vulnerabilities with automated testing.",
      expandedContent:
        "Our automated and guided penetration testing tools simulate real-world attacks, uncovering potential weaknesses in your application's defenses.",
      examples: [
        "Simulate common web application attacks",
        "Test for vulnerabilities in your network infrastructure",
        "Automate security audits of your cloud environment",
      ],
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Team Collaboration",
      content: "Work together seamlessly with built-in features.",
      expandedContent:
        "Enhance your team's productivity with our collaboration tools. Share findings, assign tasks, and track progress in real-time for a more efficient security workflow.",
      examples: [
        "Share security findings with your team",
        "Assign tasks to developers for remediation",
        "Track progress on security fixes in real-time",
      ],
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "AI Recommendations",
      content: "Get intelligent suggestions for improved security.",
      expandedContent:
        "Our AI analyzes your codebase and provides tailored recommendations to enhance your application's security posture, learning from industry best practices and your team's patterns.",
      examples: [
        "Suggest secure coding practices based on your codebase",
        "Recommend security tools and configurations",
        "Identify potential security risks based on your team's patterns",
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Security Analytics",
      content: "Track and visualize your security metrics.",
      expandedContent:
        "Gain insights into your application's security health with comprehensive analytics. Monitor trends, track resolution times, and quantify the impact of your security efforts.",
      examples: [
        "Track the number of vulnerabilities in your codebase",
        "Monitor the time it takes to fix security issues",
        "Quantify the impact of your security efforts on your business",
      ],
    },
  ]

  const missionItems = [
    {
      title: "Continuous Security Monitoring",
      content:
        "Our platform continuously monitors your codebase for security vulnerabilities, providing real-time alerts and detailed remediation steps.",
    },
    {
      title: "Developer-First Security",
      content:
        "Integrate security directly into your development workflow with IDE plugins, CI/CD integration, and automated code reviews.",
    },
    {
      title: "Compliance & Reporting",
      content:
        "Generate comprehensive security reports and maintain compliance with industry standards like OWASP Top 10, HIPAA, and SOC 2.",
    },
    {
      title: "Team Collaboration",
      content:
        "Enable seamless collaboration between development and security teams with shared dashboards, ticket integration, and automated notifications.",
    },
  ]

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60"
        >
          <div className="container px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.a
                href="/"
                className="flex items-center gap-2 font-bold text-xl text-emerald-400"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-6 w-6" />
                CodeShield
              </motion.a>
              <nav className="hidden md:flex gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(featuresRef)}
                  className="text-sm font-medium hover:text-emerald-400"
                >
                  Features
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(videoSectionRef)}
                  className="text-sm font-medium hover:text-emerald-400"
                >
                  Demo Video
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(aboutRef)}
                  className="text-sm font-medium hover:text-emerald-400"
                >
                  About
                </motion.button>
              </nav>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={signIn}
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-gray-900"
              >
                <FaGoogle className="mr-2" />
                Sign in with Google
              </Button>
            </motion.div>
          </div>
        </motion.header>

        <main className="flex-1 relative">
          {/* <NetworkGlobe /> */}
          <HeroSection3D />
          <section className="relative min-h-[100vh] flex items-center overflow-hidden">
            <motion.div
              style={{ opacity }}
              className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900"
            >
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </motion.div>
            <FloatingAnimation className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-emerald-400 mb-6 mx-auto max-w-[900px]"
              >
                SECURE THE DIGITAL FRONTIER
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto max-w-[700px] text-lg text-gray-300 md:text-xl mb-8"
              >
                CodeShield empowers you with unparalleled visibility, context, and control to safeguard the world's
                digital infrastructure.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  onClick={signIn}
                  size="lg"
                  className="text-lg group relative overflow-hidden w-full sm:w-auto bg-emerald-500 text-gray-900 hover:bg-emerald-600"
                >
                  <span className="relative z-10">Join the Shield</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-gray-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg bg-gray-800/50 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 w-full sm:w-auto"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Explore Arsenal
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg bg-gray-800/50 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 w-full sm:w-auto"
                  onClick={() => scrollToSection(videoSectionRef)}
                >
                  Watch Mission Brief
                  <Youtube className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-300"
              >
                {["OWASP Top 10 Fortification", "AI-Powered Threat Analysis", "Enterprise-Grade Defense"].map(
                  (text, i) => (
                    <motion.div key={text} className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      {text}
                    </motion.div>
                  ),
                )}
              </motion.div>
            </FloatingAnimation>
          </section>

          <section ref={featuresRef} id="features" className="relative w-full py-16 sm:py-24">
            <div className="container px-4 sm:px-6 lg:px-8">
              <PatternBackground className="text-emerald-500/10" />
              <ScrollFade>
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-emerald-400 to-gray-500 bg-clip-text text-transparent">
                    Cybersecurity Arsenal
                  </h2>
                  <p className="mt-4 text-gray-400 md:text-xl">Cutting-edge tools to fortify your digital defenses</p>
                </div>
              </ScrollFade>
              <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featureCards.map((card, i) => (
                  <FeatureCard
                    key={card.title}
                    {...card}
                    delay={i * 0.1}
                    isActive={activeFeature === i}
                    onClick={() => setActiveFeature(i)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section ref={videoSectionRef}>
            <ScrollFade>
              <EnhancedVideoSection />
            </ScrollFade>
          </section>

          <section
            ref={aboutRef}
            id="about"
            className="relative w-full bg-gradient-to-b from-gray-900 to-gray-800 py-16 sm:py-24"
          >
            <div className="container px-4 sm:px-6 lg:px-8">
              <PatternBackground className="text-emerald-500/10" />
              <ScrollFade>
                <h2 className="text-3xl font-bold mb-12 sm:mb-16 text-center bg-gradient-to-r from-emerald-400 to-gray-500 bg-clip-text text-transparent">
                  Enterprise-Grade Security
                </h2>
              </ScrollFade>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {missionItems.map((item, i) => (
                  <ScrollFade key={item.title}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-emerald-500/30 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-4 text-emerald-400">{item.title}</h3>
                      <p className="text-gray-300">{item.content}</p>
                    </motion.div>
                  </ScrollFade>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-gray-800 py-8 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-sm text-gray-400">
              © 2025 CodeShield. Safeguarding the digital realm.
            </motion.div>
            <nav className="flex gap-4 text-sm">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
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

