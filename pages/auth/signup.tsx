import React from "react";
import Layout from "../../components/Layout";
import LoginOrRegisterForm from "../../components/LoginOrRegisterForm";

const SignUp = () => {
  return (
    <Layout title="Register">
      <LoginOrRegisterForm isLogin={false} />
    </Layout>
  );
};

export default SignUp;
