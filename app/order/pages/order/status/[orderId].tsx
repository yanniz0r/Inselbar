import Page from "app/components/Page";
import { BlitzPage, useParam, useQuery } from "blitz";
import { FC, Suspense } from "react";
import getOrder from "app/order/queries/getOrder";

const OrderStatusPage: BlitzPage = () => {
  return <Page>
    <Suspense fallback="Loading...">
      <OrderStatus />
    </Suspense>
  </Page>
}

const OrderStatus: FC = () => {
  const orderId = useParam("orderId", "number");
  const [order] = useQuery(getOrder, {
    where: {
      id: orderId,
    }
  });
  return <>
    <h4 className="my-2 text-center uppercase text-gray-500 text-lg font-bold">Let's get the party started!</h4>
    <h3 className="my-3 text-center text-2xl">We received your order and will prepare your drink for you. You can already get excited for your...</h3>
    <div className="flex justify-center">
      <div className="h-40 w-40 bg-red-500 bg-cover bg-center rounded-full" style={{backgroundImage: 'url(https://placekitten.com/230/230)'}} />
    </div>
    <p  className="my-2 text-center font-bold text-green-500 text-5xl">{order.product.name}</p>
  </>
}

export default OrderStatusPage;
