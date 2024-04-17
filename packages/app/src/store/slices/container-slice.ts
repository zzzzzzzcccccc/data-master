import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import thunks from '../thunks'
import { ASYNC_STATUS } from '@dm/core'

export interface ContainerState {
  wh: [number, number]
  tables: Record<string, { value: string[]; status: ASYNC_STATUS; active: string }>
  sqlRunCodes: Record<string, string>
  sqlRunCodesResult: Record<string, { status?: ASYNC_STATUS; data?: unknown; errorMsg?: string }>
}

const initialState: ContainerState = {
  wh: [0, 0],
  tables: {},
  sqlRunCodes: {},
  sqlRunCodesResult: {},
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
    setActiveTable(state, action: PayloadAction<{ id: string; active: string }>) {
      state.tables[action.payload.id].active = action.payload.active
    },
  },
  extraReducers: (builder) => {
    const { fetchTables, fetchRunSql } = thunks.containerThunk

    builder.addCase(fetchTables.pending, (state, action) => {
      if (!state.tables[action.meta.arg.id]) {
        state.tables[action.meta.arg.id] = { value: [], status: ASYNC_STATUS.pending, active: '' }
      }
      state.tables[action.meta.arg.id].status = ASYNC_STATUS.pending
    })
    builder.addCase(fetchTables.fulfilled, (state, action) => {
      const active = state.tables[action.meta.arg.id]?.active || ''
      const result = action.payload || []
      state.tables[action.meta.arg.id].status = ASYNC_STATUS.fulfilled
      state.tables[action.meta.arg.id].value = result
      if (active) {
        state.tables[action.meta.arg.id].active = result.indexOf(active) === -1 ? result?.[0] || '' : active
      } else {
        state.tables[action.meta.arg.id].active = result?.[0] || ''
      }
    })
    builder.addCase(fetchTables.rejected, (state, action) => {
      state.tables[action.meta.arg.id].status = ASYNC_STATUS.rejected
    })

    builder.addCase(fetchRunSql.pending, (state, action) => {
      if (!state.sqlRunCodesResult[action.meta.arg.configuration.id]) {
        state.sqlRunCodesResult[action.meta.arg.configuration.id] = { status: ASYNC_STATUS.pending }
      }
      state.sqlRunCodesResult[action.meta.arg.configuration.id].status = ASYNC_STATUS.pending
      state.sqlRunCodesResult[action.meta.arg.configuration.id].errorMsg = ''
    })
    builder.addCase(fetchRunSql.fulfilled, (state, action) => {
      state.sqlRunCodesResult[action.meta.arg.configuration.id].status = ASYNC_STATUS.fulfilled
      state.sqlRunCodesResult[action.meta.arg.configuration.id].data = action.payload
    })
    builder.addCase(fetchRunSql.rejected, (state, action) => {
      state.sqlRunCodesResult[action.meta.arg.configuration.id].status = ASYNC_STATUS.rejected
      state.sqlRunCodesResult[action.meta.arg.configuration.id].errorMsg = action.error.message
    })
  },
})

export default containerSlice
