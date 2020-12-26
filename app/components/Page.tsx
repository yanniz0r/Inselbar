import { Link } from "blitz";
import { FC } from "react";
import { FaList } from "react-icons/fa";

const Page: FC = (props) => {
  return <div className="h-screen bg-gray-50">
    <div className="bg-gradient-to-r from-blue-600 via-purple-400 to-pink-500 py-3 flex">
      <div className="mx-auto max-w-screen-md px-4" id="logo">
        <Link href="/">
          <a>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg tracking-wide">Inselbar OS 🎉</span>
              <span className="uppercase text-xs tracking-tighter">powered by Inselbooth</span>
            </div>
          </a>
        </Link>
      </div>
      <div className="flex-grow flex justify-end align-center height-full px-4">
        <Link href="/orders" passHref>
          <a className="w-10 h-10 flex justify-center items-center bg-opacity-25 bg-white rounded-full">
            <FaList />
          </a>
        </Link>
      </div>
    </div>
    <div className="mx-auto max-w-screen-md px-4 pt-4">
      {props.children}
    </div>
  </div>
}

export default Page;