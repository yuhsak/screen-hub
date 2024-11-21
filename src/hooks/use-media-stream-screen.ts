import { useCallback } from 'react'
import { getMediaStream } from '@/services/media-stream'
import { useScreensDispatch } from '@/contexts/screens'
import { uuid } from '@/lib/utils'

export type UseMediaStreamScreenOption = {
  defaultScreenTitle?: string | undefined
}

export function useMediaStreamScreen({
  defaultScreenTitle = 'New Screen',
}: UseMediaStreamScreenOption = {}) {
  const { addScreen, setScreenMediaStream } = useScreensDispatch()

  const addNewMediaStreamScreen = useCallback(async () => {
    const mediaStream = await getMediaStream()
    if (mediaStream.ok) {
      addScreen({ id: uuid(), title: defaultScreenTitle, mediaStream: mediaStream.value })
    }
  }, [addScreen, defaultScreenTitle])

  const setNewMediaStreamForScreen = useCallback(
    async (id: string) => {
      const mediaStream = await getMediaStream()
      if (mediaStream.ok) {
        setScreenMediaStream(id, mediaStream.value)
      }
    },
    [setScreenMediaStream],
  )

  return {
    addNewMediaStreamScreen,
    setNewMediaStreamForScreen,
  }
}
