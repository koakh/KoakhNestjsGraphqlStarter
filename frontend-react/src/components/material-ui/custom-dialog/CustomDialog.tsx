import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  ref: any,
  title?: string;
  closeButtonLabel: string;
  dialogActions: JSX.Element,
  // handleClickOpen: () => void,
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

// export const CustomDialog: React.FC<Props> = ({ref, title, closeButtonLabel, dialogActions, children}) => {
//   const [open, setOpen] = React.useState<boolean>(false);

//   useImperativeHandle(ref, () => ({
//     showAlert() {
//       alert("Child Function Called");
//     }
//   }));

//   // const handleClickOpen = () => {
//   //   setOpen(true);
//   // };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='alert-dialog-title'
//         aria-describedby='alert-dialog-description'
//       >
//         <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
//         <DialogContent>
//           {children}
//         </DialogContent>
//         <DialogActions>
//           {dialogActions}
//           <Button onClick={handleClose} color='primary' autoFocus>
//             {closeButtonLabel}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }