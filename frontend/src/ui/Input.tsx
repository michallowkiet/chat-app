import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  icon?: ReactNode;
  label?: string;
}

const Input = ({
  label,
  icon,

  ...props
}: InputProps) => {
  return (
    <fieldset className="fieldset relative">
      <legend className="legend font-medium text-base label">{label}</legend>
      <label className="input w-full">
        {icon}
        <input {...props} />
      </label>
    </fieldset>
  );
};

export default Input;
