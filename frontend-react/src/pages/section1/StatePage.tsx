import { Box, Button, ButtonGroup } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { ActionType, ThemeColors } from '../../app/state/reducerStateValue';
import { useStateValue } from '../../app/state/useStateValue';
import { PageTitle } from '../../components/material-ui/typography';
import { InputMouseEvent } from '../../types';
import { RouteKey, routes } from '../../app/config';

interface Props { }

type ClickHandlerAction = {
  type: ActionType,
  payload?: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
  },
}));

export const StatePage: React.FC<Props> = () => {
  // get hook
  const [state, dispatch] = useStateValue();
  // handlers
  const onClickChangeThemeHandler = (action: ClickHandlerAction) => (e: InputMouseEvent) => {
    dispatch(action);
  }
  const onClickDecrementHandler = (e: InputMouseEvent) => dispatch({ type: ActionType.DECREMENT });
  const onClickIncrementHandler = (e: InputMouseEvent) => dispatch({ type: ActionType.INCREMENT });
  const onClickSignOutHandler = (e: InputMouseEvent) => dispatch({ type: ActionType.SIGNED_OUT_USER });
  // generate buttons
  const buttons = Object.keys(ThemeColors).map(e =>
    <ToggleButton key={e} value={e.toUpperCase()} onClick={onClickChangeThemeHandler({ type: ActionType.CHANGE_THEME, payload: { newTheme: e } })}>{e}</ToggleButton>
  );
  // styles
  const classes = useStyles();
  const stateOutput = JSON.stringify(state, undefined, 2);
  const pageTitle = <PageTitle>{routes[RouteKey.STATE].title}</PageTitle>;
  const pageContent = (
    <Fragment>
      <div className={classes.root}>
        <ToggleButtonGroup value={state.theme.primary} color='primary' aria-label='outlined primary button group'>
          {buttons}
        </ToggleButtonGroup>
      </div>
      <div className={classes.root}>
        <ButtonGroup variant='contained' color='primary' aria-label='outlined primary button group'>
          <Button color='inherit' onClick={onClickDecrementHandler}>Decrement</Button>
          <Button color='inherit' onClick={onClickIncrementHandler}>Increment</Button>
          <Button color='secondary' onClick={onClickSignOutHandler}>Sign Out</Button>
        </ButtonGroup>
      </div>
      <pre>state: {stateOutput}</pre>
    </Fragment>
  );
  return (
    <Fragment>
      {pageTitle}
      <Box component='span' m={1}>
        {pageContent}
      </Box>
    </Fragment>
  );
}