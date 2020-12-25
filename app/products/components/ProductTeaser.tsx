import { Product } from "@prisma/client";
import { Link } from "blitz";
import { FC } from "react";
import { formatPrice } from "../product-utils";

interface ProductTeasterProps {
  product: Product;
}

const ProductTeaser: FC<ProductTeasterProps> = ({ product }) => {
  const price = formatPrice(product.price);
  return <Link href={`/products/${product.id}`} passHref>
    <a className="block shadow-sm bg-white rounded-md flex overflow-hidden">
      <div className="w-3/12 bg-center bg-cover" style={{ backgroundImage: `url(http://placekitten.com/300/400)` }} />
      <div className="flex-grow p-3 ">
        <div className="flex items-center">
          <h3 className="text-xl flex-grow">{product.name}</h3>
          <span>{price}</span>
        </div>
        <p className={`text-gray-500 ${product.available ? 'text-green-500' : 'text-red-500'}`}>{product.available ? 'Available' : 'Out of stock'}</p>
        <p className="text-gray-500">{product.description}</p>
        {product.available &&
          <div className="flex justify-end">
            <Link href={`/checkout/${product.id}`} passHref>
              <a className="bg-green-500 text-white block rounded-md p-1 text-sm">Order now</a>
            </Link>
          </div>
        }
      </div>
    </a>
  </Link>
}

export default ProductTeaser;