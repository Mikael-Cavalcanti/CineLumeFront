"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/services/auth/auth.service'

interface FieldErrors {
    name: string
    email: string
    password: string
    confirmPassword: string
    birthDate: string
}

export const useRegister = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: ''
    })

    const validateName = (value: string) => {
        if (!value.trim()) {
            return 'Nome é obrigatório'
        }
        return ''
    }

    const validateEmail = (value: string) => {
        if (!value.trim()) {
            return 'Email é obrigatório'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            return 'Email inválido'
        }
        return ''
    }

    const validatePassword = (value: string) => {
        if (!value) {
            return 'Senha é obrigatória'
        }
        if (value.length < 6) {
            return 'A senha deve ter no mínimo 6 caracteres'
        }
        return ''
    }

    const validateConfirmPassword = (value: string) => {
        if (!value) {
            return 'Confirmação de senha é obrigatória'
        }
        if (value !== password) {
            return 'As senhas não coincidem'
        }
        return ''
    }

    const validateBirthDate = (value: string) => {
        if (!value) {
            return 'Data de nascimento é obrigatória'
        }
        
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
        if (!dateRegex.test(value)) {
            return 'Formato de data inválido (DD/MM/YYYY)'
        }

        const [day, month, year] = value.split('/').map(Number)
        const birthDate = new Date(year, month - 1, day)
        const today = new Date()
        
        if (birthDate > today) {
            return 'Data de nascimento não pode ser futura'
        }

        const age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        const dayDiff = today.getDate() - birthDate.getDate()

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            const adjustedAge = age - 1
            if (adjustedAge < 18) {
                return 'Você deve ser maior de idade (18 anos)'
            }
        } else if (age < 18) {
            return 'Você deve ser maior de idade (18 anos)'
        }

        return ''
    }

    const formatBirthDate = (value: string) => {
        const numbers = value.replace(/\D/g, '')
        
        if (numbers.length <= 2) {
            return numbers
        } else if (numbers.length <= 4) {
            return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
        } else {
            return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
        }
    }

    const validateField = (fieldName: keyof FieldErrors, value: string) => {
        let errorMessage = ''
        
        switch (fieldName) {
            case 'name':
                errorMessage = validateName(value)
                break
            case 'email':
                errorMessage = validateEmail(value)
                break
            case 'password':
                errorMessage = validatePassword(value)
                break
            case 'confirmPassword':
                errorMessage = validateConfirmPassword(value)
                break
            case 'birthDate':
                errorMessage = validateBirthDate(value)
                break
        }

        setFieldErrors(prev => ({
            ...prev,
            [fieldName]: errorMessage
        }))
    }

    const handleNameChange = (value: string) => {
        setName(value)
        validateField('name', value)
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        validateField('email', value)
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        validateField('password', value)
        if (confirmPassword) {
            validateField('confirmPassword', confirmPassword)
        }
    }

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value)
        validateField('confirmPassword', value)
    }

    const handleBirthDateChange = (value: string) => {
        const formattedValue = formatBirthDate(value)
        setBirthDate(formattedValue)
        validateField('birthDate', formattedValue)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        
        // Valida todos os campos
        const nameError = validateName(name)
        const emailError = validateEmail(email)
        const passwordError = validatePassword(password)
        const confirmPasswordError = validateConfirmPassword(confirmPassword)
        const birthDateError = validateBirthDate(birthDate)

        setFieldErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
            birthDate: birthDateError
        })

        // Se há erros, não prossegue
        if (nameError || emailError || passwordError || confirmPasswordError || birthDateError) {
            return
        }

        setLoading(true)
        try {
            const [day, month, year] = birthDate.split('/')
            const isoBirthDate = `${year}-${month}-${day}`

            const authService = new AuthService()
            await authService.register({name, email, password, birthDate: isoBirthDate})

            setSuccess(true)
            router.push(`/verify-email?email=${encodeURIComponent(email)}`)
        } catch (err: any) {
            setError(err?.message ?? 'Erro ao registrar. Tente novamente.')
            setLoading(false)
        }
    }

    return {
        // Estados
        name,
        email,
        password,
        confirmPassword,
        birthDate,
        loading,
        error,
        success,
        fieldErrors,
        // Handlers
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleBirthDateChange,
        handleSubmit
    }
}