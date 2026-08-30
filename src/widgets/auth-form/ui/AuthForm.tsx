import { type FC } from "react";

import { LoginForm } from "@/features/login-form";

import styles from "./AuthForm.module.scss";

const AuthForm : FC = () => {
  return (
    <section className={styles["auth"]}>
      <div className={styles["auth__inner"]}>
        <div className={styles["auth__wrapper"]}>
          <div className={styles["auth__logo"]}>
            Ishon
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}

export default AuthForm;