import { useContext, useState, useEffect } from "react";
import { PasswordContext } from "./PasswordContext";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditPasswordForm from "./EditPasswordForm";

const PasswordM = ({ password }) => {
  const { deletePassword } = useContext(PasswordContext);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [password]);

  return (
    <>
      <td>{password.websitename}</td>
      <td>{password.websiteurl}</td>
      <td>{password.username}</td>
      <td>{password.passkey}</td>
      <td>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE254;</i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
          <button
            onClick={() => deletePassword(password.id)}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPasswordForm thePassword={password} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PasswordM;
