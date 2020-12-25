import { Product } from "@prisma/client";
import { Link } from "blitz";
import { FC } from "react";
import { formatPrice } from "../product-utils";
import {FaCocktail} from "react-icons/fa";

interface ProductTeasterProps {
  product: Product;
}

const ProductTeaser: FC<ProductTeasterProps> = ({ product }) => {
  const price = formatPrice(product.price);
  return <Link href={`/products/${product.id}`} passHref>
    <a className="block shadow-sm bg-white rounded-md overflow-hidden">
      <div className="bg-center bg-cover w-full flex justify-center items-center text-5xl text-gray-500 text-opacity-50 bg-gray-300 h-52" style={{ backgroundImage: `url(${product.image})` }}>
        {!product.image && <FaCocktail />}
      </div>
      <div className="flex-grow p-3">
        <div className="flex items-center pb-1">
          <h3 className="text-xl flex-grow font-bold text-gray-700">{product.name}</h3>
          <span className="uppercase text-white bg-pink-500 block py-1 px-2 shadow-xl rounded-lg text-sm">{price}</span>
        </div>
        <p className={`text-gray-500 py-1 ${product.available ? 'text-green-500' : 'text-red-500'}`}>{product.available ? 'Available' : 'Out of stock'}</p>
        <p className="text-gray-500 py-1">{product.description}</p>
        {product.available &&
            <Link href={`/checkout/${product.id}`} passHref>
              <a className="bg-green-500 text-white text-center block rounded-md p-2 mt-3 text-md">Order now</a>
            </Link>
        }
      </div>
    </a>
  </Link>
}

export default ProductTeaser;