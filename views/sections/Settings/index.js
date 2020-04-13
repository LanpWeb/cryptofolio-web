import React from "react";
import Header from "components/Header";
import Input from "components/Input";
import PasswordInput from "components/PasswordInput";
import Button from "components/Button";


const Settings = () => (
  <section className="settings">
    <Header className="settings__header" />
    <div className="container settings__inner">
      <div className="settings__wrapper">
        <h2 className="h2 settings__caption">Settings</h2>
        <div className="settings__details">
          <h3 className="c2 fw-semi-bold settings__subcaption">Email change</h3>
          <Input label="Current email" shape="border-none" size="auto" acentLabel wrapClassName="settings__field" />
          <PasswordInput label="Confirm password" shape="border-none" size="auto" acentLabel wrapClassName="settings__field settings__field_last" />
          <Button size="auto" height="lg" className="settings__btn">Update email</Button>
        </div>
        <div className="settings__details">
          <h3 className="c2 fw-semi-bold settings__subcaption">Password change</h3>
          <PasswordInput label="Old password" shape="border-none" size="auto" acentLabel wrapClassName="settings__field" />
          <PasswordInput label="New password" shape="border-none" size="auto" acentLabel wrapClassName="settings__field" />
          <PasswordInput label="Confirm new password" shape="border-none" size="auto" acentLabel wrapClassName="settings__field settings__field_last" />
          <Button size="auto" height="lg" className="settings__btn">Change password</Button>
        </div>
      </div>
    </div>
  </section>
);

export default Settings;
