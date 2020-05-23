import React, { useCallback } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { NotFound } from '../commons/components'
import { Login, LoginRedirect } from './components'

import './App.css'

function App() {
  const fetchUser = useCallback(() => {
    fetch('http://localhost:8080/api/auth/secure-route', {
      credentials: 'include',
      mode: 'cors',
    })
      .then((d) => {
        if (d.status === 401) {
          console.log('User not logged in', d)
        } else {
          console.log('User logged in', d)
        }
      })
      .catch((d) => {
        console.log('User not logged in', d)
      })
  }, [])

  fetchUser()

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/redirect/login/spotify"
            component={LoginRedirect}
          ></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
