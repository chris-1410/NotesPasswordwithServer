import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NotesIcon from "@mui/icons-material/Notes";
import PasswordIcon from "@mui/icons-material/Password";
import { HomeNav } from "./HomeNav";
import { NotesMain } from "../Components/Notes/NotesMain";
import { PasswordMain } from "../Components/Password/PasswordMain";

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <React.Fragment>
      <HomeNav />
      <Tabs value={selectedTab} onChange={handleChange} centered>
        <Tab icon={<NotesIcon />} label="Notes" />
        <Tab icon={<PasswordIcon />} label="Password" />
      </Tabs>

      {selectedTab === 0 && <NotesMain />}
      {selectedTab === 1 && <PasswordMain />}
    </React.Fragment>
  );
};
