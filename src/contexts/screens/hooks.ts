import { useContext, useCallback } from 'react'
import { ScreensStateContext, ScreensDispatchContext, type ScreensItem } from './context'

export function useScreensState() {
  const state = useContext(ScreensStateContext)

  const activeItem = state.items.find((item) => item.id === state.active) || null

  return {
    state,
    activeItem,
  }
}

export function useScreensDispatch() {
  const dispatch = useContext(ScreensDispatchContext)

  const addScreen = useCallback(
    ({ id, title, mediaStream }: ScreensItem) => {
      const tracks = mediaStream?.getTracks() ?? []

      const handleEnded = () => {
        dispatch({ type: 'set-mediaStream', payload: { id, mediaStream: null } })
        tracks.forEach((track) => {
          track.stop()
          track.removeEventListener('ended', handleEnded)
        })
      }

      tracks.forEach((track) => track.addEventListener('ended', handleEnded))

      dispatch({
        type: 'add',
        payload: { id, title, mediaStream },
      })
    },
    [dispatch],
  )

  const setActiveScreen = useCallback(
    (id: string) => {
      dispatch({ type: 'set-active', payload: id })
    },
    [dispatch],
  )

  const setScreenMediaStream = useCallback(
    (id: string, mediaStream: MediaStream | null) => {
      dispatch({ type: 'set-mediaStream', payload: { id, mediaStream } })
    },
    [dispatch],
  )

  const setScreenTitle = useCallback(
    (id: string, title: string) => {
      dispatch({ type: 'set-title', payload: { id, title } })
    },
    [dispatch],
  )

  const removeScreen = useCallback(
    (id: string) => {
      dispatch({ type: 'remove', payload: id })
    },
    [dispatch],
  )

  return {
    dispatch,
    addScreen,
    setActiveScreen,
    setScreenMediaStream,
    setScreenTitle,
    removeScreen,
  }
}
