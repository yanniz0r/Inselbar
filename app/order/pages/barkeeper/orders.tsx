import Page from "app/components/Page"
import { BlitzPage, useMutation, useQuery } from "blitz"
import { FC, Suspense } from "react"
import getOrders from "app/order/queries/getOrders"
import { Order } from "@prisma/client"
import updateOrder from "app/order/mutations/updateOrder"

const BarkeeperOrdersPage: BlitzPage = () => {
  return (
    <Page>
      <h1>Orders</h1>
      <Suspense fallback="Loading...">
        <Orders />
      </Suspense>
    </Page>
  )
}

const Orders: FC = () => {
  const [orders, ordersQuery] = useQuery(getOrders, {
    where: {
      status: {
        not: "DONE",
      },
    },
  })
  const [updateOrderMutation] = useMutation(updateOrder)

  const prepare = (order: Order) => async () => {
    await updateOrderMutation({ where: { id: order.id }, data: { status: "INPROGRESS" } })
    await ordersQuery.refetch()
  }

  const complete = (order: Order) => async () => {
    await updateOrderMutation({ where: { id: order.id }, data: { status: "DONE" } })
    await ordersQuery.refetch()
  }

  return (
    <table className="table-auto w-full border-t-2 border-gray-200">
      {orders.map((order) => (
        <tr className="border-top-2 border-grey-500 w-full border-gray-200 border-b-2">
          <td>
            1 x <span className="font-bold">{order.product.name}</span>
          </td>
          <td>for {order.user.username}</td>
          <td className="py-4 flex justify-end">
            {order.status === "INPROGRESS" ? (
              <button
                type="button"
                className="bg-green-500 text-white rounded-lg p-1"
                onClick={complete(order)}
              >
                Finish
              </button>
            ) : (
              <button
                type="button"
                className="bg-pink-600 text-white rounded-lg p-1"
                onClick={prepare(order)}
              >
                Prepare
              </button>
            )}
          </td>
        </tr>
      ))}
    </table>
  )
}

export default BarkeeperOrdersPage
