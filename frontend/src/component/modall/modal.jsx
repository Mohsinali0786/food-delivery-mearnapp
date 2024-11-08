import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import "./modal.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ title, header ,onOk ,setQuantity , foodId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button className="p-0 m-0" onClick={handleOpen}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {header}
          </Typography>
            <TextField
              className="mt-20"
              id="outlined-basic"
              label="Add Quantity"
              variant="outlined"
              placeholder="Add Quantity"
              fullWidth={true}
              onChange={(e)=>setQuantity(e.target.value)}
            />
            <Button variant="mt-20 contained" onClick={()=>{onOk(foodId);handleClose()}}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
}
