import { FC } from "react";

const Page: FC = (props) => {
  return <div className="h-screen bg-gray-50">
    <div className="bg-gradient-to-r from-blue-600 via-purple-400 to-pink-500 py-3">
      <div className="mx-auto max-w-screen-md px-4">
        <div className="flex flex-col">
          <span className="text-white font-semibold text-lg tracking-wide">Inselbar OS 🎉</span>
          <span className="uppercase text-xs tracking-tighter">powered by Inselbooth</span>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-screen-md px-4 pt-4">
      {props.children}
    </div>
  </div>
}

export default Page;