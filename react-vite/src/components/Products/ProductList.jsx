import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadProducts } from "../../redux/product"
import ProductCard from "./ProductCard"
import ProductForm from "./CreateProductForm"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { SearchBar } from "../SearchFilter"

function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const productsArr = Object.values(products)
  const [isLoaded, setIsloaded] = useState(false)
  const isLoggedIn = useSelector((state) => state.session.user !== null)
  const isFarmer = useSelector(
    (state) => state.session.user?.user_type === "farmer"
  )

  useEffect(() => {
    dispatch(thunkLoadProducts()).then(() => setIsloaded(true))
  }, [dispatch])

  if (products.length === 0) <h2>Loading....</h2>

  return (
    <>
      {!isLoggedIn ? (
        <div className="create">
          <OpenModalButton
            buttonText="Create a new Listing"
            modalComponent="Login is required to create listing"
          />
        </div>
      ) : isFarmer ? (
        <div className="create">
          <OpenModalButton
            buttonText="Create a new Listing"
            modalComponent={<ProductForm />}
          />
        </div>
      ) : (
        ""
      )}
      <SearchBar />
      <div className="listings-container">
        {isLoaded &&
          productsArr.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
            />
          ))}
      </div>
    </>
  )
}

// Hello
export default ProductList
