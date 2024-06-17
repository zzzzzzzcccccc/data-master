import React, { useLayoutEffect } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import GlobalLayout from '../global-layout'
import Database, { DatabaseItem, DatabaseItemTable, DatabaseItemSqlQuery } from '../database'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { history } from '../../utils'
import { setHistoryUpdate } from '../../store'
import { BASE_ROUTE, URI_NAMESPACES } from '@dm/core'
import { i18nConfig } from '../../config'

function App() {
  const { historyUpdate } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  useAppSelector(
    (state) => state.app.theme.lang,
    (pre, next) => {
      i18nConfig.changeLanguage(next)
      return pre === next
    },
  )

  useLayoutEffect(() => {
    const unbind = history.listen((update) => {
      dispatch(setHistoryUpdate(update))
    })

    return () => {
      unbind()
    }
  }, [dispatch])

  return (
    <Router navigator={history} location={historyUpdate.location} navigationType={historyUpdate.action}>
      <Routes>
        <Route path={BASE_ROUTE} element={<GlobalLayout />}>
          <Route path={URI_NAMESPACES.database} element={<Database />}>
            <Route path=":databaseId" element={<DatabaseItem />}>
              <Route path=":table" element={<DatabaseItemTable />}>
                <Route path="sql-query" element={<DatabaseItemSqlQuery />} />
              </Route>
              <Route path="sql-query" element={<DatabaseItemSqlQuery />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
