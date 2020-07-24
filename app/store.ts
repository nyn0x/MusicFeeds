import { configureStore } from "@reduxjs/toolkit"

import counterReducer from "app/redux/slices/counterSlice"
import themeModeSliceReducer from "app/redux/slices/themeModeSlice"
import playerSliceReducer from "app/redux/slices/playerSlice"

const saveThemeMode = (store) => (next) => (action) => {
  // console.log("dispatching", action)
  let result = next(action)
  const state = store.getState()
  // console.log("next state", state)
  if (["themeMode/toggle"].indexOf(action.type) > -1) {
    localStorage.setItem("state", JSON.stringify({ themeMode: state.themeMode }))
  }
  return result
}

export default configureStore({
  reducer: {
    counter: counterReducer,
    themeMode: themeModeSliceReducer,
    player: playerSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveThemeMode),
  devTools: true,
})
