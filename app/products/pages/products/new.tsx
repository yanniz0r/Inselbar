import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProduct from "app/products/mutations/createProduct"
import ProductForm from "app/products/components/ProductForm"
import Page from "app/components/Page"

const NewProductPage: BlitzPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <Page>
      <h1 className="text-4xl">Create New Product</h1>

      <ProductForm
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const product = await createProductMutation({ data: values })
            alert("Success!" + JSON.stringify(product))
            router.push(`/products/${product.id}`)
          } catch (error) {
            alert("Error creating product " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </p>
    </Page>
  )
}

NewProductPage.getLayout = (page) => <Layout title={"Create New Product"}>{page}</Layout>

export default NewProductPage
