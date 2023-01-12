import { Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { PasswordContext } from "./PasswordContext";

const AddPasswordForm = () => {
  const { addPassword } = useContext(PasswordContext);

  const [newPassword, setNewPassword] = useState({
    websitename: "",
    websiteurl: "",
    passkey: "",
    username: "",
  });

  const onInputChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const { websitename, websiteurl, username, passkey } = newPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    addPassword(websitename, websiteurl, username, passkey);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="WebsiteName *"
          name="websitename"
          value={websitename}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Website URL *"
          name="websiteurl"
          value={websiteurl}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Username / Login Email *"
          name="username"
          value={username}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          placeholder="Password "
          name="passkey"
          value={passkey}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Add New Password
      </Button>
    </Form>
  );
};

export default AddPasswordForm;
