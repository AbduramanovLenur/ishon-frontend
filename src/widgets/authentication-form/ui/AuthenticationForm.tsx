import { type FC } from "react";

import { AuthForm } from "@features/auth-form";

import styles from "./AuthenticationForm.module.scss";

const AuthenticationForm : FC = () => {
  return (
    <section className={styles["auth"]}>
      <div className={styles["auth__inner"]}>
        <div className={styles["auth__wrapper"]}>
          <div className={styles["auth__logo"]}>
            Ishon
          </div>
          <AuthForm />
        </div>
      </div>
    </section>
  );
}

export default AuthenticationForm;