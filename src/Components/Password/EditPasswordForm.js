import React from "react";
import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { PasswordContext } from "./PasswordContext";

const EditPasswordForm = ({ thePassword }) => {
  const id = thePassword.id;

  const [websitename, setWebSiteName] = useState(thePassword.websitename);
  const [websiteurl, setWebSiteUrl] = useState(thePassword.websiteurl);
  const [username, setUserName] = useState(thePassword.username);
  const [passkey, setPassKey] = useState(thePassword.passkey);

  const { updatePassword } = useContext(PasswordContext);

  const updatedPassword = { id, websitename, websiteurl, username, passkey };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword(id, updatedPassword);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="WebsiteName *"
          name="websitename"
          value={websitename}
          onChange={(e) => setWebSiteName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Website URL *"
          name="websiteurl"
          value={websiteurl}
          onChange={(e) => setWebSiteUrl(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Username / Login Email *"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          placeholder="Password *"
          name="passkey"
          value={passkey}
          onChange={(e) => setPassKey(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Edit Password
      </Button>
    </Form>
  );
};

export default EditPasswordForm;
