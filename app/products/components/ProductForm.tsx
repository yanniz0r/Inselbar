import Form from "app/components/Form";
import { useFormik } from "formik";
import React from "react"
import ProductsPage from "../pages/products";
import { ProductInput, ProductInputType } from "../validations";
import ImageUpload from "./ImageUpload";

type ProductFormProps = {
  initialValues: any
  onSubmit(values: ProductInputType): void;
}

const LABEL_CLASS_NAME = "text-gray-500 text-xs bold uppercase block";
const INPUT_CLASS_NAME = "block w-full p-1 border-gray-100 rounded-md border-2";

const ProductForm = ({ initialValues, onSubmit }: ProductFormProps) => {
  const form = useFormik<ProductInputType>({
    initialValues: initialValues || {
      description: '',
      name: '',
      price: 0,
    },
    onSubmit,
  });
  return (
    <form onSubmit={form.handleSubmit}>
      <div>Put your form fields here. But for now, just click submit</div>
      <div className="py-4 ">
        <label htmlFor="name" className={LABEL_CLASS_NAME}>
          Name:
        </label>
        <input type="text" name="name" className={INPUT_CLASS_NAME} value={form.values.name} onChange={form.handleChange} />
      </div>
      <div className="py-4">
        <label htmlFor="description" className={LABEL_CLASS_NAME}>
          Description:
        </label>
        <textarea name="description" className="block w-full p-1 border-gray-100 rounded-md border-2" value={form.values.description} onChange={form.handleChange} />
      </div>
      <div className="py-4">
        <label htmlFor="price" className={LABEL_CLASS_NAME}>
          Price (Cents):
        </label>
        <input type="number" name="price" className={INPUT_CLASS_NAME} value={form.values.price} onChange={form.handleChange} />
      </div>
      <div className="py-4">
        <ImageUpload onChange={(value) => form.setFieldValue('image', value) } value={form.values.image} />
      </div>
      <button className="bg-green-500 block text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  )
}

export default ProductForm
