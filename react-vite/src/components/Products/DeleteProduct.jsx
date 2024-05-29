import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteProduct, thunkLoadProducts} from "../../redux/product";

function DeleteProduct({ productId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(thunkDeleteProduct(productId)).then(() => {
            dispatch(thunkLoadProducts())
        })
        closeModal()
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleDelete}>Yes (Delete Product)</button>
            <button onClick={closeModal}>No (Keep Product)</button>
        </div>
    )
}


export default DeleteProduct
