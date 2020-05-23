import React from 'react'
import queryString from 'query-string'
import { useLocation, Redirect } from 'react-router-dom'

function LoginRedirect() {
  const { search } = useLocation()

  const parsed: any = queryString.parse(search)

  if (parsed.code) {
    return <Redirect to={`/login?code=${encodeURIComponent(parsed.code)}`} />
  }

  return <div>Login Redirect</div>
}

export default LoginRedirect
