import React from 'react'
import { ASYNC_STATUS } from '@dm/core'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setSqlRunCode, fetchRunSql, fetchTables } from '../store'
import { useParams } from 'react-router-dom'

function useDatabaseItemSqlQueryEffect() {
  const { databaseId = '' } = useParams<{ databaseId: string }>()
  const { connectionConfigurations } = useAppSelector((state) => state.app)
  const { wh, sqlRunCodes, sqlRunCodesResult } = useAppSelector((state) => state.container)
  const dispatch = useAppDispatch()

  const connectionConfiguration = connectionConfigurations.find((item) => item.id === databaseId)
  const code = sqlRunCodes[databaseId] || ''
  const codeRunningResult = sqlRunCodesResult?.[databaseId] || {}
  const codeRunning = codeRunningResult?.status === ASYNC_STATUS.pending
  const codeRunningError = codeRunningResult?.status === ASYNC_STATUS.rejected
  const codeRunningResultErrorMsg = codeRunningResult?.errorMsg || ''

  const handleOnCodeChanged = (target = '') => {
    dispatch(setSqlRunCode({ id: databaseId, code: target }))
  }

  const handleOnClickRunCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (connectionConfiguration && !codeRunning && code.trim()) {
      dispatch(fetchRunSql({ configuration: connectionConfiguration, code })).then((action) => {
        if (action.meta.requestStatus === ASYNC_STATUS.fulfilled) {
          dispatch(fetchTables(connectionConfiguration))
        }
      })
    }
  }

  return {
    wh,
    code,
    codeRunning,
    codeRunningError,
    codeRunningResultErrorMsg,
    handleOnCodeChanged,
    handleOnClickRunCode,
  }
}

export default useDatabaseItemSqlQueryEffect
