import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

interface IProps {
  key: string;
  id: string;
  value: string;
  CheckBoxcheckedHandler: (id: string, isChecked: boolean) => void;
  checked: boolean;
  required: boolean;
}
const CheckBox = ({
  id,
  checked,
  CheckBoxcheckedHandler,
  required,
  value,
}: IProps) => {
  const OnCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    CheckBoxcheckedHandler(target.id, target.checked);
  };

  return (
    <SignUpAgreementInputCss>
      <label>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={OnCheck}
          required={required}
        />
        {value}
      </label>
    </SignUpAgreementInputCss>
  );
};
export default CheckBox;

const SignUpAgreementInputCss = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1em;
`;
