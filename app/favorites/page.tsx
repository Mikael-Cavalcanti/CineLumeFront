import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Heart, Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useFavorites } from "@/hooks/use-favorites"

export default function FavoritesPage() {
  const profileId = 1; 
  const { favorites, loadFavorites, removeFavorite, loading } = useFavorites();
  const [removing, setRemoving] = useState<number | null>(null);

  useEffect(() => {
    loadFavorites(profileId);
  }, [loadFavorites, profileId]);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Sidebar />
      <Header />

      <main className="ml-16 pt-16 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your favorites</h1>
            <p className="text-[#787878]">The films and series you like</p>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favorites.map((fav) => (
              <div key={`${fav.profileId}-${fav.videoId}`} className="group cursor-pointer">
                <div className="relative aspect-[2/3] bg-[#1d1d1d] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={fav.video?.image || "/placeholder.svg"}
                    alt={fav.video?.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <button onClick={async () => {
                    setRemoving(fav.videoId);
                    await removeFavorite({ profileId: fav.profileId, videoId: fav.videoId });
                    setRemoving(null);
                  }}
                    disabled={removing === fav.videoId}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </button>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-semibold">{fav.video?.title}</h3>
                  <p className="text-[#787878] text-sm">{fav.video?.year || "—"}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-[#feb625] fill-[#feb625]" />
                    <span className="text-white text-sm">{fav.video?.rating || "—"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!loading && favorites.length === 0 && (
            <p className="text-[#787878]">You have no favorites yet.</p>
          )}
        </div>
      </main>
    </div>
  )
}
