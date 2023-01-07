import React from "react";
import "../../Styles/PasswordStyles.css";
import PasswordList from "./PasswordList";
import PasswordContextProvider from "./PasswordContext";

export const PasswordMain = () => {
  return (
    <div>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <PasswordContextProvider>
              <PasswordList />
            </PasswordContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

// Parent Password Component -> New Password Comp -> Children Comp
