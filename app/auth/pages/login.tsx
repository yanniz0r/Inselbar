import React, { Suspense } from "react"
import { useRouter, BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import Page from "app/components/Page"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Page>
      <Suspense fallback="Loading...">
        <LoginForm onSuccess={() => router.push("/")} />
      </Suspense>
    </Page>
  )
}

export default LoginPage
