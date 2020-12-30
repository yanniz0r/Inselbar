import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { usePaginatedQuery, BlitzPage } from "blitz"
import getProducts from "app/products/queries/getProducts"
import ProductTeaser from "app/products/components/ProductTeaser"
import Page from "app/components/Page"
import LoadingSpinner from "app/components/LoadingSpinner"

export const ProductsList = () => {
  const [{ products }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "asc" },
  })

  return (
    <div>
      {products.map((product) => (
        <div className="mb-5">
          <ProductTeaser product={product} />
        </div>
      ))}
    </div>
  )
}

const ProductsPage: BlitzPage = () => {
  return (
    <Page>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductsList />
      </Suspense>
    </Page>
  )
}

ProductsPage.getLayout = (page) => <Layout title={"Products"}>{page}</Layout>

export default ProductsPage
