"use client"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useVerifyEmail} from "@/hooks/use-verify-email"

export const VerifyEmailForm = () => {
    const {
        code,
        loading,
        error,
        countdown,
        isResendDisabled,
        email,
        isCodeComplete,
        handleCodeChange,
        handleKeyDown,
        handlePaste,
        handleResendEmail,
        handleConfirmCode,
        formatTime
    } = useVerifyEmail()

    return (
        <div className="relative z-10 text-center space-y-8 max-w-md w-full">
            {/* Logo */}
            <div className="w-16 h-16 bg-[#feb625] rounded-lg flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-2xl">C</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Confirme seu email</h1>
                <p className="text-[#c5c5c5]">
                    Enviamos um código para {email || 'seu email'}
                </p>
            </div>

            {/* Error message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            )}

            {/* Code Input - 6 digits */}
            <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                    <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-14 h-14 text-center text-2xl bg-transparent border-[#787878] border-2 rounded-lg text-white focus:border-[#feb625] focus:ring-0"
                        disabled={loading}
                    />
                ))}
            </div>

            {/* Resend Button */}
            <Button
                variant="outline"
                onClick={handleResendEmail}
                disabled={isResendDisabled || loading}
                className={`w-full bg-transparent border-[#787878] h-12 transition-colors ${
                    isResendDisabled
                        ? 'text-[#555555] cursor-not-allowed'
                        : 'text-[#787878] hover:bg-[#1d1d1d] hover:text-white'
                }`}
            >
                {isResendDisabled ? `Reenviar em ${formatTime(countdown)}` : 'Reenviar código'}
            </Button>

            {/* Confirm Button */}
            <Button
                onClick={handleConfirmCode}
                disabled={!isCodeComplete || loading}
                className="w-full bg-[#feb625] hover:bg-[#feb625]/90 text-black font-semibold h-12 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                    'Confirmar código'
                )}
            </Button>
        </div>
    )
}