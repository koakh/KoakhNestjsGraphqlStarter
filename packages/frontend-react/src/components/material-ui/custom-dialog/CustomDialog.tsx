import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * use with
 * const childRef = useRef<{ open: () => void }>();
 * now use childRef with
 * const handleClickOpen = () => { childRef.current.open(); }
 * this will fire child component function
 */

interface Props {
  ref: any,
  title?: string;
  closeButtonLabel: string;
  dialogActions?: JSX.Element,
}

export const CustomDialog: React.FC<Props> = forwardRef(({ title, closeButtonLabel, dialogActions, children }, ref) => {
  const [open, setOpen] = React.useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    // expose fn to outside world ex call it with childRef.current.open();
    open() { handleClickOpen(); }
  }));
  // handlers
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {dialogActions}
          <Button onClick={handleClose} color='primary' autoFocus>
            {closeButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
