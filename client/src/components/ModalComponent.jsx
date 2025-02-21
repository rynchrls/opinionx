import { Box, Modal, useMediaQuery } from "@mui/material";
import propTypes from "prop-types";
import { memo } from "react";

const ModalComponent = memo(({ open, handleClose, children }) => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const mb = useMediaQuery("(max-width:500px)");
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: !isMobile ? "500px" : mb ? "300px" : "450px",
          height: isMobile ? "60%" : "600px",
          bgcolor: "rgba(0,0,0,1)",
          borderRadius: "6px",
          boxShadow: 24,
          p: isMobile ? 2 : 4,
        }}
      >
        {children}
      </Box>
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
