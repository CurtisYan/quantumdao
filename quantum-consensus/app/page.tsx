"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EnhancedHeroAnimation from "@/components/enhanced-hero-animation"
import FounderCard from "@/components/founder-card"
import ContactModal from "@/components/contact-modal"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const aboutRef = useRef<HTMLElement>(null)
  const techRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState<string>("")
  const [isScrolling, setIsScrolling] = useState(false)

  // 监听滚动，更新当前活动的导航项
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return

      const scrollPosition = window.scrollY + 100

      if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection("contact")
      } else if (techRef.current && scrollPosition >= techRef.current.offsetTop) {
        setActiveSection("tech")
      } else if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop) {
        setActiveSection("about")
      } else {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolling])

  // 平滑滚动到指定区域
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    setIsScrolling(true)
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      })

      // 滚动完成后重置状态
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 overflow-hidden">
      {/* 导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/20">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center">
              <Image src="/logo.png" alt="量子共识" width={48} height={48} className="w-12 h-12" />
            </div>
            <span className="font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
              QUANTUM CONSENSUS
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className={`text-sm font-medium transition-colors relative ${activeSection === "about" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
            >
              {t("nav.about")}
              {activeSection === "about" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection(techRef)}
              className={`text-sm font-medium transition-colors relative ${activeSection === "tech" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
            >
              {t("nav.tech")}
              {activeSection === "tech" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className={`text-sm font-medium transition-colors relative ${activeSection === "contact" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}
            >
              {t("nav.contact")}
              {activeSection === "contact" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></span>
              )}
            </button>
            <LanguageSwitcher />
          </nav>
          <Button
            variant="ghost"
            className="hidden md:flex border-none hover:bg-primary/10 text-foreground/80 hover:text-primary"
            onClick={() => setIsContactModalOpen(true)}
          >
            {t("nav.join")}
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">打开菜单</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="pt-16">
        {/* 英雄区域 */}
        <section className="relative overflow-hidden py-24 md:py-36 lg:py-48">
          <div className="absolute inset-0 z-0">
            <EnhancedHeroAnimation />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-2">
                  {t("hero.title")}
                </h1>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 leading-tight">
                  {t("hero.subtitle")}
                </h2>
                <p className="text-xl md:text-2xl text-foreground/80">{t("hero.description")}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg shadow-primary/20"
                  onClick={() => scrollToSection(techRef)}
                >
                  {t("hero.learnMore")}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* 关于我们 */}
        <section ref={aboutRef} id="about" className="py-20 md:py-28 bg-gradient-to-b from-background/90 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  {t("about.title")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">{t("about.heading")}</h2>
                <p className="text-foreground/70">{t("about.p1")}</p>
                <p className="text-foreground/70">{t("about.p2")}</p>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-lg blur-xl opacity-30"></div>
                <Card className="relative bg-background/50 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-6">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="m16 12-4 4-4-4M12 8v7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{t("about.innovation")}</h3>
                          <p className="text-sm text-foreground/70">{t("about.innovationDesc")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                          >
                            <path d="M12.5 2h-1V1h1zm9.5 11v1h1v-1zm-9.5 9h-1v1h1zM2 13v-1H1v1zm5.3-6.7.7.7.7-.7-.7-.7zm8.7 8.7-.7-.7-.7.7.7.7z" />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 8v1" />
                            <path d="M12 15v1" />
                            <path d="M16 12h-1" />
                            <path d="M9 12H8" />
                            <path d="m15 9-1 1" />
                            <path d="m10 14-1 1" />
                            <path d="m9 9 1 1" />
                            <path d="m14 14 1 1" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{t("about.quantum")}</h3>
                          <p className="text-sm text-foreground/70">{t("about.quantumDesc")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m7 10 3 3 7-7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{t("about.dao")}</h3>
                          <p className="text-sm text-foreground/70">{t("about.daoDesc")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                          >
                            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{t("about.ecosystem")}</h3>
                          <p className="text-sm text-foreground/70">{t("about.ecosystemDesc")}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 创始团队 */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                {t("founders.title")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("founders.heading")}</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">{t("founders.description")}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <FounderCard
                name={t("founders.curtis.name")}
                title={t("founders.curtis.title")}
                description={t("founders.curtis.description")}
                imagePath="/curtis-yan.jpg"
                style="tech"
              />
              <FounderCard
                name={t("founders.weiye.name")}
                title={t("founders.weiye.title")}
                description={t("founders.weiye.description")}
                imagePath="/weiye-liang.jpg"
                style="metallic"
              />
            </div>
          </div>
        </section>

        {/* 核心技术 */}
        <section ref={techRef} id="technology" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                {t("tech.title")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("tech.heading")}</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">{t("tech.description")}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5">
                <div className="p-1">
                  <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-t-sm"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                    {t("tech.consensus.title")}
                  </h3>
                  <p className="text-foreground/70 mb-4">{t("tech.consensus.description")}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">{t("tech.consensus.item1")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span className="text-sm">{t("tech.consensus.item2")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">{t("tech.consensus.item3")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                <div className="p-1">
                  <div className="h-2 w-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-t-sm"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                    {t("tech.dao.title")}
                  </h3>
                  <p className="text-foreground/70 mb-4">{t("tech.dao.description")}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span className="text-sm">{t("tech.dao.item1")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">{t("tech.dao.item2")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span className="text-sm">{t("tech.dao.item3")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5">
                <div className="p-1">
                  <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-t-sm"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                    {t("tech.interop.title")}
                  </h3>
                  <p className="text-foreground/70 mb-4">{t("tech.interop.description")}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">{t("tech.interop.item1")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span className="text-sm">{t("tech.interop.item2")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">{t("tech.interop.item3")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                <div className="p-1">
                  <div className="h-2 w-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-t-sm"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                    {t("tech.security.title")}
                  </h3>
                  <p className="text-foreground/70 mb-4">{t("tech.security.description")}</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span className="text-sm">{t("tech.security.item1")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                      <span className="text-sm">{t("tech.security.item2")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span className="text-sm">{t("tech.security.item3")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section
          ref={contactRef}
          id="contact"
          className="py-20 md:py-28 bg-gradient-to-b from-background/90 to-background"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                  {t("contact.title")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t("contact.heading")}</h2>
                <p className="text-foreground/70 max-w-2xl mx-auto">{t("contact.description")}</p>
              </div>

              <Card className="bg-background/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-primary"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{t("contact.address")}</h3>
                          <p className="text-sm text-foreground/70">{t("contact.addressValue")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-primary"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{t("contact.email")}</h3>
                          <p className="text-sm text-foreground/70">realthat@foxmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-primary"
                          >
                            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">{t("contact.wechat")}</h3>
                          <p className="text-sm text-foreground/70">{t("contact.wechatScan")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48 bg-white p-2 rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-lg blur-sm"></div>
                        <div className="relative h-full w-full flex items-center justify-center bg-white rounded-md">
                          <Image src="/qrcode.png" alt="微信二维码" width={160} height={160} className="rounded-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg shadow-primary/20"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      {t("contact.join")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image src="/logo.png" alt="量子共识" width={32} height={32} className="h-8 w-8" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">{t("footer.rights")}</p>
          </div>
          <div className="flex gap-4">
            <button className="text-sm text-muted-foreground hover:text-foreground">{t("footer.privacy")}</button>
            <button className="text-sm text-muted-foreground hover:text-foreground">{t("footer.terms")}</button>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}

