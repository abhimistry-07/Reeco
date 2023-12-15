import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchData, updateProductStatus } from "../Redux/action";
import styled from "styled-components";
import img from "../assets/Avocado Hass.jpg";
import { Check, X, Search, ChevronRight } from "lucide-react";

const Table = () => {
  const [isApproved, setIsApproved] = useState("");
  const [approvedProducts, setApprovedProducts] = useState([]);
  const dispatch = useDispatch();
  let data = useSelector((store) => store.items);

  const addToApprovedProducts = () => {
    const approvedProductIds = data?.products
      ?.filter((item) => item.status === "Approved")
      .map((item) => item.id);
    setApprovedProducts(approvedProductIds);
  };

  const handleApprove = (productId) => {
    const currentStatus = data.products.find(
      (product) => product.id === productId
    )?.status;

    if (currentStatus !== "Approved") {
      data.products.map((item) => {
        if (item.id == productId) {
          item.status = "Approved";
        }
      });

      setApprovedProducts((prev) => [...prev, productId]);
      setIsApproved("Approved");
    } else {
    }

    dispatch(updateProductStatus(data));
  };

  const handleReject = (productId) => {
    const currentStatus = data.products.find(
      (product) => product.id === productId
    )?.status;

    const newStatus =
      currentStatus === "Missing" ? "Missing – Urgent" : "Missing";

    data.products.map((item) => {
      if (item.id == productId) {
        item.status = newStatus;
      }
    });

    // console.log(data,"In comp");

    dispatch(updateProductStatus(data));
    setApprovedProducts((prev) => prev.filter((id) => id !== productId));
    setIsApproved(currentStatus === "Missing" ? "Missing – Urgent" : "Missing");
  };

  const getRejectIconColor = (status) => {
    switch (status) {
      case "Missing":
        return "orange";
      case "Missing – Urgent":
        return "red";
      default:
        return "black";
    }
  };

  const getApproveIconColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      default:
        return "black";
    }
  };

  const handleAddItem = () => {
    const maxID = data.products[data.products.length - 1].id;

    const brands = ["Brand1", "Brand2", "Brand3", "Brand4"];

    const randomBrand = brands[Math.floor(Math.random() * brands.length)];

    const randomPrice = Math.floor(Math.random() * 1000) + 1;

    const randomQuantity = Math.floor(Math.random() * 10) + 1;

    const total = randomPrice * randomQuantity;

    const newItem = {
      id: maxID + 1,
      name: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. vvdoloribus laborum distinctio ipsum dolore recusandae",
      brand: randomBrand,
      price: randomPrice,
      quantity: randomQuantity,
      total: total,
      status: "Approved",
    };

    // console.log(newItem);
    data.products.push(newItem);

    dispatch(addItem(data));
  };

  useEffect(() => {
    dispatch(fetchData);
    // addToApprovedProducts();
  }, []);

  return (
    <div>
      <OrderInfo>
        <FirstLine>
          <p>
            Orders
            <ChevronRight
              className="chevron-icon"
              style={{ width: "15px", margin: "0px" }}
            />
            Order 32457ABC
          </p>
        </FirstLine>
        <SecondLine>
          <div>
            <p>Order 32457ABC</p>
          </div>
          <div>
            <AddButton>Back</AddButton>
            <ApproveButton>Approve order</ApproveButton>
          </div>
          {/* {order.id} */}
        </SecondLine>
      </OrderInfo>
      <TableWrapper key="index">
        <div className="invoice">
          <div className="section">
            <p>
              <strong>Supplier</strong>
            </p>
            <p>{data.supplier}</p>
          </div>
          <div className="section">
            <p>
              <strong>Shipping Date</strong>
            </p>
            <p>{data.shippingDate}</p>
          </div>
          <div className="section">
            <p>
              <strong>Total</strong>
            </p>
            <p>
              {data?.total?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="section">
            <p>
              <strong>Category</strong>
            </p>
            <p>{data.category}</p>
          </div>
          <div className="section">
            <p>
              <strong>Department</strong>
            </p>
            <p>{data.department}</p>
          </div>
          <div className="section">
            <p>
              <strong>Status</strong>{" "}
            </p>
            <p>{isApproved ? "Approved" : "Awaiting your approval"}</p>
          </div>
        </div>
      </TableWrapper>
      <Table2>
        <SearchSection>
          <div>
            <SearchInput type="text" placeholder="Search..." />
            <div className="searchIcon">
              <Search />
            </div>
          </div>
          <AddButton onClick={handleAddItem}>Add Item</AddButton>
        </SearchSection>
        <ProductTableWrapper>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={img} alt="" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>
                    {/* {product.price} */}
                    {product?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{product.quantity}</td>
                  <td>
                    {/* {product.total} */}
                    {product?.total?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{product.status}</td>
                  <td
                    className="icon"
                    onClick={() => handleApprove(product.id)}
                  >
                    <Check
                      // color={isApproved ? "Green" : "Black"}
                      // style={{
                      //   cursor: "pointer",
                      //   color: approvedProducts?.includes(product.id)
                      //     ? "green"
                      //     : "black",
                      // }}
                      style={{
                        cursor: "pointer",
                        color: getApproveIconColor(product.status),
                      }}
                    />
                  </td>
                  <td className="icon" onClick={() => handleReject(product.id)}>
                    <X
                      style={{
                        cursor: "pointer",
                        color: getRejectIconColor(product.status),
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProductTableWrapper>
      </Table2>
    </div>
  );
};

const TableWrapper = styled.div`
  width: 90%;
  margin: auto;
  box-shadow: 0 4px 8px rgba(7, 7, 7, 0.1);
  border: 0.1px solid rgba(7, 7, 7, 0.1);
  border-radius: 10px;

  .invoice {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* margin: 10px 25px; */
    padding: 20px;
  }

  .section {
    /* border: 1px solid #ddd; */
    text-align: left;
    padding: 10px;
    margin: 0 5px;
    border-left: 1px solid #ddd;

    p {
      margin: 0;
    }

    p:nth-child(1) {
      color: gray;
      font-size: 12px;
    }

    p:nth-child(2) {
      font-size: 15px;
      font-weight: 600;
    }

    &:first-child {
      border-left: none;
    }
  }
`;

const OrderInfo = styled.div`
  padding: 1% 5%;
  margin-bottom: 25px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FirstLine = styled.div`
  text-align: left;

  p {
    margin: 0;
  }

  .chevron-icon {
    vertical-align: middle;
  }
`;

const SecondLine = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  padding-bottom: 0;

  p {
    font-weight: bold;
    font-size: 18px;
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;
  }
`;

const commonButtonStyles = `
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const ApproveButton = styled.button`
  ${commonButtonStyles}
  color: #ffffff;
  background-color: #1e633f;
  border: 1px solid #1e633f;
  border-radius: 20px;
  font-weight: bold;
  margin-left: 1rem;

  &:hover {
    background-color: #ddd;
    color: #1e633f;
  }
`;

const AddButton = styled.button`
  ${commonButtonStyles}
  color: #1e633f;
  border: 1px solid #1e633f;
  border-radius: 20px;
  font-weight: bold;
  margin-left: 1rem;

  &:hover {
    background-color: #1e633f;
    color: #ffffff;
  }
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 95%;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #fff;
  margin-top: 25px;

  & > svg {
    margin-right: 1rem;
  }

  div:nth-child(1) {
    display: flex;
    border: 1px solid black;
    border-radius: 50px;
    padding: 1px 20px;

    .searchIcon {
      display: flex;
      align-items: center;
    }
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  width: 280px;
  outline: none;
  font-size: 16px;

  &::placeholder {
    color: #ccc;
  }
`;

const Table2 = styled.div`
  width: 90%;
  margin: auto;
  /* border: 1px solid black; */
  margin-top: 25px;
  box-shadow: 0 4px 8px rgba(7, 7, 7, 0.1);
  border: 0.1px solid rgba(7, 7, 7, 0.1);
  border-radius: 10px;
`;

const ProductTableWrapper = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      /* border: 1px solid #ddd; */
      border-bottom: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    td:nth-child(2) {
      max-width: 200px;
    }

    tbody tr:hover {
      background-color: #f5f5f5;
    }

    img {
      width: 30px;
    }

    .icon {
      cursor: pointer;
    }
  }
`;

export default Table;
