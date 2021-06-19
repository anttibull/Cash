import { ITotalProps } from "types/componentTypes";

export type TotalDriverSpecTypes = {
  given: {
    props: (props: ITotalProps) => TotalDriverSpecTypes;
    amountList: (amountList: number[]) => TotalDriverSpecTypes;
  };
  when: {
    created: () => TotalDriverSpecTypes;
  };
  then: {
    getTotal: () => number | null;
  };
};
