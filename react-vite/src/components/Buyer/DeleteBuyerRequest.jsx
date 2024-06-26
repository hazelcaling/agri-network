import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {  thunkDeleteBuyerReq, thunkLoadAllBuyerReq, } from "../../redux/buyer";
import './DeleteBuyerRequest.css'


function DeleteBuyerRequest({ buyerReqId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(thunkDeleteBuyerReq(buyerReqId))
        dispatch(thunkLoadAllBuyerReq())
        closeModal()
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="modal-header">Are you sure you want to delete this listing?</div>
                <div className="modal-footer">
                    <button onClick={handleDelete} className="modal-button yes">Yes</button>
                    <button onClick={closeModal} className="modal-button no">No</button>
                </div>
            </div>
        </div>
    )
}


export default DeleteBuyerRequest
