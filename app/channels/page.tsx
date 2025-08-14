"use client"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChannelService } from "@/services/channel/channel.service";
import { VideosService } from "@/services/video/video.service";
import { useEffect, useState } from "react"
const channels = [
  { name: "NETFLIX", logo: "N", color: "bg-red-600", slug: "netflix" },
  { name: "NBC", logo: "NBC", color: "bg-blue-600", slug: "nbc" },
  { name: "prime", logo: "prime", color: "bg-blue-500", slug: "prime" },
  { name: "Disney+", logo: "Disney+", color: "bg-blue-700", slug: "disney" },
  { name: "BBC", logo: "BBC", color: "bg-black", slug: "bbc" },
]

const netflixContent = [
  { title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { title: "Film title", image: "/placeholder.svg?height=200&width=300" },
  { title: "Film title", image: "/placeholder.svg?height=200&width=300" },
]


export default function ChannelsPage() {
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedChannelSlug, setSelectedChannelSlug] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);

  const channelService = new ChannelService();
  const videosService = new VideosService();

  // Carregar canais
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await channelService.getAllChannels();
        setChannels(data);
        if (data.length > 0) setSelectedChannelSlug(data[0].slug); // selecionar primeiro canal por padrão
      } catch (error) {
        console.error("Erro ao carregar canais:", error);
      }
    };
    fetchChannels();
  }, []);

  // Carregar vídeos do canal selecionado
  useEffect(() => {
    if (!selectedChannelSlug) return;

    const fetchVideos = async () => {
      try {
        const channel = channels.find(c => c.slug === selectedChannelSlug);
        if (!channel) return;

        // Buscar vídeos do canal usando seu service
        const data = await videosService.findVideoByTitle(channel.name);
        setVideos([data]); // Ajuste dependendo do retorno real do service
      } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
      }
    };
    fetchVideos();
  }, [selectedChannelSlug, channels]);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Sidebar />
      <Header />

      <main className="ml-16 pt-16 p-8">
        <div className="space-y-12">
          {/* Channels Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white">Channels</h1>
          </div>

          {/* Channel Pills */}
          <div className="flex items-center space-x-4">
            {channels.map((channel) => (
              <Button
                key={channel.slug}
                onClick={() => setSelectedChannelSlug(channel.slug)}
                variant="outline"
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${selectedChannelSlug === channel.slug
                    ? "bg-white text-black"
                    : "bg-transparent text-white border-[#787878]"
                  }`}
              >
                {channel.name}
              </Button>
            ))}
            <Button
              variant="outline"
              className="bg-transparent border-[#787878] text-white hover:bg-[#1d1d1d] p-3 rounded-full"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Vídeos do Canal Selecionado */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedChannelSlug?.toUpperCase()}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {videos.map((item, index) => (
                <Link
                  key={index}
                  href={`/movie/${item.id || index}`}
                  className="group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="aspect-video bg-[#1d1d1d] rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-white font-medium">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}