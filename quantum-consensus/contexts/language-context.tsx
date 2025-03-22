"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "zh" | "en"

// 添加翻译条目类型定义
type TranslationEntry = {
  [key: string]: string;
}

// 添加翻译对象类型定义
type TranslationsType = {
  [key in Language]: TranslationEntry;
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: TranslationsType = {
  zh: {
    // 导航
    "nav.about": "关于我们",
    "nav.tech": "核心技术",
    "nav.contact": "联系我们",
    "nav.join": "加入社区",

    // 首页
    "hero.title": "量子共识",
    "hero.subtitle": "引领Web3进入量子时代",
    "hero.description": "构建安全、高效、去中心化的未来互联网基础设施",
    "hero.learnMore": "了解更多",

    // 关于我们
    "about.title": "关于我们",
    "about.heading": "量子共识 (Quantum Consensus)",
    "about.p1":
      "量子共识是一家总部位于广州的Web3机构，致力于将区块链技术与量子计算前沿成果深度融合，开发新一代量子抗性共识机制。我们的使命是通过科技创新，构建安全、透明、高效的去中心化基础设施，为全球Web3生态系统赋能。",
    "about.p2":
      "在区块链技术迅猛发展的同时，全球科技界逐步关注量子计算对安全性和共识机制的影响。量子共识汇集了来自密码学、分布式系统、量子信息学等领域的专家，立志攻克抗量子安全的技术难题，并推动DAO治理模式在全球范围内的应用。",
    "about.innovation": "创新研发",
    "about.innovationDesc": "前沿技术探索与应用",
    "about.quantum": "量子安全",
    "about.quantumDesc": "抗量子攻击的区块链技术",
    "about.dao": "去中心化治理",
    "about.daoDesc": "透明高效的DAO治理框架",
    "about.ecosystem": "生态建设",
    "about.ecosystemDesc": "构建多元化Web3生态系统",

    // 创始团队
    "founders.title": "创始团队",
    "founders.heading": "创办人介绍",
    "founders.description": "我们的创始团队拥有丰富的区块链技术和密码学经验，致力于推动量子安全区块链技术的发展",
    "founders.curtis.name": "严琪博 (Curtis Yan)",
    "founders.curtis.title": "联合创始人",
    "founders.curtis.description":
      "严琪博，量子共识联合创始人，软件工程学博士，专注于区块链共识算法与分布式系统研究。曾在国际顶级科技公司担任区块链架构师，致力于开发抗量子攻击的去中心化协议。",
    "founders.weiye.name": "梁伟页 (Weiye Liang)",
    "founders.weiye.title": "联合创始人",
    "founders.weiye.description":
      "梁伟页，量子共识联合创始人，密码学与金融科技专家，拥有丰富的Web3创业经验。曾在多家头部区块链项目担任技术顾问，对DAO治理和去中心化金融（DeFi）有深刻理解，推动量子安全技术落地。",

    // 核心技术
    "tech.title": "核心技术",
    "tech.heading": "前沿技术解决方案",
    "tech.description": "我们致力于开发抗量子攻击的区块链技术，为Web3生态系统提供安全、高效的基础设施",
    "tech.consensus.title": "量子抗性共识算法",
    "tech.consensus.description":
      "通过最新的量子信息理论，设计出一套能有效抵御量子计算威胁的区块链共识机制，确保系统长期安全运行。",
    "tech.consensus.item1": "后量子密码学应用",
    "tech.consensus.item2": "量子随机数生成",
    "tech.consensus.item3": "抗量子签名方案",
    "tech.dao.title": "DAO治理框架",
    "tech.dao.description":
      "开发透明、高效的去中心化治理系统，实现社区决策的民主化、公开化与高效执行，确保每个参与者的权利与利益得到平衡。",
    "tech.dao.item1": "去中心化投票机制",
    "tech.dao.item2": "提案管理系统",
    "tech.dao.item3": "社区激励模型",
    "tech.interop.title": "跨链互操作性",
    "tech.interop.description":
      "提供跨链协议，支持不同区块链平台之间的数据与资产互联互通，助力构建一个多元化且无缝连接的Web3生态系统。",
    "tech.interop.item1": "跨链消息传递",
    "tech.interop.item2": "资产桥接协议",
    "tech.interop.item3": "多链身份验证",
    "tech.security.title": "智能合约安全保障",
    "tech.security.description":
      "采用抗量子攻击技术，强化智能合约安全，保障区块链应用在未来技术变革中的稳定性和可靠性。",
    "tech.security.item1": "形式化验证",
    "tech.security.item2": "安全审计工具",
    "tech.security.item3": "漏洞检测系统",

    // 联系我们
    "contact.title": "联系我们",
    "contact.heading": "与我们取得联系",
    "contact.description": "无论您是对我们的技术感兴趣，还是希望探讨合作机会，我们都期待与您交流",
    "contact.address": "总部地址",
    "contact.addressValue": "中国·广州市",
    "contact.email": "电子邮箱",
    "contact.wechat": "微信",
    "contact.wechatScan": "扫描二维码添加",
    "contact.join": "加入社区",

    // 弹窗
    "modal.title": "加入量子共识社区",
    "modal.description": "扫描下方二维码或通过邮箱联系我们",
    "modal.wechatScan": "微信扫码添加",

    // 页脚
    "footer.rights": "© 2025 量子共识 (Quantum Consensus). All rights reserved.",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
  },
  en: {
    // Navigation
    "nav.about": "About Us",
    "nav.tech": "Technology",
    "nav.contact": "Contact",
    "nav.join": "Join Community",

    // Hero
    "hero.title": "Quantum Consensus",
    "hero.subtitle": "Leading Web3 into the Quantum Era",
    "hero.description": "Building secure, efficient, and decentralized infrastructure for the future internet",
    "hero.learnMore": "Learn More",

    // About
    "about.title": "About Us",
    "about.heading": "Quantum Consensus",
    "about.p1":
      "Quantum Consensus is a Web3 organization based in Guangzhou, dedicated to integrating blockchain technology with quantum computing advancements to develop next-generation quantum-resistant consensus mechanisms. Our mission is to build secure, transparent, and efficient decentralized infrastructure for the global Web3 ecosystem.",
    "about.p2":
      "As blockchain technology rapidly evolves, the global tech community is increasingly focused on how quantum computing affects security and consensus mechanisms. Quantum Consensus brings together experts from cryptography, distributed systems, and quantum information science to tackle quantum security challenges and promote DAO governance models worldwide.",
    "about.innovation": "Innovation",
    "about.innovationDesc": "Frontier technology exploration",
    "about.quantum": "Quantum Security",
    "about.quantumDesc": "Quantum-resistant blockchain",
    "about.dao": "Decentralized Governance",
    "about.daoDesc": "Transparent DAO frameworks",
    "about.ecosystem": "Ecosystem Building",
    "about.ecosystemDesc": "Diverse Web3 ecosystem",

    // Founders
    "founders.title": "Founding Team",
    "founders.heading": "Our Founders",
    "founders.description":
      "Our founding team has extensive experience in blockchain technology and cryptography, dedicated to advancing quantum-secure blockchain technology",
    "founders.curtis.name": "Curtis Yan",
    "founders.curtis.title": "Co-founder",
    "founders.curtis.description":
      "Curtis Yan, co-founder of Quantum Consensus, holds a Ph.D. in Software Engineering with a focus on blockchain consensus algorithms and distributed systems. He previously served as a blockchain architect at leading tech companies, dedicated to developing quantum-resistant decentralized protocols.",
    "founders.weiye.name": "Weiye Liang",
    "founders.weiye.title": "Co-founder",
    "founders.weiye.description":
      "Weiye Liang, co-founder of Quantum Consensus, is an expert in cryptography and fintech with extensive Web3 entrepreneurial experience. He has served as a technical advisor for multiple leading blockchain projects and has a deep understanding of DAO governance and DeFi, driving the implementation of quantum-secure technology.",

    // Technology
    "tech.title": "Core Technology",
    "tech.heading": "Cutting-Edge Solutions",
    "tech.description":
      "We are committed to developing quantum-resistant blockchain technology to provide secure and efficient infrastructure for the Web3 ecosystem",
    "tech.consensus.title": "Quantum-Resistant Consensus",
    "tech.consensus.description":
      "Using the latest quantum information theory to design blockchain consensus mechanisms that effectively resist quantum computing threats, ensuring long-term system security.",
    "tech.consensus.item1": "Post-quantum cryptography",
    "tech.consensus.item2": "Quantum random number generation",
    "tech.consensus.item3": "Quantum-resistant signatures",
    "tech.dao.title": "DAO Governance Framework",
    "tech.dao.description":
      "Developing transparent and efficient decentralized governance systems that democratize community decision-making while ensuring balanced rights and interests for all participants.",
    "tech.dao.item1": "Decentralized voting mechanisms",
    "tech.dao.item2": "Proposal management systems",
    "tech.dao.item3": "Community incentive models",
    "tech.interop.title": "Cross-Chain Interoperability",
    "tech.interop.description":
      "Providing cross-chain protocols that support data and asset connectivity between different blockchain platforms, helping to build a diverse and seamlessly connected Web3 ecosystem.",
    "tech.interop.item1": "Cross-chain messaging",
    "tech.interop.item2": "Asset bridge protocols",
    "tech.interop.item3": "Multi-chain identity verification",
    "tech.security.title": "Smart Contract Security",
    "tech.security.description":
      "Employing quantum-resistant techniques to strengthen smart contract security, ensuring the stability and reliability of blockchain applications in future technological changes.",
    "tech.security.item1": "Formal verification",
    "tech.security.item2": "Security audit tools",
    "tech.security.item3": "Vulnerability detection systems",

    // Contact
    "contact.title": "Contact Us",
    "contact.heading": "Get in Touch",
    "contact.description":
      "Whether you're interested in our technology or looking to explore collaboration opportunities, we look forward to connecting with you",
    "contact.address": "Headquarters",
    "contact.addressValue": "Guangzhou, China",
    "contact.email": "Email",
    "contact.wechat": "WeChat",
    "contact.wechatScan": "Scan QR code to add",
    "contact.join": "Join Community",

    // Modal
    "modal.title": "Join Quantum Consensus Community",
    "modal.description": "Scan the QR code below or contact us via email",
    "modal.wechatScan": "Scan with WeChat",

    // Footer
    "footer.rights": "© 2025 Quantum Consensus. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "zh",
  setLanguage: () => {},
  t: () => "",
})

export const useLanguage = () => useContext(LanguageContext)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("zh")

  // 从本地存储加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // 保存语言设置到本地存储
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // 翻译函数
  const t = (key: string): string => {
    return (translations[language] as TranslationEntry)[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

