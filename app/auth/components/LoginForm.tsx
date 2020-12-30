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
    return <PasscodeCheck onSuccess={props.onSuccess} />
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <div>
        <div className="bg-blue-100 inline-block p-8 text-3xl rounded-full">
          <span role="img" aria-label="Avatar">
            🥳
          </span>
        </div>
      </div>
      <form onSubmit={form.handleSubmit} className="mt-5 flex w-full">
        <input
          className="block px-1 w-full border-gray-100 rounded-md rounded-r-none border-r-0 border-2"
          type="text"
          name="username"
          placeholder="Jane Doe"
          value={form.values.username}
          onChange={form.handleChange}
        />
        <button
          type="submit"
          className="bg-green-500 block text-white rounded-md rounded-l-none py-2 px-4"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
