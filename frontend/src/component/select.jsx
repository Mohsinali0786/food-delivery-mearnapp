import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ label, options ,defaultVal ,setRole}) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setRole(event.target.value);
  };
React.useEffect(()=>{
setValue(defaultVal)
},[])
  return (
    // <Box className="">
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo- simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {options &&
          options.length > 0 &&
          options.map((val, index) => {
            return <MenuItem value={val.name}>{val.name}</MenuItem>;
          })}
      </Select>
    </FormControl>
    // </Box>
  );
}
