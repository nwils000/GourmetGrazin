import { useState, useEffect } from 'react'
import { fetchDriveImages } from '../lib/googleDrive'

/**
 * Loads images from Google Drive, falling back to the provided defaults.
 * `fallbackImages` is only read at initial mount.
 */
export function useDriveImages(folderId, fallbackImages) {
  const [state, setState] = useState(() => ({
    images: fallbackImages,
    loading: !!folderId,
  }))

  useEffect(() => {
    if (!folderId) return

    let cancelled = false

    fetchDriveImages(folderId).then((driveImages) => {
      if (cancelled) return
      setState((prev) => ({
        images: driveImages && driveImages.length > 0 ? driveImages : prev.images,
        loading: false,
      }))
    })

    return () => {
      cancelled = true
    }
  }, [folderId])

  return state
}
