import React from "react";

import { render, fireEvent, RenderResult } from "@testing-library/react";

import { Button, ButtonType, IProps } from "./Button";
import { testIds } from "./testIds";

const exist = (page: RenderResult, selector: string) => {
  try {
    const element = page.getByTestId(selector) as HTMLElement;
    return !!element;
  } catch {
    return false;
  }
};

export const createButtonDriver = () => {
  let _props: IProps, _wrapper: RenderResult;

  const btnClick = (selector: string) => {
    const { getByTestId } = _wrapper;
    const element = getByTestId(selector);
    fireEvent.click(element);
  };

  const driver = {
    given: {
      props: (props: IProps) => {
        _props = props;
        return driver;
      },
      withConfirm: (withConfirm: boolean) => {
        _props = {
          ..._props,
          withConfirm,
        };
        return driver;
      },
      text: (text: string) => {
        _props = {
          ..._props,
          text,
        };
        return driver;
      },
      click: (onClick: () => void) => {
        _props = {
          ..._props,
          onClick,
        };
        return driver;
      },
      type: (type: ButtonType) => {
        _props = {
          ..._props,
          type,
        };
        return driver;
      },
    },
    when: {
      created: () => {
        _wrapper = render(<Button {..._props} />);
        return driver;
      },
      btnClick: () => {
        btnClick(testIds.btn);
        return driver;
      },
      confirmBtnClick: () => {
        btnClick(testIds.btnConfirm);
        return driver;
      },
      cancelBtnClick: () => {
        btnClick(testIds.btnCancel);
        return driver;
      },
    },
    then: {
      confirmationWrapperExist: () =>
        exist(_wrapper, testIds.confirmationWrapper),
      btnType: () => {
        const btn: any = _wrapper.getByTestId(testIds.btn);
        return btn.type;
      },
      isBtnDisabled: () => {
        try {
          const button: any = _wrapper.getByTestId(testIds.btn);
          return button.disabled;
        } catch {
          return null;
        }
      },
    },
  };
  return driver;
};
