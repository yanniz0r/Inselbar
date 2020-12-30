import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import Page from "app/components/Page"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Page>
      <LoginForm onSuccess={() => router.push("/")} />
    </Page>
  )
}

export default LoginPage
