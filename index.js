const columnDefs = [
      { headerName: "S.NO", field: "sNO", cellClass: "grid-cell-centered" },
      { field: "Name" },
      { field: "Email" },
      {field: "Balance"}
    ];

    // specify the data
    var rowData = [
      { sNO: "1", Name: "AMAN", Email: "aman@email.com", Balance: 455000 },
      { sNO: "2", Name: "ADITYA", Email: "aditya@email.com", Balance: 915500 },
      { sNO: "3", Name: "ABHIJEET", Email: "abhijeet@email.com", Balance: 116400 },
      { sNO: "4", Name: "SAKSHI", Email: "sakshi@email.com", Balance: 54000 },
      { sNO: "5", Name: "DIVYANSHI", Email: "divyanshi@email.com", Balance: 482000 },
      { sNO: "6", Name: "AKSHAT", Email: "akshat@email.com", Balance: 95000 },
      { sNO: "7", Name: "SUHANI", Email: "suhani@email.com", Balance: 789650 },
      { sNO: "8", Name: "FARHAAN", Email: "farhaan@email.com", Balance: 854400 },
      { sNO: "9", Name: "IQRA", Email: "iqra@email.com", Balance: 224000 },
      { sNO: "10", Name: "ADITI", Email: "aditi@email.com", Balance: 160000 },
    ];

    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      defaultColDef: {
        resizable: true,
        minWidth: 80,
        flex: 1,
        filter: true
        //enablePivot: true,
    },
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    paginationNumberFormatter: function (params) {
        return '[' + params.value.toLocaleString() + ']';
    },
    };

    document.addEventListener("DOMContentLoaded", function () {
        // lookup the container we want the Grid to use
        var eGridDiv = document.querySelector('#myGrid');
        // create the grid passing in the div to use together with the columns & data we want to use
        new agGrid.Grid(eGridDiv, gridOptions);
    });
    function onPageSizeChanged(newPageSize) {
    var value = document.getElementById('page-size').value;
    gridOptions.api.paginationSetPageSize(Number(value));
}

function modalDisplay(){
  console.log("I am here")
  $('#instructions').modal('show');
}

function updateRecord(){
  let recieverName = $("#receiversName").val();
  let recieverAmount = $("#Amount").val();
  let senderName = $("#sendersName").val();
  var re = new RegExp("^[0-9]+$");
  console.log("recieverName =  " + recieverName );
  console.log("recieverAmount = " + recieverAmount);
  if(senderName == '' && recieverName == '' && recieverAmount === ''){
    alert("Please Provide Name and Amount to proceed");
  }
  for(let i = 0; i < rowData.length; i++){
    if(rowData[i].Name == recieverName){
      let balance = parseInt(rowData[i].Balance, 10);
      rowData[i].Balance = parseInt(recieverAmount,10) + balance;
      console.log(rowData[i].Balance);
    }
    if(rowData[i].Name == senderName){
      let balance = parseInt(rowData[i].Balance, 10);
      rowData[i].Balance = balance - parseInt(recieverAmount,10) ;
      console.log(rowData[i].Balance);
    }
  }
  alert("TRANSACTION SUCCESSFULL !!")
  gridOptions.api.redrawRows();
  $('#instructions').modal('hide');
}