import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import { postRequest } from "../../utils/service";
import { toast } from "react-toastify";
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

export default function UpdatePriceModal({
  title,
  header,
  onOk,
  setQuantity,
  foodId,
}) {
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState({
    off: 0,
    org: 0,
    mrp:0,
    //   data?.price?.org -
    //   (data?.price?.org * e.target.value) / 100,
  });
  const [discount, setDiscount] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const update = async(id) =>{
    console.log('id',id)
    const res = await postRequest(`/updateQuantity/${id}`,{price:{org:price?.org,off:price?.off,mrp:price.off > 0 ? 
        Math.ceil(price?.org -
          (price?.org * price?.off) / 100): price.org,}})
    console.log('resssssssss',res)
    toast.success(res.message)
  }
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
            label="Set Price"
            variant="outlined"
            placeholder="Set Price"
            fullWidth={true}
            onChange={(e) => setPrice({...price,org:e.target.value})}
          />
          <div className="discountBox">
            <div className="">
                {
                    !discount ? 
                    <span className="discountText">Discount %</span>
                    :
                    null
                }
              <input
                type="checkbox"
                name="discount"
                value={discount}
                onChange={(e) => setDiscount(!discount)}
              />
            </div>
            {discount ? (
                
                <input  placeholder="Discount %"
                onChange={(e) => setPrice({...price,off:e.target.value})}
/>
            //   <TextField
            //     className="mt-20"
            //     id="outlined-basic"
            //     label="Discount (%)"
            //     variant="outlined"
            //     placeholder="Discount (%)"
            //     fullWidth={true}
            //     onChange={(e) => setQuantity(e.target.value)}
            //   />
            ) : null}
          </div>
          <Button
            variant="mt-20 contained"
            onClick={() => {
              update(foodId);
              handleClose();
            }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
