import * as React from 'react'
import { errorStyle, validStyle } from '../app';
import { MessageType } from '../types';

interface Props {
  type: MessageType,
  message: string
}

export const ShowMessage: React.FC<Props> = ({ type, message }: Props) => {
  // console.log(error);
  return (<div style={type === MessageType.ERROR ? errorStyle : validStyle}>{message}</div>);
}