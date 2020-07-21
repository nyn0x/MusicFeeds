import { createAsyncThunk, createSelector, createSlice, AsyncThunk } from "@reduxjs/toolkit"

interface Note {
  id: string
  title: string
  content: string
}

interface StateNotes {
  notes: Note[]
  error: any
  loading: string
  tempNote: Note
  backupNote: Note
  backupPosition: number
}

/**
 * https://redux-toolkit.js.org/api/createAsyncThunk
 * createAsyncThunk
 *
 * A function that accepts a Redux action type string and a callback function that should return a promise.
 * It generates promise lifecycle action types based on the action type prefix that you pass in,
 * and returns a thunk action creator that will run the promise callback and dispatch the lifecycle actions based on the returned promise.
 *
 * This abstracts the standard recommended approach for handling async request lifecycles.
 *
 * It does not generate any reducer functions, since it does not know what data you're fetching,
 * how you want to track loading state, or how the data you return needs to be processed.
 * You should write your own reducer logic that handles these actions,
 * with whatever loading state and processing logic is appropriate for your own app.
 *
 * The thunk action creator function will have plain action creators
 * - pending
 * - fulfilled
 * - rejected
 *
 * cases attached as nested fields
 */

export const addNote: any = createAsyncThunk("notes/addNote", async (newNote: Note, thunkAPI) => {
  try {
    const response = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const error = await response.json()

      return thunkAPI.rejectWithValue({ error: error.errors })
    }

    return response.json()
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const loadNotes: any = createAsyncThunk("notes/loadNotes", async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/notes")

    return response.json()
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const editNote: any = createAsyncThunk("notes/editNote", async (updates: Note, thunkAPI) => {
  const { id, title, content } = updates

  try {
    const response = await fetch(`/api/notes?noteId=${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.json()
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const deleteNote: any = createAsyncThunk("notes/deleteNote", async (id, thunkAPI) => {
  try {
    await fetch(`/api/notes?noteId=${id}`, { method: "DELETE" })
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

const notesSlice = createSlice({
  name: "notes",
  initialState: <StateNotes>{
    notes: [],
    loading: "idle",
    error: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // An additional object of "case reducers", where the keys should be other
    // action types, or a "builder callback" function used to add more reducers
    // Add reducers for additional action types here, and handle loading state as needed
    [addNote.pending]: (state) => {
      delete state.error
    },
    [addNote.fulfilled]: (state, action) => {
      state.notes.push(action.payload)
    },
    [addNote.rejected]: (state, action) => {
      state.error = action.payload.error
    },
    [loadNotes.pending]: (state) => {
      state.notes = []
      state.loading = "loading"
    },
    [loadNotes.fulfilled]: (state, action) => {
      state.notes = action.payload
      state.loading = "loaded"
    },
    [loadNotes.rejected]: (state, action) => {
      state.loading = "error"
      state.error = action.payload.error
    },
    [editNote.pending]: (state, action) => {
      const note = state.notes.find((note) => note.id === action.meta.arg.id)
      state.tempNote = Object.assign({}, note)
      note.title = action.meta.arg.title || note.title
      note.content = action.meta.arg.content || note.content
    },
    [editNote.fulfilled]: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload.id)
      delete state.tempNote
      Object.assign(note, action.payload)
    },
    [editNote.rejected]: (state, action) => {
      const note = state.notes.find((note) => note.id === action.meta.arg.id)
      state.error = action.payload.error || action.error.message
      Object.assign(note, state.tempNote)
      delete state.tempNote
    },
    [deleteNote.pending]: (state, action) => {
      const position = state.notes.findIndex((note) => note.id === action.meta.arg)
      state.backupNote = Object.assign({}, state.notes[position])
      state.backupPosition = position
      state.notes.splice(position, 1)
    },
    [deleteNote.fulfilled]: (state) => {
      delete state.backupNote
      delete state.backupPosition
    },
    [deleteNote.rejected]: (state) => {
      state.notes.splice(state.backupPosition, 0, state.backupNote)
      delete state.backupPosition
      delete state.backupNote
    },
  },
})

/**
 * https://redux-toolkit.js.org/api/createSelector
 * https://github.com/reduxjs/reselect
 * createSelector
 *
 * The createSelector utility from the Reselect library, re-exported for ease of use.
 *
 */
export const selectNotes = createSelector(
  (state: StateNotes) => ({
    notes: state.notes,
    error: state.error,
  }),
  (state) => state
)

export default notesSlice.reducer
