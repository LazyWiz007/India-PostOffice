import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


function App() {
  
  const [value, setValue] = useState("")

  const [office, setOffice] = useState([])

  const [type, setType] = useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  }


  const getPostData = async () => {
    try {
      const data = await axios.get("https://api.postalpincode.in/" + ( type === "pin" ? "pincode/" : "postoffice/") + value);
      setOffice(data.data[0].PostOffice);
    }
      catch(e) {
        console.log(e);
      }
    };

    const searchData = () => {
      getPostData()
    };
    


  return (
    <div className="App" style ={{marginTop:"10px"}}>
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="type"
          onChange={handleChange}
        >
          <MenuItem value={"pin"}>Pin-Code</MenuItem>
          <MenuItem value={"city"}>City-Name</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <TextField id="outlined-basic"  onChange = { (e) => setValue(e.target.value)} label="City-Name" variant="outlined" />
     <Button variant="contained" onClick={searchData}>Seacrch</Button>
      <h1>Indian-PostOffice Details</h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Post-Office</StyledTableCell>
            <StyledTableCell align="right">District</StyledTableCell>
            <StyledTableCell align="right">DeliveryStatus</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {office.map((item) => {
        return  <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {item.Name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.District}</StyledTableCell>
              <StyledTableCell align="right">{item.DeliveryStatus}</StyledTableCell>

            </StyledTableRow>
      })}
           
        </TableBody>
      </Table>
    </TableContainer>
     </div>
  );
}

export default App;
