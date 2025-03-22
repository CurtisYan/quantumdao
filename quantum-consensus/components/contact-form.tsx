"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
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
            className="h-8 w-8 text-primary"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">消息已发送</h3>
        <p className="text-foreground/70">感谢您的留言，我们将尽快回复您。</p>
        <Button
          variant="outline"
          className="mt-4 border-primary/50 hover:border-primary"
          onClick={() => setIsSubmitted(false)}
        >
          发送新消息
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">姓名</Label>
        <Input
          id="name"
          name="name"
          placeholder="请输入您的姓名"
          value={formState.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">电子邮箱</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="请输入您的电子邮箱"
          value={formState.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">主题</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="请输入咨询主题"
          value={formState.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">留言内容</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="请输入您的留言内容"
          value={formState.message}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "发送中..." : "发送留言"}
      </Button>
    </form>
  )
}

