import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PasswordContext = createContext();

const PasswordContextProvider = (props) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    setPasswords(JSON.parse(localStorage.getItem("passwords")));
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  });

  const sortedPasswords = passwords.sort((a, b) =>
    a.websitename < b.websitename ? -1 : 1
  );

  const addPassword = (websitename, websiteurl, username, passkey) => {
    setPasswords([
      ...passwords,
      { id: uuidv4(), websitename, websiteurl, username, passkey },
    ]);
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter((password) => password.id !== id));
  };

  const updatePassword = (id, updatedPassword) => {
    setPasswords(
      passwords.map((password) =>
        password.id === id ? updatedPassword : password
      )
    );
  };

  return (
    <PasswordContext.Provider
      value={{ sortedPasswords, addPassword, deletePassword, updatePassword }}
    >
      {props.children}
    </PasswordContext.Provider>
  );
};

export default PasswordContextProvider;
