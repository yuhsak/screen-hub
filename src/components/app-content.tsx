import { useRef, useEffect } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useScreensState, type ScreensItem } from '@/contexts/screens'
import { useIsMobile } from '@/hooks/use-mobile'
import { useMediaStreamScreen } from '@/hooks/use-media-stream-screen'

function VideoScreen({
  hasItems,
  activeItem,
}: {
  hasItems: boolean
  activeItem: ScreensItem | null
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { addNewMediaStreamScreen, setNewMediaStreamForScreen } = useMediaStreamScreen()

  useEffect(() => {
    if (!videoRef.current) return
    if (!activeItem?.mediaStream) {
      videoRef.current.srcObject = null
      return
    }
    videoRef.current.srcObject = activeItem.mediaStream
  }, [activeItem?.mediaStream, videoRef])

  if (!activeItem) {
    if (!hasItems) {
      return (
        <div className='w-full h-full flex items-center justify-center'>
          <Button size='lg' onClick={() => addNewMediaStreamScreen()}>
            Add screen
          </Button>
        </div>
      )
    }
    return <div className='w-full h-full bg-slate-800'></div>
  }

  if (!activeItem.mediaStream) {
    return (
      <div className='w-full h-full flex flex-col gap-y-4 items-center justify-center bg-slate-800'>
        <p className='text-white'>This screen has been stopped sharing.</p>
        <Button
          variant={'outline'}
          size='lg'
          onClick={() => setNewMediaStreamForScreen(activeItem.id)}
        >
          Choose another screen
        </Button>
      </div>
    )
  }

  return <video autoPlay className='w-full h-full bg-slate-800' ref={videoRef} />
}

export function AppContent() {
  const { state, activeItem } = useScreensState()
  const isMobile = useIsMobile()

  return (
    <>
      <header className='sticky top-0 flex shrink-0 items-center bg-opacity-0 h-14 z-10'>
        {isMobile && <SidebarTrigger variant={'outline'} className='ml-3 opacity-75' />}
      </header>
      <div className='w-full h-[100dvh] -mt-14 flex'>
        <VideoScreen hasItems={!!state.items.length} activeItem={activeItem} />
      </div>
    </>
  )
}
