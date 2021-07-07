import numeral from "numeral";
import React from "react";
import styled from "styled-components";
const TableStyle = styled.div`
  .table {
    margin-top: 20px;
    overflow: scroll;
    height: 400px;
    color: #6a5d5d;
  }
  .table tr {
    display: flex;
    justify-content: space-between;
  }
  .table td {
    padding: 0.5rem;
  }
  .table tr:nth-of-type(even) {
    background-color: #f3f2f8;
  }
`;

function Table({ countries }) {
  return (
    <TableStyle>
      <div className="table">
        {countries.map(({ country, cases }) => (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </div>
    </TableStyle>
  );
}

export default Table;
