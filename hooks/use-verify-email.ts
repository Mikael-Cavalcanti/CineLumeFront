"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {MailService} from "@/services/mail/mail.service";

export const useVerifyEmail = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mailService = new MailService()
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [countdown, setCountdown] = useState(30)
    const [isResendDisabled, setIsResendDisabled] = useState(true)

    const email = searchParams?.get('email') || ''

    // Countdown timer
    useEffect(() => {
        if (countdown > 0 && isResendDisabled) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (countdown === 0) {
            setIsResendDisabled(false)
        }
    }, [countdown, isResendDisabled])

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) { // Apenas números
            const newCode = [...code]
            newCode[index] = value
            setCode(newCode)

            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`)
                nextInput?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Backspace - move to previous input if current is empty
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`)
            prevInput?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text')
        
        // Remove caracteres não numéricos e limita a 6 dígitos
        const numbers = pastedData.replace(/\D/g, '').slice(0, 6)
        
        if (numbers.length > 0) {
            // Cria array com os dígitos colados
            const newCode = ["", "", "", "", "", ""]
            for (let i = 0; i < numbers.length; i++) {
                newCode[i] = numbers[i]
            }
            
            setCode(newCode)
            setError(null) // Limpa qualquer erro anterior
            
            // Foca no próximo campo vazio ou no último preenchido
            const nextEmptyIndex = Math.min(numbers.length, 5)
            const nextInput = document.getElementById(`code-${nextEmptyIndex}`)
            nextInput?.focus()
        }
    }

    const handleResendEmail = useCallback(async () => {
        if (isResendDisabled) return

        setLoading(true)
        setError(null)
        
        try {
            await mailService.resendEmail(email)
            
            // Reinicia o countdown
            setCountdown(30)
            setIsResendDisabled(true)
            
            console.log('Email reenviado para:', email)
        } catch (err: any) {
            setError(err?.message ?? 'Erro ao reenviar email. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }, [email, isResendDisabled])

    const handleConfirmCode = useCallback(async () => {
        const fullCode = code.join('')
        
        if (fullCode.length !== 6) {
            setError('Por favor, digite o código completo de 6 dígitos')
            return
        }

        setLoading(true)
        setError(null)

        try {

            await mailService.verifyEmail({ email, code: fullCode })
            
            console.log('Código verificado:', fullCode, 'para email:', email)
            router.push('/profiles')
        } catch (err: any) {
            setError(err?.message ?? 'Código inválido. Tente novamente.')
            // Limpa o código em caso de erro
            setCode(["", "", "", "", "", ""])
            const firstInput = document.getElementById('code-0')
            firstInput?.focus()
        } finally {
            setLoading(false)
        }
    }, [code, email, router])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const isCodeComplete = code.every(digit => digit !== '')

    return {
        // Estados
        code,
        loading,
        error,
        countdown,
        isResendDisabled,
        email,
        isCodeComplete,
        // Handlers
        handleCodeChange,
        handleKeyDown,
        handlePaste,
        handleResendEmail,
        handleConfirmCode,
        // Helpers
        formatTime
    }
}