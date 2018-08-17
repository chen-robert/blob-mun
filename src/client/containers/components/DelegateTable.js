import React from "react";

const DelegateTable = ({names, onClick}) => {
  return (
  <div className="table-container">
    <table className="table">
      <tbody>
        {
          names.map((name) => {
            return <tr 
            key={name}
            onClick={
              () => onClick(name)
            }
            >  
              <td>
              {name}
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
  );
}

export default DelegateTable;