// import { Checkbox } from '@material-ui/core';
import React from 'react';

type PropsType = {
  checked?: boolean;
  check(id: number): void;
  id: number,
}

const Check: React.FC<PropsType> = ({checked, check, id}: PropsType) => {
  console.log('check', checked)
  return (<checkbox onClick={() => check(id)} />);
};

export default Check;
