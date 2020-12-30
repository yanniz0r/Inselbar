import React, { ChangeEvent, FC, useRef, useState } from "react"
import { useMutation, useRouter } from "blitz"
import verifyPasscode from "../mutations/verifyPasscode"

const INPUT_BASE_CLASS_NAME = "border-2 border-gray-200 rounded-lg w-14 text-center mx-1 text-5xl"

const PasscodeCheck: FC = () => {
  const [verifyPasscodeMutation, verifyPasscodeStatus] = useMutation(verifyPasscode)

  const [passcode, setPasscode] = useState<Array<number | undefined>>([])
  const [error, setError] = useState(false)

  const router = useRouter()

  const input1 = useRef<HTMLInputElement>(null)
  const input2 = useRef<HTMLInputElement>(null)
  const input3 = useRef<HTMLInputElement>(null)
  const input4 = useRef<HTMLInputElement>(null)
  const inputRefs = [input1, input2, input3, input4]

  const submit = async (newPasscode: string) => {
    const result = await verifyPasscodeMutation(newPasscode)
    console.log(result)
    if (result) {
      router.push("/login")
    } else {
      setError(true)
      setPasscode([])
    }
  }

  const onKeyDown = (digit: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const enteredNumber = Number(event.target.value)
    if (enteredNumber && enteredNumber < 10) {
      setError(false)
      const newPasscode = [...passcode]
      newPasscode[digit] = enteredNumber
      setPasscode(newPasscode)
      const refIndexForTarget = inputRefs.findIndex((ref) => {
        return ref.current === event.target
      })
      if (refIndexForTarget < inputRefs.length - 1) {
        inputRefs[refIndexForTarget + 1].current?.focus()
      } else if (refIndexForTarget < inputRefs.length) {
        submit(newPasscode.join(""))
      }
    }
  }

  return (
    <div className="flex-col flex h-full justify-center items-center">
      <h1 className="text-3xl text-center mb-3">Please enter the Bars passcode to continue</h1>
      <p className="text-center mb-5 text-gray-800">
        In order to prevent some nasty booze thieves from hijacking the bar, we need to confirm that
        you are trustworthy.
      </p>
      <form>
        <input
          type="text"
          disabled={verifyPasscodeStatus.isLoading}
          className={`${INPUT_BASE_CLASS_NAME} ${error ? "border-red-500" : ""}`}
          ref={input1}
          value={passcode[0] || ""}
          onChange={onKeyDown(0)}
        />
        <input
          type="text"
          disabled={verifyPasscodeStatus.isLoading}
          className={`${INPUT_BASE_CLASS_NAME} ${error ? "border-red-500" : ""}`}
          ref={input2}
          value={passcode[1] || ""}
          onChange={onKeyDown(1)}
        />
        <input
          type="text"
          disabled={verifyPasscodeStatus.isLoading}
          className={`${INPUT_BASE_CLASS_NAME} ${error ? "border-red-500" : ""}`}
          ref={input3}
          value={passcode[2] || ""}
          onChange={onKeyDown(2)}
        />
        <input
          type="text"
          disabled={verifyPasscodeStatus.isLoading}
          className={`${INPUT_BASE_CLASS_NAME} ${error ? "border-red-500" : ""}`}
          ref={input4}
          value={passcode[3] || ""}
          onChange={onKeyDown(3)}
        />
      </form>
      {error ? (
        <p className="font-bold text-red-500 text-center mt-5">
          You're to drunk to get the funk! Back off and drink some water!
        </p>
      ) : null}
    </div>
  )
}

export default PasscodeCheck
