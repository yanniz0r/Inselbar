import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
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

LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
