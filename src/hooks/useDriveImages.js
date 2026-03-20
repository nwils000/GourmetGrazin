import { useState, useEffect } from 'react'
import { fetchDriveImages } from '../lib/googleDrive'

/**
 * Hook to load images from Google Drive with fallback to defaults.
 *
 * @param {string} folderId - Google Drive folder ID
 * @param {Array} fallbackImages - Default images array [{ src, alt }]
 * @returns {{ images: Array, loading: boolean }}
 */
export function useDriveImages(folderId, fallbackImages) {
  const [images, setImages] = useState(fallbackImages)
  const [loading, setLoading] = useState(!!folderId)

  useEffect(() => {
    if (!folderId) {
      setImages(fallbackImages)
      setLoading(false)
      return
    }

    let cancelled = false

    fetchDriveImages(folderId).then((driveImages) => {
      if (cancelled) return
      if (driveImages && driveImages.length > 0) {
        setImages(driveImages)
      } else {
        // Drive returned nothing or failed — use fallback
        setImages(fallbackImages)
      }
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [folderId])

  return { images, loading }
}
