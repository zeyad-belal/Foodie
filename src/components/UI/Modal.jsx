import classes from "./Modal.module.css";
import ReactDom from "react-dom";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.toggleCart}></div>;
}

function ModalOverlay(props) {
  return <div className={classes.modal}>{props.children}</div>;
}

const modalDestintion = document.getElementById("overlayers");

function Modal(props) {
  return (
    <>
      {ReactDom.createPortal(<Backdrop toggleCart={props.toggleCart} />, modalDestintion)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalDestintion
      )}
    </>
  );
}

export default Modal;
