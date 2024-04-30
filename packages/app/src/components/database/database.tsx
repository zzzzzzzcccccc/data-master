import React from 'react'
import { useGetDatabaseConfiguration } from '../../hooks'
import { Outlet } from 'react-router-dom'

function Database() {
  const { hasConfiguration, isError } = useGetDatabaseConfiguration()

  if (isError) return null

  return hasConfiguration ? <Outlet /> : 'selected your connection'
}

export default Database
