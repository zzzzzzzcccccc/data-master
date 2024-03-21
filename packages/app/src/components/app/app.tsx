import React, { useEffect, useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import GlobalLayout from '../global-layout'
import { history } from '../../utils'

function App() {
  const [update, setUpdate] = useState({ location: history.location, action: history.action })

  useEffect(() => {
    const unbind = history.listen((update) => {
      setUpdate(update)
    })

    return () => {
      unbind()
    }
  }, [])

  return (
    <Router navigator={history} location={update.location} navigationType={update.action}>
      <Routes>
        <Route path="/" element={<GlobalLayout />} />
      </Routes>
    </Router>
  )
}

export default App
