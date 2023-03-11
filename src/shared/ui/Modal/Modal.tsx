import React, {
  type ReactNode,
  type ReactElement,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { classNames, type Mods } from "../../lib/classNames/classNames";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal = (props: ModalProps): ReactElement => {
  const { isOpen, onClose, children, className } = props;

  const onContentClickHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
  };

  const closeHandler = useCallback(() => {
    if (onClose == null) return;
    onClose();
  }, [onClose]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeHandler();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  const container = document.body;
  const jsx = (
    <div className={classNames(cls.modal, mods, [className])}>
      <div onClick={closeHandler} className={cls.overlay}>
        <div onClick={onContentClickHandler} className={cls.content}>
          {children}
        </div>
      </div>
    </div>
  );
  return createPortal(jsx, container);
};

Modal.displayName = "Modal";
