import { Box, Modal } from "@mui/material";
import propTypes from "prop-types";
import { memo } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "600px",
  bgcolor: "rgba(0,0,0,1)",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = memo(({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
});

ModalComponent.displayName = "modal";

export default ModalComponent;

ModalComponent.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
  children: propTypes.node,
};
