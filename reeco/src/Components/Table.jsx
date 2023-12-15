import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchData, updateProductStatus } from "../Redux/action";
import styled from "styled-components";
import img from "../assets/Avocado Hass.jpg";
import { Check, X, Search } from "lucide-react";

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
    data.products.map((item) => {
      if (item.id == productId) {
        item.status = "Approved";
      }
    });

    setApprovedProducts((prev) => [...prev, productId]);
    setIsApproved("Approved");

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
            <p>
              {data?.total?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
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

const commonButtonStyles = `
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const AddButton = styled.button`
  ${commonButtonStyles}
  color: #1e633f;
  border: 1px solid #1e633f;
  border-radius: 20px;
  font-weight: bold;
  margin-left: 1rem;

  &:hover {
    background-color: #ddd;
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
  /* flex: 1; */
  padding: 0.5rem;
  border: none;
  /* border-radius: 20px; */
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
  border: 1px solid black;
  margin-top: 25px;
`;

const ProductTableWrapper = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  /* overflow: hidden; */
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

// ... other styled components ...

export default Table;
