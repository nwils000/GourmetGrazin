const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || ''
const DRIVE_API = 'https://www.googleapis.com/drive/v3/files'

// Cache fetched results per session so we don't re-fetch on every navigation
const cache = {}

/**
 * Fetch image files from a public Google Drive folder.
 * Returns array of { src, alt } objects.
 * Returns null if not configured or on error (caller should use fallback).
 */
export async function fetchDriveImages(folderId) {
  if (!API_KEY || !folderId) return null

  const cacheKey = folderId
  if (cache[cacheKey]) return cache[cacheKey]

  try {
    const query = encodeURIComponent(
      `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`
    )
    const fields = encodeURIComponent('files(id,name)')
    const url = `${DRIVE_API}?q=${query}&key=${API_KEY}&fields=${fields}&pageSize=100&orderBy=name`

    const res = await fetch(url)
    if (!res.ok) return null

    const data = await res.json()
    if (!data.files || data.files.length === 0) return null

    const images = data.files.map((file) => ({
      src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`,
      alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    }))

    cache[cacheKey] = images
    return images
  } catch {
    return null
  }
}

// Folder IDs from environment variables
export const FOLDER_IDS = {
  gallery: import.meta.env.VITE_GDRIVE_GALLERY_FOLDER || '',
  easterBoards: import.meta.env.VITE_GDRIVE_EASTER_FOLDER || '',
}
