import React, { useEffect, useState } from "react";

// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Importer, ImporterField } from 'react-csv-importer';
// include the widget CSS file whichever way your bundler supports it
import 'react-csv-importer/dist/index.css';
import { useDispatch, useStore } from 'react-redux';
import { ISubActionTypes, ISubActionCreator, ISubState } from 
'models/ISubscriptions';
import { Button } from "./Button";


type resultProps = {
  email: string;
  gender: string;
};

interface rowsProps {
    company: string,
    cost: string,
    frequency: string,
    currency:  string,
    last_payment_dt: string,
    next_payment_dt: string,
    student_plan_b: number,
    student_plan_url: string,
    // children?: React.ReactNode; // 👈️ for demo purposes
  }
  
function BankStatementUpload(){
    const [result, setResult] = useState<resultProps[]>([]);

    useEffect(() => {
      const api = async () => {
        const data = await fetch("localhost:8000/cohere_qa_bot/?q=netflix", {
          method: "GET"
        });
        const jsonData = await data.json();
        setResult(jsonData.results);
      };
  
      api();
    }, []);

    // const ref = useRef(null!);
    const handleClick = () => {
        const api = async () => {
            const data = await fetch("http://localhost:8000/cohere_qa_bot/?q=netflix", {
              method: "GET"
            });
            const jsonData = await data.json();
            setResult(jsonData.results);
            console.log(result)
          };
      
          api();
    }


    const exEmptyRow: rowsProps[] = [];
    // const empty: Props = {rowsProps: exEmptyRow}
    // const [emp, setemp] = useState(empty);

    const [RowData, setRowData] = useState(exEmptyRow);
    return (
        
        <div>
             "Transactions"   
             <Importer
  dataHandler={async (rows, { startIndex }) => {
    // required, may be called several times
    // receives a list of parsed objects based on defined fields and user column mapping;
    // (if this callback returns a promise, the widget will wait for it before parsing more data)
    // for (row of rows) {
    // //   await myAppMethod(row);
    // }
  }}
  defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
  restartable={false} // optional, lets user choose to upload another file when import is complete
  onStart={({ file, preview, fields, columnFields }) => {
    // optional, invoked when user has mapped columns and started import
    // prepMyAppForIncomingData();
  }}
  onComplete={({ file, preview, fields, columnFields }) => {
    // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
    // showMyAppToastNotification();
    console.log(fields)
    console.log(preview)
    console.log(file)

    // let data = []
    var data: rowsProps[] = []

    let DateCol = preview.columns[0].values
    let TransactionDescriptionCol = preview.columns[1].values
    let CreditCol = preview.columns[2].values
    
    for (let i = 0; i < preview.columns[0].values.length; i++) {
        let json_entry = { 
            company: TransactionDescriptionCol[i],
            cost:  CreditCol[i],
            currency:  "USD",
            frequency: "monthly",
            last_payment_dt:  DateCol[i], 
            next_payment_dt:  DateCol[i], 
            student_plan_b:  0, 
            student_plan_url: "https://www.spccard.ca/", 
        }
        data.push(json_entry)
    }

    // console.log(data)
    // const dispatch = useDispatch();
    // dispatch({ type : ISubActionTypes.ADD, payload: {data}});
        // <DenseTable rows={data}> </DenseTable>
    setRowData(data)

  }}
  onClose={({ file, preview, fields, columnFields }) => {
    // optional, if this is specified the user will see a "Finish" button after import is done,
    // which will call this when clicked
    // goToMyAppNextPage();
  }}

  // CSV options passed directly to PapaParse if specified:
  // delimiter={...}
  // newline={...}
  // quoteChar={...}
  // escapeChar={...}
  // comments={...}
  // skipEmptyLines={...}
  // delimitersToGuess={...}
  // chunkSize={...} // defaults to 10000
  // encoding={...} // defaults to utf-8, see FileReader API
>
  <ImporterField name="date" label="Date" />
  <ImporterField name="transactionDescription" label="Transaction Description" />
  <ImporterField name="debit" label="Debit" />
  <ImporterField name="credit" label="Credit" optional />
  <ImporterField name="balance" label="Balance" optional />

    </Importer>;
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>company</TableCell>
            <TableCell align="right">cost</TableCell>
            <TableCell align="right">frequency</TableCell>
            <TableCell align="right">currency</TableCell>
            <TableCell align="right">last_payment_dt</TableCell>
            <TableCell align="right">next_payment_dt</TableCell>
            <TableCell align="right">student_plan_b</TableCell>
            <TableCell align="right">student_plan_url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {RowData.map((row) => (
            <TableRow
              key={row.company}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.company}
              </TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{row.frequency}</TableCell>
              <TableCell align="right">{row.currency}</TableCell>
              <TableCell align="right">{row.last_payment_dt}</TableCell>
              <TableCell align="right">{row.next_payment_dt}</TableCell>
              <TableCell align="right">{row.student_plan_b}</TableCell>
              <TableCell align="right">{row.student_plan_url}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <h1>
        {result.map((value) => {
          return (
            <div>
              <div>{value.email}</div>
              <div>{value.gender}</div>
            </div>
          );
        })}
      </h1>
      <h2>Start editing to see some magic happen!</h2>
      <Button onClick={handleClick}>
      button
    </Button>
    {result}
    console.log({result}) */}
        </div>
    );
}

export default BankStatementUpload;
