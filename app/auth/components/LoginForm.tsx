import React from "react"
import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={LoginInput}
        initialValues={{ username: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }}
      >
        <LabeledTextField name="username" label="Your name" placeholder="Jane Doe" />
      </Form>
    </div>
  )
}

export default LoginForm
