import React from "react";
import EntryLevelLeftSideContainer from "../../components/Container/EntryLevelLeftSideContainer"; 
import EntryLevelRightSideContainer from "../../components/Container/EntryLevelRightSideContainer";
import RoleSelectionLayout from "../../layouts/RoleSelectionLayout";

const RoleSelection = () => {
  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="role-selectors-bg-image" />
        <EntryLevelRightSideContainer  selectionType={<RoleSelectionLayout/>} formFooterQuestion="Already have an account?" footerNavigationLink="/" footerNavigationTestId="signin-link" footerNavigateLinkContent="Sign in" buttonId="role-select"/>
      </div>
    </div>
  );
};

export default RoleSelection;
