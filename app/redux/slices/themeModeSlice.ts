import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: {
    value: "light",
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    toggle: (state) => {
      state.value = state.value === "light" ? "dark" : "light"
    },
    setThemeMode: (state, action: PayloadAction<{ value: string }>) => {
      state.value = action.payload.value
    },
  },
})

/**
 * Extract themeMode from root state
 *
 * @param   {Object} state The root state
 * @returns {number} The current count
 */
export const selectThemeMode = (state) => state.themeMode.value

/**
 * Export des actions
 */
export const { toggle, setThemeMode } = themeModeSlice.actions

export default themeModeSlice.reducer
