"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/services/auth/auth.service'

export const useLogin = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        
        if (!email.trim()) {
            setError('Email é obrigatório')
            return
        }
        
        if (!password) {
            setError('Senha é obrigatória')
            return
        }

        setLoading(true)
        try {
            console.log('Tentando fazer login...')
            const authService = new AuthService()
            const response = await authService.login({ email, password })
            
            console.log('Login response:', response)
            console.log('Cookies após login:', document.cookie)
            
            if (response.verified) {
                router.push('/profiles')
            } else {
                router.push(`/verify-email?email=${encodeURIComponent(email)}`)
            }
        } catch (err: any) {
            console.error('Erro no login:', err)
            setError(err?.response?.data?.message || err?.message || 'Erro ao fazer login. Verifique suas credenciais.')
        } finally {
            setLoading(false)
        }
    }

    return {
        email,
        password,
        loading,
        error,
        setEmail,
        setPassword,
        handleSubmit
    }
}