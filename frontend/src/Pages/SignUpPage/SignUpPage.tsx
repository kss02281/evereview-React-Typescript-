import React, { Fragment, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SignUpPage.module.scss";
import { Navbar } from "../../Components/common";
import { SignUp1, SignUp2, SignUp3, SignUp4 } from "../../Components/SignUp";

const cx = classNames.bind(styles);

function SignUpPage() {
  const [stepNum, setStepNum] = useState("1");
  const onSearchSubmit = (e: string) => {
    console.log(e);
    setStepNum(e);
  };
  return (
    <Fragment>
      <Navbar />
      {`${stepNum}` === "1" && <SignUp1 onSubmit={onSearchSubmit} />}
      {`${stepNum}` === "2" && <SignUp2 onSubmit={onSearchSubmit} />}
      {`${stepNum}` === "3" && <SignUp3 onSubmit={onSearchSubmit} />}
      {`${stepNum}` === "4" && <SignUp4 onSubmit={onSearchSubmit} />}
    </Fragment>
  );
}

export default SignUpPage;
