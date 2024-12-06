import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, type, message, ...other } = props;

  const handleCancel = () => {
    onClose("cancelled");
  };

  const handleOk = () => {
    onClose("confirmed");
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle
        sx={{
          color: "warning.main",
          display: "flex",
          alignItems: "center",
        }}
      >
        <DeleteIcon /> Confirmation
      </DialogTitle>
      {message && (
        <DialogContent dividers>
          <Typography>{message}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialogRaw;
