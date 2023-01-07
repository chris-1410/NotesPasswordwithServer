import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotesIcon from "@mui/icons-material/Notes";
import PasswordIcon from "@mui/icons-material/Password";
import { HomeNav } from "./HomeNav";
import { NotesMain } from "../Components/Notes/NotesMain";
import { PasswordMain } from "../Components/Password/PasswordMain";
import { Dashboard } from "./Dashboard";

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <React.Fragment>
      <HomeNav />
      <Tabs value={selectedTab} onChange={handleChange} centered>
        <Tab icon={<DashboardIcon />} label="Dashboard" />
        <Tab icon={<NotesIcon />} label="Notes" />
        <Tab icon={<PasswordIcon />} label="Password" />
      </Tabs>
      {selectedTab === 0 && <Dashboard />}
      {selectedTab === 1 && <NotesMain />}
      {selectedTab === 2 && <PasswordMain />}
    </React.Fragment>
  );
};
