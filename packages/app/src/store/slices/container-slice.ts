import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PAGE_SIZE_MAPPER } from '@dm/core'

export type RunCode = {
  value: string
  isError?: boolean
  errorMsg?: string
}

export type TableQueryPayload = {
  pageIndex: number
  pageSize: number
}

export interface ContainerState {
  wh: [number, number]
  tableQuery: Record<string, TableQueryPayload>
  tableDetailWidth: number
  sqlRunCodes: Record<string, RunCode>
}

const initialState: ContainerState = {
  wh: [0, 0],
  tableQuery: {},
  tableDetailWidth: 200,
  sqlRunCodes: {},
}

const containerSlice = createSlice({
  name: 'container',
  initialState,
  reducers: {
    setWh(state, action: PayloadAction<ContainerState['wh']>) {
      state.wh = action.payload
    },
    setTableQuery(state, action: PayloadAction<{ id: string; target: Partial<TableQueryPayload> }>) {
      if (!state.tableQuery[action.payload.id]) {
        state.tableQuery[action.payload.id] = { pageIndex: 1, pageSize: PAGE_SIZE_MAPPER['5000'] }
      }
      state.tableQuery[action.payload.id] = { ...state.tableQuery[action.payload.id], ...action.payload.target }
    },
    setSqlRunCode(state, action: PayloadAction<{ id: string; target: Partial<RunCode> }>) {
      if (!state.sqlRunCodes[action.payload.id]) {
        state.sqlRunCodes[action.payload.id] = { value: '', isError: false, errorMsg: '' }
      }
      state.sqlRunCodes[action.payload.id] = { ...state.sqlRunCodes[action.payload.id], ...action.payload.target }
    },
  },
})

export default containerSlice
