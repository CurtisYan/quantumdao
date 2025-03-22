"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{t("modal.title")}</DialogTitle>
          <DialogDescription className="text-center">{t("modal.description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 bg-white p-2 rounded-lg mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-lg blur-sm"></div>
              <div className="relative h-full w-full flex items-center justify-center bg-white rounded-md">
                <Image src="/qrcode.png" alt="微信二维码" width={160} height={160} className="rounded-md" />
              </div>
            </div>
            <p className="text-sm text-foreground/70">{t("modal.wechatScan")}</p>
          </div>

          <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-primary/5 border border-primary/10">
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
            <span className="text-sm font-medium">realthat@foxmail.com</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

