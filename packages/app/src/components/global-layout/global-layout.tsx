import React from 'react'
import { Outlet } from 'react-router-dom'

function GlobalLayout() {
  return (
    <>
      global
      <Outlet />
    </>
  )
}

export default GlobalLayout
