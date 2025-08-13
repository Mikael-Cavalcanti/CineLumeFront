"use client"

import {Suspense} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Edit, Loader2, X} from "lucide-react"
import {useEditProfile} from "@/hooks/use-edit-profile"

function EditProfileContent() {
    const {
        profile,
        name,
        setName,
        isKidProfile,
        setIsKidProfile,
        avatarUrl,
        loading,
        error,
        success,
        fetchingProfile,
        handleSave,
        handleDelete,
        handleCancel,
        isEditing,
        isAvatarPopupOpen,
        availableAvatars,
        openAvatarPopup,
        closeAvatarPopup,
        selectAvatar
    } = useEditProfile()

    if (fetchingProfile) {
        return (
            <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#feb625] mx-auto"/>
                    <p className="text-white">Carregando profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-8">
            {/* Logo */}
            <div className="absolute top-8 left-8">
                <h1 className="text-2xl font-bold text-white tracking-wider">
                    CINE<span className="text-[#feb625]">LUME</span>
                </h1>
            </div>

            <div className="w-full max-w-2xl space-y-8">
                <h1 className="text-4xl font-bold text-white mb-8">{isEditing ? 'Edit Profile' : 'Add Profile'}</h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                <div className="space-y-8">
                    {/* Profile Picture and Name */}
                    <div className="flex items-start space-x-8">
                        <div className="relative">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src={avatarUrl || profile?.avatarUrl || "/profiles/profile_2.png"}/>
                                <AvatarFallback className="bg-[#1d1d1d] text-white text-2xl">
                                    {name ? name.charAt(0).toUpperCase() : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <button
                                onClick={openAvatarPopup}
                                disabled={loading}
                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#feb625] rounded-full flex items-center justify-center hover:bg-[#feb625]/90 transition-colors disabled:opacity-50">
                                <Edit className="w-4 h-4 text-black"/>
                            </button>
                        </div>

                        <div className="flex-1">
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome do perfil"
                                disabled={loading}
                                className="bg-transparent border-[#787878] border-2 rounded-lg px-4 py-3 text-white placeholder:text-[#787878] focus:border-[#feb625] focus:ring-0 h-12 text-xl"
                            />
                        </div>
                    </div>

                    {/* Age Range */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Age range</h2>
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="kids-mode"
                                checked={isKidProfile}
                                onCheckedChange={(onChecked) => setIsKidProfile(onChecked === true)}
                                disabled={loading}
                                className="border-[#787878] data-[state=checked]:bg-[#feb625] data-[state=checked]:border-[#feb625]"
                            />
                            <Label htmlFor="kids-mode" className="text-white text-lg">
                                Kids Mode
                            </Label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-8">
                        <Button
                            onClick={handleSave}
                            disabled={loading || !name.trim() || success}
                            className="bg-white text-black hover:bg-[#feb625] hover:text-black border border-white hover:border-[#feb625] px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin"/>
                            ) : (
                                'Save'
                            )}
                        </Button>
                        <Button
                            onClick={handleCancel}
                            disabled={loading}
                            variant="outline"
                            className="border-[#787878] text-[#787878] hover:bg-[#1d1d1d] hover:text-white hover:border-white px-8 py-3 transition-colors"
                        >
                            Cancel
                        </Button>
                        {isEditing && (
                            <Button
                                onClick={handleDelete}
                                disabled={loading || success}
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-500/20 hover:border-red-400 hover:text-red-400 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Delete profile
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Avatar Selection Popup */}
            {isAvatarPopupOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#0c0c0c] border border-[#1d1d1d] rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Choose Avatar</h3>
                            <button
                                onClick={closeAvatarPopup}
                                className="text-[#787878] hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                            {availableAvatars.map((avatar, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectAvatar(avatar)}
                                    className="group relative"
                                >
                                    <Avatar className="w-16 h-16 group-hover:ring-2 group-hover:ring-[#feb625] transition-all">
                                        <AvatarImage src={avatar} />
                                        <AvatarFallback className="bg-[#1d1d1d] text-white">
                                            {index + 1}
                                        </AvatarFallback>
                                    </Avatar>
                                    {avatarUrl === avatar && (
                                        <div className="absolute inset-0 bg-[#feb625]/20 rounded-full ring-2 ring-[#feb625]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Logo bottom right */}
            <div className="absolute bottom-8 right-8">
                <div className="w-16 h-16 bg-[#feb625] rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">C</span>
                </div>
            </div>
        </div>
    )
}

export default function EditProfilePage() {
    return (
        <Suspense fallback={<div className="text-white">Carregando...</div>}>
            <EditProfileContent/>
        </Suspense>
    )
}
