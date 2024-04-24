import React from 'react'
import { useGetDatabaseConfiguration } from '../../hooks'
import { Outlet } from 'react-router-dom'

function Database() {
  const { hasConfiguration } = useGetDatabaseConfiguration()

  return !hasConfiguration ? 'selected you connection' : <Outlet />
}

export default Database
