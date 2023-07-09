import { useDispatch } from "react-redux";
import { cartActions } from "../../store/store";
import classes from "./Modal.module.css";
import ReactDom from "react-dom";


function Backdrop(props) {
  const dispatch = useDispatch()
  return <div className={classes.backdrop} onClick={()=> dispatch(cartActions.toggleCart())}></div>;
}

function ModalOverlay(props) {
  return <div className={classes.modal}>{props.children}</div>;
}

const modalDestintion = document.getElementById("overlayers");

function Modal(props) {
  const dispatch = useDispatch()
  return (
    <>
      {ReactDom.createPortal(<Backdrop toggleCart={()=> dispatch(cartActions.toggleCart())} />, modalDestintion)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalDestintion
      )}
    </>
  );
}

export default Modal;
