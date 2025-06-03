import React from "react";
import SignUp from "../components/signUp/signUp";  // Component import with uppercase
import PageLayout from "../layouts/PageLayout";

const SignUpPage = () => {  // Renamed the page component to avoid conflict
  return (
    <PageLayout>
      <SignUp />  {/* Correctly capitalized component */}
    </PageLayout>
  );
};

export default SignUpPage;
