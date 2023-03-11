import { memo, type ReactNode } from "react";
import cls from "./Button.module.scss";
import { classNames } from "../../../shared/lib/classNames/classNames";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = memo((props: ButtonProps) => {
  const { children, disabled, onClick, className, ...otherProps } = props;
  return (
    <button
      className={classNames(cls.button, {}, [className])}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
