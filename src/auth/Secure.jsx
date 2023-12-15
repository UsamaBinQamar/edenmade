"use client";

import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

const SecurePage = (props) => {
  const { Comment } = props;
  // const navigate = useNavigate();
  // const { loadingAuthUser, authUser } = useAuth();
  // useEffect(() => {
  //   if (!loadingAuthUser && !authUser) {
  //     navigate("/change-meal");
  //   }
  // }, [authUser, loadingAuthUser]);
  return (
    <>
      Usama
      <Comment />
    </>
  );
};

export default SecurePage;
