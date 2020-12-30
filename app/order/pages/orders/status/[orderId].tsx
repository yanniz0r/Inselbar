import Page from "app/components/Page"
import { BlitzPage, useParam, useQuery } from "blitz"
import { FC, Suspense } from "react"
import getOrder from "app/order/queries/getOrder"
import { BiCheck } from "react-icons/bi"
import { FaCocktail } from "react-icons/fa"
import { GiLemon } from "react-icons/gi"
import { OrderStatus } from "@prisma/client"

const OrderStatusPage: BlitzPage = () => {
  return (
    <Page>
      <Suspense fallback="Loading...">
        <OrderStatusInfos />
      </Suspense>
    </Page>
  )
}

const OrderStatusInfos: FC = () => {
  const orderId = useParam("orderId", "number")
  const [order] = useQuery(getOrder, {
    where: {
      id: orderId,
    },
  })

  let progressClassName
  switch (order.status) {
    case OrderStatus.INPROGRESS:
      progressClassName = "w-2/4"
      break
    case OrderStatus.DONE:
      progressClassName = "w-full"
      break
    case OrderStatus.SUBMITTED:
    default:
      progressClassName = "w-0"
  }

  return (
    <>
      <h4 className="my-2 text-center uppercase text-gray-500 text-lg font-bold">
        Let's get the party started!
      </h4>
      <h3 className="my-3 text-center">
        We received your order and will prepare your drink for you. You can already get excited for
        your...
      </h3>
      {order.product.image && (
        <div className="flex justify-center">
          <div
            className="h-32 w-32 bg-red-500 bg-cover bg-center rounded-full"
            style={{ backgroundImage: `url(${order.product.image})` }}
          />
        </div>
      )}
      <p className="my-2 text-center font-bold text-green-500 text-lg">{order.product.name}</p>
      <div className="px-8 py-5">
        <div className="relative ">
          <div className="rounded-lg bg-gray-200 h-2 overflow-hidden">
            <div className={`h-full w-half bg-green-400 ${progressClassName} rounded-lg`} />
          </div>
          <div className="absolute w-full transform -translate-y-5">
            <div className="absolute flex flex-col items-center transform -translate-x-1/2">
              <div className="mb-2 h-8 w-8 text-black text-opacity-40 flex justify-center items-center bg-green-400 rounded-full">
                <BiCheck />
              </div>
              <p className="text-xs text-center">
                We received
                <br /> your order
              </p>
            </div>
            <div className="absolute flex flex-col items-center left-1/2 transform -translate-x-1/2">
              <div
                className={`mb-2 h-8 w-8 text-black text-opacity-40 flex justify-center items-center ${
                  order.status !== OrderStatus.SUBMITTED ? "bg-green-400" : "bg-gray-200"
                } rounded-full`}
              >
                <GiLemon />
              </div>
              <p className="text-xs text-center">
                Your drinks
                <br />
                are being mixed
              </p>
            </div>
            <div className="absolute flex flex-col items-center left-full transform -translate-x-1/2">
              <div
                className={`mb-2 h-8 w-8 text-black text-opacity-40 flex justify-center items-center ${
                  order.status === OrderStatus.DONE ? "bg-green-400" : "bg-gray-200"
                } rounded-full`}
              >
                <FaCocktail />
              </div>
              <p className="text-xs text-center">Your order is ready</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderStatusPage
