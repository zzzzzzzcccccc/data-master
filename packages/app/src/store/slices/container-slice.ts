import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RunCode = {
  value: string
  isError?: boolean
  errorMsg?: string
}

export interface ContainerState {
  wh: [number, number]
  sqlRunCodes: Record<string, RunCode>
}

const initialState: ContainerState = {
  wh: [0, 0],
  sqlRunCodes: {},
}

const containerSlice = createSlice({
  name: 'container',
  initialState,
  reducers: {
    setWh(state, action: PayloadAction<ContainerState['wh']>) {
      state.wh = action.payload
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
