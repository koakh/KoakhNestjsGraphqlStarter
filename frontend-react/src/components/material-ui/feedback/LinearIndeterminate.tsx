import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

interface Props { color?: 'primary' | 'secondary'; }

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(2, 0, 2),
    },
  },
}));

export const LinearIndeterminate: React.FC<Props> = (props) => {
  const classes = useStyles();
  const color = (props.color) ? props.color : 'primary';
  return (
    <div className={classes.root}>
      <LinearProgress color={color} />
    </div>
  );
};