import { type ReactNode, type Reducer, useReducer } from 'react'
import {
  type ScreensState,
  type ScreensAction,
  initialScreensState,
  ScreensStateContext,
  ScreensDispatchContext,
} from './context'

const reducer: Reducer<ScreensState, ScreensAction> = (state, action) => {
  switch (action.type) {
    case 'add': {
      return { active: action.payload.id, items: [...state.items, action.payload] }
    }

    case 'remove': {
      const itemId = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === itemId)
      if (itemIndex != -1) {
        const item = state.items[itemIndex]
        item?.mediaStream?.getTracks().forEach((track) => {
          track.stop()
        })
      }

      const nextItemIndex = itemIndex + 1 > state.items.length - 1 ? itemIndex - 1 : itemIndex + 1
      const nextActiveItemId =
        itemId === state.active ? (state.items[nextItemIndex]?.id ?? null) : state.active

      return {
        active: nextActiveItemId,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    }

    case 'set-active': {
      return { ...state, active: action.payload }
    }

    case 'set-title': {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.payload.id) return item
          return {
            ...item,
            title: action.payload.title,
          }
        }),
      }
    }

    case 'set-mediaStream': {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.payload.id) return item
          return {
            ...item,
            mediaStream: action.payload.mediaStream,
          }
        }),
      }
    }
  }
}

export function ScreensProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialScreensState)

  return (
    <ScreensDispatchContext.Provider value={dispatch}>
      <ScreensStateContext.Provider value={state}>{children}</ScreensStateContext.Provider>
    </ScreensDispatchContext.Provider>
  )
}
