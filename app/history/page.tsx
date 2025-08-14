"use client";

import { useEffect, useState, Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { History, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HistoryService } from "@/services/history/history.service";
import { useNavigation } from "@/hooks/use-navigation";
import type { Video } from "@/services/history/history.repository";
import { Button } from "@/components/ui/button";

function HistoryContent() {
  const { getCurrentProfileId } = useNavigation();
  const profileId = getCurrentProfileId() || 1;
  const [completedVideos, setCompletedVideos] = useState<Video[]>([]);
  const [watchingVideos, setWatchingVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<number | null>(null);
  const historyService = new HistoryService();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        // Buscar vídeos concluídos e em andamento separadamente
        const [completed, watching] = await Promise.all([
          historyService.getCompletedHistory(profileId),
          historyService.getWatchingHistory(profileId)
        ]);
        
        setCompletedVideos(completed);
        setWatchingVideos(watching);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [profileId]);

  const handleRemoveFromHistory = async (videoId: number) => {
    setRemoving(videoId);
    try {
      const success = await historyService.removeFromHistory(profileId, videoId);
      if (success) {
        // Remover de ambas as listas
        setCompletedVideos(prev => prev.filter(video => video.id !== videoId));
        setWatchingVideos(prev => prev.filter(video => video.id !== videoId));
      }
    } catch (error) {
      console.error("Erro ao remover do histórico:", error);
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D]">
        <Sidebar />
        <Header />
        <main className="ml-16 pt-16 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Watch History</h1>
              <p className="text-[#787878]">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <Sidebar />
      <Header />

      <main className="ml-16 pt-16 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Watch History</h1>
            <p className="text-[#787878]">Your viewing history and progress</p>
          </div>

          {/* Continue Watching Section */}
          {watchingVideos.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <History className="w-6 h-6" />
                Continue Watching
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchingVideos.map((video) => (
                  <div key={`watching-${video.id}`} className="group cursor-pointer relative">
                    <Link href={`/movie/${video.id}`} className="block">
                      <div className="relative aspect-video bg-[#1a1a1a] rounded-lg overflow-hidden mb-3">
                        <Image
                          src={video.thumbnailUrl || "/placeholder.svg"}
                          alt={video.title || "Movie"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Progress Bar - pode ser implementado futuramente */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                          <div
                            className="h-full bg-[#feb625] transition-all duration-300"
                            style={{ width: `50%` }}
                          />
                        </div>
                      </div>
                    </Link>
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromHistory(video.id);
                      }}
                      disabled={removing === video.id}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="space-y-1">
                      <h3 className="text-white font-semibold">{video.title}</h3>
                      <p className="text-[#787878] text-sm">{video.releaseYear}</p>
                      <p className="text-[#feb625] text-sm">50% complete</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#787878] text-xs">{video.duration}min</span>
                        <span className="text-[#787878] text-xs">{video.ageRating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Movies Section */}
          {completedVideos.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Completed</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {completedVideos.map((video) => (
                  <div key={`completed-${video.id}`} className="group cursor-pointer relative">
                    <Link href={`/movie/${video.id}`} className="block">
                      <div className="relative aspect-[2/3] bg-[#1a1a1a] rounded-lg overflow-hidden mb-3">
                        <Image
                          src={video.thumbnailUrl || "/placeholder.svg"}
                          alt={video.title || "Movie"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromHistory(video.id);
                      }}
                      disabled={removing === video.id}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="space-y-1">
                      <h3 className="text-white font-semibold text-sm">{video.title}</h3>
                      <p className="text-[#787878] text-xs">{video.releaseYear}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#787878] text-xs">{video.duration}min</span>
                        <span className="text-[#787878] text-xs">{video.ageRating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && completedVideos.length === 0 && watchingVideos.length === 0 && (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-[#787878] mx-auto mb-4" />
              <p className="text-[#787878] text-lg mb-2">No watch history yet</p>
              <p className="text-[#787878]">Start watching movies and series to see your history here</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0D0D]">
        <Sidebar />
        <Header />
        <main className="ml-16 pt-16 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Watch History</h1>
              <p className="text-[#787878]">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    }>
      <HistoryContent />
    </Suspense>
  );
}