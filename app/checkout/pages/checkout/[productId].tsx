import { Product } from "@prisma/client";
import Page from "app/components/Page";
import { formatPrice } from "app/products/product-utils";
import getProduct from "app/products/queries/getProduct";
import { BlitzPage, useParam, useQuery, useRouter } from "blitz";
import { FC, Suspense } from "react";

const CheckoutPage: BlitzPage = (props) => {
  return <Page>
    <h1 className="text-4xl pb-2">Checkout</h1>
    <p className="text-gray-500">Please check your order and whether you have capacity to destroy the tasty liquid you are going to order.</p>
    <Suspense fallback="Loading...">
      <Checkout />
    </Suspense>
    <button className="bg-blue-500 text-white w-full p-3 rounded-lg font-bold">
      Order now
    </button>
  </Page>
}

const Checkout: FC = () => {
  const productId = useParam("productId", "number")
  const [product] = useQuery(getProduct, { where: { id: productId } })
  return <div className="bg-white my-6 shadow-sm rounded-lg overflow-hidden">
    <div className="relative">
      <img src="http://placekitten.com/700/620" />
      <div className="absolute top-0 right-0">
        <span className="uppercase text-white bg-pink-500 block py-1 px-2 shadow-xl rounded-lg m-2">{formatPrice(product.price)}</span>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="p-4 bg-gradient-to-t from-black to-transparent py-3">
          <h2 className="text-white font-bold text-4xl">{product.name}</h2>
        </div>
      </div>
    </div>
    <div className="p-4">
      {product.description}
    </div>
  </div>
}

export default CheckoutPage;
