import { OrderStatus } from "@prisma/client"
import LoadingSpinner from "app/components/LoadingSpinner"
import Page from "app/components/Page"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import getOrders from "app/order/queries/getOrders"
import { AuthorizationError, BlitzPage, useQuery } from "blitz"
import { FC, Suspense } from "react"
import { FaCocktail, FaHourglassHalf } from "react-icons/fa"
import { GiLemon } from "react-icons/gi"

const OrdersPage: BlitzPage = () => {
  return (
    <Page>
      <Suspense fallback={<LoadingSpinner />}>
        <OrdersInfo />
      </Suspense>
    </Page>
  )
}

const OrdersInfo: FC = () => {
  const currentUser = useCurrentUser()
  if (!currentUser) {
    throw new AuthorizationError()
  }
  const [orders] = useQuery(getOrders, {
    where: {
      user: {
        id: currentUser.id,
      },
    },
  })
  return (
    <table className="w-full">
      {orders.map((order) => (
        <tr className="border-top-2 border-grey-500 w-full border-gray-200 border-b-2">
          <td>
            1 x <span className="font-bold">{order.product.name}</span>
          </td>
          <td>
            <span>
              {order.status === "SUBMITTED" && <FaHourglassHalf />}
              {order.status === "INPROGRESS" && <GiLemon />}
              {order.status === "DONE" && <FaCocktail />}
            </span>
          </td>
        </tr>
      ))}
    </table>
  )
}

export default OrdersPage
