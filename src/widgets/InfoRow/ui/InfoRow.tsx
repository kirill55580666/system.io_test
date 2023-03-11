import React, { memo, useCallback, useEffect, useState } from "react";
import cls from "./InfoRow.module.scss";
import { Button } from "../../../shared/ui/Button/Button";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { transformDate } from "../../../shared/lib/transformDate/transformDate";
import { classNames } from "../../../shared/lib/classNames/classNames";
import CrossSvg from "../../../shared/assets/icons/cross.svg";
import { type MockData } from "../../../shared/lib/mockDataAdapter/mockData.adapter";

interface InfoRowProps {
  className?: string;
  id: number;
  name: string;
  status: boolean;
  created: string;
  setData: React.Dispatch<React.SetStateAction<MockData[]>>;
}

export const InfoRow = memo((props: InfoRowProps) => {
  const { name, status, created, className, id, setData } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState(name);
  useEffect(() => {
    if (!isOpen) {
      setTitle(name);
    }
  }, [isOpen]);

  const onCloseModalHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSaveModalHandler = useCallback(() => {
    setData((prevState) => {
      return prevState.map((item) =>
        item.id === id ? { ...item, title } : item
      );
    });
  }, [title, setData]);
  const onChangeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      <div className={classNames(cls.block, {}, [className])}>
        <div className={cls.name}>{name}</div>
        <div className={cls.status}>{status ? "Active" : "Disabled"}</div>
        <div className={cls.date}>{transformDate(created)}</div>
        <Button
          className={cls.button}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onCloseModalHandler}>
          <div className={cls.modal}>
            <div className={cls.topLine}>
              <span>Edit</span>
              <img
                alt="X"
                className={cls.closeButton}
                src={CrossSvg}
                onClick={onCloseModalHandler}
              />
            </div>
            <p className={cls.title}>Name</p>
            <input
              value={title}
              onChange={onChangeInputHandler}
              className={cls.input}
            />
            <Button className={cls.saveButton} onClick={onSaveModalHandler}>
              Save
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
});

InfoRow.displayName = "InfoRow";
