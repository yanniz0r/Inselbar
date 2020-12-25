import { FC } from "react";

const Page: FC = (props) => {
  return <div className="h-screen bg-gray-50">
    <div className="bg-gradient-to-r from-blue-400 to-green-500 py-3">
      <div className="mx-auto max-w-screen-md px-4">
        <span className="text-white text-xl uppercase">Inselbar</span>
      </div>
    </div>
    <div className="mx-auto max-w-screen-md px-4 pt-2">
      {props.children}
    </div>
  </div>
}

export default Page;