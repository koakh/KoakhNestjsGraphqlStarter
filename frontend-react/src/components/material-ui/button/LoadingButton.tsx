import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

interface Props {
  label: string
}

export const LoadingButton: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Button variant='contained' disabled={loading} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setLoading(true)} >
      {loading && <CircularProgress size={14} />}
      {!loading && props.label}
    </Button>
  );
};