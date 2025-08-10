"use client"

import { Suspense } from "react"
import { VerifyEmailForm } from "@/components/verify-email-form"

export default function VerifyEmailPage() {

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-8 relative">
      {/* Background movie posters */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-3 h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="bg-[#1d1d1d] border border-[#2d2d2d]" />
          ))}
        </div>
      </div>

      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  )
}
