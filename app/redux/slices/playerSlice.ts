import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum DISPLAY_PLAYER {
  NONE = "NONE",
  LARGE = "LARGE",
  SMALL = "SMALL",
}

export interface StatePlayer {
  display: DISPLAY_PLAYER
  height: number
  width: number
  url: string
}

const playerSlice = createSlice({
  name: "player",
  initialState: <StatePlayer>{
    display: DISPLAY_PLAYER.NONE,
    height: 0,
    width: 0,
    url: null,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    noPlayer: (state) => {
      state.display = DISPLAY_PLAYER.NONE
    },
    largePlayer: (state) => {
      state.display = DISPLAY_PLAYER.LARGE
      state.height = Math.max(150, Math.round(window.innerHeight - window.innerHeight / 5))
      state.width = Math.max(275, Math.round(window.innerWidth - window.innerWidth / 5))
    },
    smallPlayer: (state) => {
      state.display = DISPLAY_PLAYER.SMALL
      state.height = 150
      state.width = 275
    },
    setUrlPlayer: (state, action: PayloadAction<{ url: string }>) => {
      state.url = action.payload.url
    },
  },
})

/**
 * Extract player from root state
 *
 * @param   {Object} state The root state
 * @returns {number} The current count
 */
export const selectPlayer = (state) => state.player

/**
 * Export actions
 */
export const { noPlayer, largePlayer, smallPlayer, setUrlPlayer } = playerSlice.actions

export default playerSlice.reducer
