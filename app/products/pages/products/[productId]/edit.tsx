import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import ProductForm from "app/products/components/ProductForm"
import Page from "app/components/Page"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product, { setQueryData }] = useQuery(getProduct, { where: { id: productId } })
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <Page>
      <h1 className="text-4xl">Edit Product {product.id}</h1>

      <ProductForm
        initialValues={product}
        onSubmit={async (values) => {
          try {
            const updated = await updateProductMutation({
              where: { id: product.id },
              data: {
                name: values.name,
                description: values.description,
                price: values.price,
                image: values.image,
                intensity: values.intensity,
                available: values.available,
              },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/products/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing product " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </Page>
  )
}

const EditProductPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct />
      </Suspense>

      <p>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </p>
    </div>
  )
}

EditProductPage.getLayout = (page) => <Layout title={"Edit Product"}>{page}</Layout>

export default EditProductPage
