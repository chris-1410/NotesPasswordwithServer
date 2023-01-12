import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export const PasswordContext = createContext();

const PasswordContextProvider = (props) => {
  const email = localStorage.getItem("email");

  const [userId, setuserId] = useState();

  function getUserId() {
    var x = localStorage.getItem("email");
    const url = "http://localhost:9000/user-id";
    axios
      .post(url, {
        email: x,
      })
      .then((res) => {
        setuserId(res.data.sucess);
      });
    console.log("userId " + userId);
  }

  useEffect(() => {
    getUserId();
  }, []);

  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    displayPassword();
  }, []);

  const sortedPasswords = passwords.sort((a, b) =>
    a.websitename < b.websitename ? -1 : 1
  );

  const displayPassword = () => {
    const url = "http://localhost:9000/display-password";
    axios
      .post(url, {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setPasswords(res.data);
        console.log("Display All Passwords");
      });
  };

  const addPassword = (websitename, websiteurl, username, passkey) => {
    const url = "http://localhost:9000/add-password";
    const id = uuidv4();
    axios
      .post(url, {
        id: id,
        websitename: websitename,
        websiteurl: websiteurl,
        passkey: passkey,
        username: username,
        userid: userId,
      })
      .then((res) => {
        console.log("Added New Password");
      });
    setPasswords([
      ...passwords,
      { id: id, websitename, websiteurl, username, passkey },
    ]);
  };

  const deletePassword = (id) => {
    const url = "http://localhost:9000/delete-password";
    axios
      .post(url, {
        id: id,
      })
      .then((res) => {
        console.log("Deleted Password Entry ");
      });
    setPasswords(passwords.filter((password) => password.id !== id));
  };

  const updatePassword = (id, updatedPassword) => {
    const url = "http://localhost:9000/update-password";
    axios
      .put(url, {
        id: id,
        updatedPassword: updatedPassword,
      })
      .then((res) => {
        console.log("Updated Password Entry");
      });
    setPasswords(
      passwords.map((password) =>
        password.id === id ? updatedPassword : password
      )
    );
  };

  return (
    <PasswordContext.Provider
      value={{
        sortedPasswords,
        addPassword,
        deletePassword,
        updatePassword,
      }}
    >
      {props.children}
    </PasswordContext.Provider>
  );
};

export default PasswordContextProvider;
