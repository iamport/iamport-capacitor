import React, { forwardRef } from 'react';
import { Select, Icon } from 'antd';

const { Option } = Select;

interface eachData {
  label: string;
  value: string | number;
};
interface SelectorProps {
 data: Array<eachData>;
 value: string | number;
 initialValue: string | number;
 onChange?: any;
};
const Selector = forwardRef((props: SelectorProps, ref: any ) => {
  const { data, value, initialValue, onChange } = props;
  return (
    <Select
      ref={ref}
      size="large"
      defaultValue={initialValue}
      value={value}
      onChange={onChange}
      suffixIcon={<Icon type="caret-down" />}
    >
      {data.map((eachData: eachData) => {
        const { label, value } = eachData;
        return <Option value={value} key={value}>{label}</Option>;
      })}
    </Select>
  );
});

export default Selector;