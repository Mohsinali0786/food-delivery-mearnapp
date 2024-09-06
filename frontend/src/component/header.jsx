import * as React from "react";
import { Button } from "@mui/material";
export default function Header() {

  return (
    <div className="header">
        <div className="headercontent">
            <h2 className="text-white">Order your favourite Food from here</h2>
            <p className="text-white">Choose what ever you want to order we are here to provide at you door within few minutes</p>
            <Button variant="conatined">View Menu</Button>
        </div>

    </div>
  );
}
