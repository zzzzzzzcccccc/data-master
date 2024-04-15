import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import thunks from '../thunks'
import { ASYNC_STATUS } from '@dm/core'

export interface ContainerState {
  wh: [number, number]
  tables: Record<string, { value: string[]; status: ASYNC_STATUS }>
  sqlRunCodes: Record<string, string>
}

const initialState: ContainerState = {
  wh: [0, 0],
  tables: {},
  sqlRunCodes: {},
}

const containerSlice = createSlice({
  name: 'container',
  initialState,
  reducers: {
    setWh(state, action: PayloadAction<ContainerState['wh']>) {
      state.wh = action.payload
    },
    setSqlRunCode(state, action: PayloadAction<{ id: string; code: string }>) {
      state.sqlRunCodes[action.payload.id] = action.payload.code
    },
  },
  extraReducers: (builder) => {
    const { fetchTables } = thunks.containerThunk

    builder.addCase(fetchTables.pending, (state, action) => {
      if (!state.tables[action.meta.arg.id]) {
        state.tables[action.meta.arg.id] = { value: [], status: ASYNC_STATUS.pending }
      }
      state.tables[action.meta.arg.id].status = ASYNC_STATUS.pending
    })
    builder.addCase(fetchTables.fulfilled, (state, action) => {
      state.tables[action.meta.arg.id].status = ASYNC_STATUS.fulfilled
      state.tables[action.meta.arg.id].value = action.payload || []
    })
    builder.addCase(fetchTables.rejected, (state, action) => {
      state.tables[action.meta.arg.id].status = ASYNC_STATUS.rejected
    })
  },
})

export default containerSlice
