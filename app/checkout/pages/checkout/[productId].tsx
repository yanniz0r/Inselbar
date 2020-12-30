import Page from "app/components/Page"
import { formatPrice } from "app/products/product-utils"
import getProduct from "app/products/queries/getProduct"
import { AuthorizationError, BlitzPage, useMutation, useParam, useQuery, useRouter } from "blitz"
import { FC, Suspense } from "react"
import createOrder from "app/checkout/mutations/createOrder"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { FaCocktail } from "react-icons/fa"

const CheckoutPage: BlitzPage = (props) => {
  return (
    <Page>
      <h1 className="text-4xl pb-2">Checkout</h1>
      <p className="text-gray-500">
        Please check your order and whether you have capacity to destroy the tasty liquid you are
        going to order.
      </p>
      <Suspense fallback="Loading...">
        <Checkout />
      </Suspense>
    </Page>
  )
}

const Checkout: FC = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product] = useQuery(getProduct, { where: { id: productId } })
  const [createOrderMutation] = useMutation(createOrder)
  const currentUser = useCurrentUser()
  const submitOrder = async () => {
    if (!currentUser) {
      throw new AuthorizationError()
    }
    const result = await createOrderMutation({
      data: {
        product: {
          connect: {
            id: product.id,
          },
        },
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        price: product.price,
      },
    })
    router.push(`/orders/status/${result.id}`)
  }
  return (
    <>
      <div className="bg-white my-6 shadow-sm rounded-lg overflow-hidden">
        <div className="relative">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="p-24 text-5xl flex justify-center items-center bg-gray-300 text-gray-500 text-opacity-50">
              <FaCocktail />
            </div>
          )}
          <div className="absolute top-0 right-0">
            <span className="uppercase text-white bg-pink-500 block py-1 px-2 shadow-xl rounded-lg m-2">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="absolute bottom-0 w-full">
            <div className="p-4 bg-gradient-to-t from-gray-700 to-transparent py-3">
              <h2 className="text-white font-bold text-4xl">{product.name}</h2>
            </div>
          </div>
        </div>
        <div className="p-4">{product.description}</div>
      </div>
      <button
        type="button"
        onClick={submitOrder}
        className="bg-blue-500 text-white w-full p-3 rounded-lg font-bold"
      >
        Order now
      </button>
    </>
  )
}

export default CheckoutPage
