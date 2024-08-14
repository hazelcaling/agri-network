import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadProduct } from "../../redux/product";
import "./ProductDetails.css";

function ProductDetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state?.products);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    dispatch(thunkLoadProduct(productId));
  }, [dispatch, productId]);

  return (
    <div className="product-details-container">
      <div className="product-details">
        {product.url && <img src={product.url} alt={product.product_type} />}
        <div className="product-details-body">
          <p className="product-details-posted-date">
            <strong>Posted Date: </strong>
            {product.created_at && formatDate(product.created_at)}
          </p>
          <p className="product-details-description">
            <strong>Product: </strong>
            {product.product_type}
          </p>
          <p className="product-details-description">
            <strong>Description: </strong>
            {product.description}
          </p>
          <p className="product-detail-location">
            <strong>Location: </strong>
            {product.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
