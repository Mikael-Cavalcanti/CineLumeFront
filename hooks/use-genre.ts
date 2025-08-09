import { useState, useEffect } from "react"
import { genreService } from "../services/genre/genre.service"
import type { Genre, Video } from "../interfaces/genre"

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [loadingGenres, setLoadingGenres] = useState(false)
  const [loadingVideos, setLoadingVideos] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGenres() {
      setLoadingGenres(true)
      try {
        const data = await genreService.getAllGenres()
        setGenres(data)
        if (data.length > 0) setSelectedGenre(data[0])
      } catch (err) {
        setError("Failed to load genres")
      } finally {
        setLoadingGenres(false)
      }
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    if (!selectedGenre) {
      setVideos([])
      return
    }

    async function fetchVideos() {
      setLoadingVideos(true)
      try {
        const { videos } = await genreService.getVideosByGenre(selectedGenre!.id)
        setVideos(videos)
      } catch (err) {
        setError("Failed to load videos for genre")
        setVideos([])
      } finally {
        setLoadingVideos(false)
      }
    }

    fetchVideos()
  }, [selectedGenre])

  return {
    genres,
    selectedGenre,
    setSelectedGenre,
    videos,
    loadingGenres,
    loadingVideos,
    error,
  }
}
