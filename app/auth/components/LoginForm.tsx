import React from "react"
import { useMutation, useQuery } from "blitz"
import login from "app/auth/mutations/login"
import { useFormik } from "formik"
import checkPasscode from "../queries/checkPasscode"
import PasscodeCheck from "./PasscodeCheck"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const form = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: async (values) => {
      await loginMutation(values)
      props.onSuccess?.()
    },
  })

  const [isPasscodeValid] = useQuery(checkPasscode, undefined, {
    cacheTime: 0,
  })

  if (!isPasscodeValid) {
    return <PasscodeCheck />
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit}>
        <input
          className="block w-full p-1 border-gray-100 rounded-md border-2"
          type="text"
          name="username"
          placeholder="Jane Doe"
          value={form.values.username}
          onChange={form.handleChange}
        />
        <button type="submit" className="mt-4 bg-green-500 block text-white px-4 py-2 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
