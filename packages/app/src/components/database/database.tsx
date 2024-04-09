import React from 'react'
import { useDatabaseEffect } from '../../effects'
import { Outlet } from 'react-router-dom'

function Database() {
  const { databaseId } = useDatabaseEffect()

  return !databaseId ? 'selected you connection' : <Outlet />
}

export default Database
