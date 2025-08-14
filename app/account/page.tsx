"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2, Loader2 } from "lucide-react"
import { useAccount } from "@/hooks/use-account"

export default function AccountPage() {
  const { 
    user, 
    selectedProfile, 
    loading, 
    isDeleting, 
    error, 
    handleDeleteAccount, 
    handleManageProfiles 
  } = useAccount()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0c]">
        <Sidebar />
        <Header />
        <main className="ml-16 pt-16 p-8">
          <div className="flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#feb625] mx-auto"/>
              <p className="text-white">Carregando dados da conta...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Sidebar />
      <Header />

      <main className="ml-16 pt-16 p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8">Account</h1>

          <div className="space-y-8">
            {/* Information Section */}
            <div className="border-b border-[#1d1d1d] pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[#787878] text-sm uppercase tracking-wider mb-2">INFORMATIONS</h2>
                  <p className="text-white text-xl mb-2">{user?.email || 'No email available'}</p>
                  <p className="text-[#787878]">Password: *******</p>
                </div>
                <Button variant="link" className="text-[#feb625] hover:text-[#feb625]/80 p-0">
                  Change password
                </Button>
              </div>
            </div>

            {/* Plan Details Section */}
            <div className="border-b border-[#1d1d1d] pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[#787878] text-sm uppercase tracking-wider mb-2">PLAN DETAILS</h2>
                  <p className="text-white text-xl">Basic</p>
                </div>
                <div className="space-y-2">
                  <Button variant="link" className="text-[#feb625] hover:text-[#feb625]/80 p-0 block">
                    Change plan
                  </Button>
                  <Button variant="link" className="text-[#feb625] hover:text-[#feb625]/80 p-0 block">
                    Cancel my plan
                  </Button>
                </div>
              </div>
            </div>

            {/* My Profile Section */}
            <div className="border-b border-[#1d1d1d] pb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-[#787878] text-sm uppercase tracking-wider">MY PROFILE</h2>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedProfile?.avatarUrl || "/profiles/profile_2.png"} />
                      <AvatarFallback className="bg-[#1d1d1d] text-white">
                        {selectedProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white text-xl">{selectedProfile?.name || 'No profile selected'}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleManageProfiles}
                  variant="link" 
                  className="text-[#feb625] hover:text-[#feb625]/80 p-0"
                >
                  Manage profiles
                </Button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="pt-8">
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                  {error}
                </div>
              )}
              <Button 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-500/10 px-6 py-3 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
