import React from 'react';
import { Importer, ImporterField } from 'react-csv-importer';

// include the widget CSS file whichever way your bundler supports it
import 'react-csv-importer/dist/index.css';
import { useDispatch, useStore } from 'react-redux';
import { ISubActionTypes, ISubActionCreator, ISubState } from 
'models/ISubscriptions';

function BankStatementUpload(){
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
    // company: “spotify”
    // cost: 4.99
    // currency: “cad”
    // frequence: “monthly”
    // last_payment_dt: 2023-01-01
    // next_payment_dt: 2023-02-01 (computed field)
    // student_plan_b: 0/1
    // student_plan_url: “https://www.spotify.com/ca-en/student/”

    let data = []
    let DateCol = preview.columns[0].values
    let TransactionDescriptionCol = preview.columns[1].values
    let CreditCol = preview.columns[2].values
    
    for (let i = 0; i < preview.columns[0].values.length; i++) {
        let json_entry = { 
            company: TransactionDescriptionCol[i],
            cost:  CreditCol[i],
            currency:  "USD",
            frequence: 2,
            last_payment_dt:  DateCol[i], 
            next_payment_dt:  DateCol[i], 
            student_plan_b:  0, 
            student_plan_url: 1, 
        }
        data.push(json_entry)
    }
    // // parse single json
    // let json_entry = { 
    //     company: TransactionDescriptionCol[0],
    //     cost:  CreditCol[0],
    //     currency:  "USD",
    //     frequence: 2,
    //     last_payment_dt:  DateCol[0], 
    //     next_payment_dt:  DateCol[0], 
    //     student_plan_b:  0, 
    //     student_plan_url: 1, 
    // }
    // data.push(json_entry)
    
    // console.log(data)
    // const dispatch = useDispatch();
    // dispatch({ type : ISubActionTypes.ADD, payload: {data}});

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
        </div>
    );
}

export default BankStatementUpload;