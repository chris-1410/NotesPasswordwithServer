import { Modal, Button, Alert } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { PasswordContext } from "./PasswordContext";
import PasswordM from "./PasswordM";
import AddPasswordForm from "./AddPasswordForm";
import PassPagination from "./PassPagination";

const PasswordList = () => {
  const { sortedPasswords } = useContext(PasswordContext);

  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [passwordsPerPage] = useState(5);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [sortedPasswords]);

  const indexOfLastPassword = currentPage * passwordsPerPage;
  const indexOfFirstPassword = indexOfLastPassword - passwordsPerPage;
  const currentPasswords = sortedPasswords.slice(
    indexOfFirstPassword,
    indexOfLastPassword
  );
  const totalPagesNum = Math.ceil(sortedPasswords.length / passwordsPerPage);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Manage <b>Passwords</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              onClick={handleShow}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i class="material-icons add_box">&#xe146;</i>
              {""}
              <span>Add New Password</span>
            </Button>
          </div>
        </div>
      </div>

      <Alert show={showAlert} variant="success">
        Password List Updated Successfully!
      </Alert>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Website Name</th>
            <th>Website URL</th>
            <th>Username / Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPasswords.map((password) => (
            <tr key={password.id}>
              <PasswordM password={password} />
            </tr>
          ))}
        </tbody>
      </table>

      <PassPagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentPasswords={currentPasswords}
        sortedPasswords={sortedPasswords}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPasswordForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordList;
