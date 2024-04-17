import React from 'react'
import { useAppDispatch, useAppSelector, useTheme } from '../hooks'
import { history } from '../utils'
import { useParams } from 'react-router-dom'
import { setActiveTable } from '../store'

function useDatabaseItemHeaderEffect() {
  const { databaseId = '' } = useParams<{ databaseId: string }>()
  const { size } = useTheme()
  const { historyUpdate } = useAppSelector((state) => state.app)
  const { tables } = useAppSelector((state) => state.container)
  const dispatch = useAppDispatch()

  const tableItem = tables[databaseId] || {}
  const tabs = (tableItem?.value || []).map((item) => ({
    key: item,
    label: item,
  }))
  const tabActive = tableItem?.active

  const handleOnClickSqlQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    history.push(`${historyUpdate.location.pathname}/sql-query`)
  }

  const handleOnTabChange = (target: string) => {
    dispatch(setActiveTable({ id: databaseId, active: target }))
  }

  return {
    size,
    tabs,
    tabActive,
    handleOnClickSqlQuery,
    handleOnTabChange,
  }
}

export default useDatabaseItemHeaderEffect
