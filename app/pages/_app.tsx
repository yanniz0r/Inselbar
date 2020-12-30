import LoginForm from "app/auth/components/LoginForm"
import PasscodeCheck from "app/auth/components/PasscodeCheck"
import { PasscodeRequiredError } from "app/auth/errors"
import LoadingSpinner from "app/components/LoadingSpinner"
import Page from "app/components/Page"
import { AppProps, ErrorComponent, useRouter, AuthenticationError, AuthorizationError } from "blitz"
import { Suspense } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"
import "tailwindcss/tailwind.css"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log("ERROR", error)
  if (error instanceof AuthenticationError) {
    return (
      <Page>
        <Suspense fallback={<LoadingSpinner />}>
          <LoginForm onSuccess={resetErrorBoundary} />
        </Suspense>
      </Page>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else if (error instanceof PasscodeRequiredError) {
    return <PasscodeCheck />
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
