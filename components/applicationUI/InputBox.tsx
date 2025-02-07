import React, { useState } from 'react';

interface FormInputProps {
  label: string;
  id: string;
  value: string;
}

const InputBox: React.FC<FormInputProps> = ({ label, id, value  }) => {
  return (
    <div className={`form-group ${(value ? 'has-success' : 'has-error') } w-fit`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        className="form-input"
        value={value}
      />
    </div>
  );
};

export default InputBox;
