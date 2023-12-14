import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/action";
import styled from "styled-components";

const Table = () => {
  //   const [data, setData] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  const dispatch = useDispatch();

  const data = useSelector((store) => store.items);

  useEffect(() => {
    dispatch(fetchData);
  }, []);

  console.log(data);

  // const handleApproveOrder = () => {
  //   setIsApproved(true);
  // };

  return (
    <div>
      {/* {data.map((data, index) => ( */}
      <TableWrapper key="index">
        <div className="invoice">
          <div className="section">
            <p>Supplier:</p>
            <p>{data.supplier}</p>
          </div>
          <div className="section">
            <p>
              <strong>Shipping Date:</strong>
            </p>
            <p>{data.shippingDate}</p>
          </div>
          <div className="section">
            <p>
              <strong>Total:</strong>
            </p>
            <p>{data.total}</p>
          </div>
          <div className="section">
            <p>
              <strong>Category:</strong>
            </p>
            <>{data.category}</>
          </div>
          <div className="section">
            <p>
              <strong>Department:</strong>
            </p>
            <p>{data.department}</p>
          </div>
          <div className="section">
            <p>
              <strong>Status:</strong>{" "}
            </p>
            <p>{isApproved ? "Approved" : "Awaiting your approval"}</p>
          </div>
        </div>
      </TableWrapper>
      {/* ))} */}
    </div>
  );
};

const Table1 = styled.div`
  display: flex;
`;

const TableWrapper = styled.div`
  gap: 20px;
  border: 1px solid gray;
  padding: 10px;

  .invoice {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

`;

export default Table;
