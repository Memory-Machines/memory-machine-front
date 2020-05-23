import React, { useCallback } from 'react'
import { Button } from 'evergreen-ui'
import { useLocation } from 'react-router'
import queryString from 'query-string'

function Login() {
  const { search } = useLocation()

  const parsed = queryString.parse(search)

  const login = useCallback(async (code: any) => {
    const resp = await fetch(
      `http://localhost:8080/api/auth/login?code=${code}`,
      {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
      }
    )
    const body = await resp.json()
    return body
  }, [])

  const onclick = useCallback(async () => {
    const resp = await fetch('http://localhost:8080/api/auth/login-link', {
      credentials: 'include',
      mode: 'cors',
    })
    const url = await resp.text()
    window.location.href = url
  }, [])

  if (parsed.code) {
    login(parsed.code)
      .then((d) => {
        console.log('Login Success', d)
        window.location.href = '/?'
      })
      .catch((e) => {
        console.log('Login Failed', e)
      })
  }

  return (
    <div className="loginPage">
      <Button
        onClick={onclick}
        height={42}
        appearance="primary"
        intent="success"
        iconBefore="tick-circle"
      >
        Login using Spotify
      </Button>
    </div>
  )
}

export default Login
