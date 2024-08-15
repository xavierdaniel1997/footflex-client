import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const DefaultAddressModal = ({open, onClose, onConfirm, address}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Confirm Default Address"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to make this address the default address?
        </DialogContentText>
        <DialogActions sx={{mt: 3}}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DefaultAddressModal;
