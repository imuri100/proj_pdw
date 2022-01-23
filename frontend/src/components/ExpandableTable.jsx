import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import groupByMonthCategory from "../utils/groupByMonthCategory"
import {MdExpandMore} from "react-icons/md"

const expandRow = {
  renderer: row => {
      return <table key={row} style={{width:"100%"}}>
           <tr>
                <th>Expense</th>
                <th>Value</th>
                    </tr>
          {row.spendings.map((item,index) =>{
              return(<tr>
                <td key={item.expense + index}>{item.expense}</td>
               <td key={item.value + index}>{item.value}</td>
                </tr>)})}
      </table>
}
};

const GetActionFormat = (cell,row) =>{
    return(
        <div className="row-icon-text-container">
            <span>
    <MdExpandMore/>
    </span>
    {cell}
    </div>
    )
  }


const columns = [
  {
    dataField: "category",
    text: "Category",
    formatter: GetActionFormat,
  },
  {
    dataField: "value",
    text: "Spending"
  }
];

const ExpandableTable = (props) => {

    const dataForTable = () =>{
        let categories = []
          const s =  groupByMonthCategory(props.expenses,props.selectedMonth)
  
           Object.entries(s).map(([key,value],index)=>{ 
              const obj = {}
              const category = key.split("-")[2]
             const val =value.reduce((accumulator, current) => accumulator + current.value, 0);
             obj.id = category
             obj.category = category
             obj.value = val
             obj.spendings = value
             return categories.push(obj)
          })
          return categories
       }

  return (
      <BootstrapTable
        keyField="id"
        data={dataForTable()}
        columns={columns}
        expandRow={expandRow}
        
      />
  );
}

export default ExpandableTable