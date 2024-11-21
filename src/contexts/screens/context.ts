import { type Dispatch, createContext } from 'react'

export type ScreensItem = {
  id: string
  mediaStream: MediaStream | null
  title: string
}

export type ScreensState = {
  items: ScreensItem[]
  active: string | null
}

export const initialScreensState: ScreensState = {
  items: [],
  active: null,
}

export type ScreensActionAdd = {
  type: 'add'
  payload: ScreensItem
}

export type ScreensActionRemove = {
  type: 'remove'
  payload: string
}

export type ScreensActionSetActive = {
  type: 'set-active'
  payload: string
}

export type ScreensActionSetTitle = {
  type: 'set-title'
  payload: {
    id: string
    title: string
  }
}

export type ScreensActionSetMediaStream = {
  type: 'set-mediaStream'
  payload: {
    id: string
    mediaStream: MediaStream | null
  }
}

export type ScreensAction =
  | ScreensActionAdd
  | ScreensActionRemove
  | ScreensActionSetActive
  | ScreensActionSetTitle
  | ScreensActionSetMediaStream

export const ScreensStateContext = createContext<ScreensState>(initialScreensState)

export const ScreensDispatchContext = createContext<Dispatch<ScreensAction>>(() => void 0)
