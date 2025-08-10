"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegister } from "@/hooks/use-register"

export const RegisterForm = () => {
    const {
        name,
        email,
        password,
        confirmPassword,
        birthDate,
        loading,
        error,
        success,
        fieldErrors,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleBirthDateChange,
        handleSubmit
    } = useRegister()

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white tracking-wider">
                    CINE<span className="text-[#feb625]">LUME</span>
                </h1>
            </div>

            {/* Title */}
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white">Register</h2>
            </div>

            {/* Register form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#c5c5c5] text-sm">
                        Your name
                    </Label>
                    {fieldErrors.name && (
                        <p className="text-red-500 text-xs">{fieldErrors.name}</p>
                    )}
                    <Input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#c5c5c5] text-sm">
                        Email address
                    </Label>
                    {fieldErrors.email && (
                        <p className="text-red-500 text-xs">{fieldErrors.email}</p>
                    )}
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="birthdate" className="text-[#c5c5c5] text-sm">
                        Your birthdate
                    </Label>
                    {fieldErrors.birthDate && (
                        <p className="text-red-500 text-xs">{fieldErrors.birthDate}</p>
                    )}
                    <Input
                        id="birthdate"
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={birthDate}
                        maxLength={10}
                        onChange={(e) => handleBirthDateChange(e.target.value)}
                        className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#c5c5c5] text-sm">
                        Your password
                    </Label>
                    {fieldErrors.password && (
                        <p className="text-red-500 text-xs">{fieldErrors.password}</p>
                    )}
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-[#c5c5c5] text-sm">
                        Confirm Password
                    </Label>
                    {fieldErrors.confirmPassword && (
                        <p className="text-red-500 text-xs">{fieldErrors.confirmPassword}</p>
                    )}
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                    type="submit"
                    disabled={loading || success}
                    className="w-full bg-[#feb625] hover:bg-[#feb625]/90 text-black font-semibold py-3 rounded-lg h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    ) : (
                        "Register"
                    )}
                </Button>
            </form>
        </div>
    )
}