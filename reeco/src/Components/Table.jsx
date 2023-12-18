import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  editPriceQuantity,
  fetchData,
  updateProductStatus,
} from "../Redux/action";
import styled from "styled-components";
import img from "../assets/Avocado Hass.jpg";
import { Check, X, Search, ChevronRight, Printer } from "lucide-react";
import {
  Modal,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Image,
  VStack,
  HStack,
  Spacer,
  Box,
} from "@chakra-ui/react";

const Table = () => {
  const [isApproved, setIsApproved] = useState("");
  const [selectedProductStatus, setSelectedProductStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataToBeEdit, setDataToBeEdit] = useState({});
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [total, setTotal] = useState(null);
  const [reason, setReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  let data = useSelector((store) => store.items);
  let loading = useSelector((store) => store.loading);

  const handleEdit = (productID) => {
    const currentData = data?.products?.find(
      (product) => product.id === productID
    );

    setDataToBeEdit(currentData);

    onOpen();
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
      setIsApproved("Approved");
    }

    dispatch(updateProductStatus(data));
  };

  const handleReject = (productId) => {
    const currentStatus = data.products.find(
      (product) => product.id === productId
    )?.status;

    setSelectedProductId(productId);

    setSelectedProductStatus(currentStatus);

    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmMissingModal = () => {
    const currentStatus = data.products.find(
      (product) => product.id === selectedProductId
    )?.status;

    const newStatus =
      currentStatus === "Missing" ? "Missing – Urgent" : "Missing";

    data.products.map((item) => {
      if (item.id == selectedProductId) {
        item.status = newStatus;
      }
    });

    dispatch(updateProductStatus(data));

    setIsApproved(currentStatus === "Missing" ? "Missing – Urgent" : "Missing");

    // Close the modal
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Missing":
        return "orange";
      case "Missing – Urgent":
        return "red";
      default:
        return "white";
    }
  };

  const handleAddItem = () => {
    const maxID = data.products[data.products.length - 1].id;

    const brands = [
      "Farm Fresh",
      "Pasta Paradise",
      "Green Farms",
      "Happy Hens",
    ];

    const randomBrand = brands[Math.floor(Math.random() * brands.length)];

    const randomPrice = Math.floor(Math.random() * 1000) + 1;

    const randomQuantity = Math.floor(Math.random() * 10) + 1;

    const total = randomPrice * randomQuantity;

    const newItem = {
      id: maxID + 1,
      name: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
      brand: randomBrand,
      price: randomPrice,
      quantity: randomQuantity,
      total: total,
      status: "",
    };

    data.products.push(newItem);

    dispatch(addItem(data));
  };

  const handleSubmit = () => {
    let updatedData = { ...dataToBeEdit };

    if (price) {
      updatedData = { ...updatedData, newPrice: +price };
    }

    if (quantity) {
      updatedData = { ...updatedData, newQuantity: +quantity };
    }

    if (total) {
      updatedData = { ...updatedData, newTotal: +total };
    }

    if (reason !== "") {
      updatedData = { ...updatedData, reason: reason };
    }

    setDataToBeEdit(updatedData);

    const newData = data?.products?.map((product) => {
      if (product.id == updatedData.id) {
        return { ...updatedData };
      }
      return product;
    });

    data.products = newData;

    dispatch(editPriceQuantity(data));

    setPrice(null);
    setQuantity(null);
    setTotal(null);

    onClose();
  };

  // console.log(dataToBeEdit, ">>>>>>>>>>>/////");

  const handleReason = (e) => {
    setReason(e.target.value);
    // console.log(e.target.value);
  };

  const filteredProducts = data?.products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(filteredProducts);

  useEffect(() => {
    dispatch(fetchData);

    if (quantity) {
      setTotal(price * quantity);
    } else {
      setTotal(price * dataToBeEdit.quantity);
    }
  }, [price, quantity, total]);

  // console.log(price, quantity, total);

  return (
    <div>
      <OrderInfo>
        <FirstLine>
          <p>Orders</p>
          <ChevronRight
            className="chevron-icon"
            style={{ width: "15px", margin: "0px" }}
          />
          <p>Order 32457ABC</p>
        </FirstLine>
        <SecondLine>
          <div>
            <p>Order 32457ABC</p>
          </div>
          <div>
            <AddButton>Back</AddButton>
            <ApproveButton>Approve order</ApproveButton>
          </div>
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
      {loading ? (
        <Spinner
          mt="150px"
          size="xl"
          color="#1e633f"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          // color="blue.500"
        />
      ) : (
        <Table2>
          <SearchSection>
            <div>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="searchIcon">
                <Search />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AddButton onClick={handleAddItem}>Add Item</AddButton>
              <Printer style={{ color: "#1e633f", marginLeft: "50px" }} />
            </div>
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
                      {product?.newPrice
                        ? product?.newPrice?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : ""}
                      <br />
                      {product?.newPrice ? (
                        <Text as="del" m="0">
                          {product?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Text>
                      ) : (
                        <Text m="0">
                          {product?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Text>
                      )}
                    </td>
                    <td>
                      {/* {product.quantity} */}
                      {product?.newQuantity ? product?.newQuantity : null}
                      <br />
                      {product?.newQuantity ? (
                        <Text as="del" m="0">
                          {product.quantity}
                        </Text>
                      ) : (
                        <Text m="0">{product?.quantity}</Text>
                      )}
                    </td>
                    <td>
                      {/* {product?.total?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })} */}
                      {product?.newTotal
                        ? product?.newTotal?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : ""}
                      <br />
                      {product?.newTotal ? (
                        <Text as="del" m="0">
                          {product?.total?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Text>
                      ) : (
                        <Text m="0">
                          {product?.total?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Text>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Text
                        style={{
                          backgroundColor: getStatusColor(product.status),
                          borderRadius: "20px",
                          position: "relative",
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        {product.newPrice && product.newQuantity
                          ? "Quantity and Price updated"
                          : product.newPrice
                          ? "Price Updated"
                          : product.newQuantity
                          ? "Quantity Updated"
                          : product.status}
                      </Text>
                    </td>
                    <td
                      className="icon"
                      onClick={() => handleApprove(product.id)}
                    >
                      <Check
                        style={{
                          cursor: "pointer",
                          color: getApproveIconColor(product.status),
                        }}
                      />
                    </td>
                    <td
                      className="icon"
                      onClick={() => handleReject(product.id)}
                    >
                      <X
                        style={{
                          cursor: "pointer",
                          color: getRejectIconColor(product.status),
                        }}
                      />
                    </td>
                    <td
                      style={{ cursor: "pointer", fontWeight: "bold" }}
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ProductTableWrapper>
        </Table2>
      )}
      {isModalOpen && (
        <>
          <ModalWrapper className="modal">
            <p>{`${selectedProductStatus} product`}</p>
            <p>
              {`Is 'Lorem, ipsum dolor ...'
          ${
            data.products.find((product) => product.id === selectedProductId)
              ?.status == "Missing"
              ? "urgent"
              : "Missing"
          }?`}
            </p>
            <Button
              mt="5"
              colorScheme="teal"
              onClick={handleConfirmMissingModal}
            >
              Yes
            </Button>
            <Button ml="2" mt="5" colorScheme="teal" onClick={handleCloseModal}>
              No
            </Button>
          </ModalWrapper>
        </>
      )}

      {/* <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${selectedProductStatus} product`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {`Is 'Lorem, ipsum dolor ...'
          ${
            data.products.find((product) => product.id === selectedProductId)
              ?.status == "Missing"
              ? "urgent"
              : "Missing"
          }?`}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleConfirmMissingModal}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      <FormControl>
        <Modal onClose={onClose} size="xl" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{dataToBeEdit.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text fontSize="xl" color="gray">
                American Roland
              </Text>
              <FormControl mt="4">
                <Flex>
                  <Image src={img} boxSize="150px" alt="American Roland" />
                  <Spacer />
                  <VStack w="350px">
                    <HStack
                      w="350px"
                      spacing="px"
                      justify="space-between"
                      align="center"
                    >
                      <FormLabel>Price($)</FormLabel>
                      <Input
                        w="200px"
                        placeholder={dataToBeEdit.price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        // value={dataToBeEdit.price}
                      />
                    </HStack>
                    <HStack
                      w="350px"
                      spacing="px"
                      justify="space-between"
                      align="center"
                    >
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        w="200px"
                        placeholder={dataToBeEdit.quantity}
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                        // value={dataToBeEdit.}
                      />
                    </HStack>
                    <HStack
                      w="350px"
                      spacing="px"
                      justify="space-between"
                      align="center"
                    >
                      <FormLabel>Total</FormLabel>
                      <Button w="200px">
                        {total
                          ? total
                          : dataToBeEdit.price * dataToBeEdit.quantity}
                      </Button>
                    </HStack>
                  </VStack>
                </Flex>
              </FormControl>
              <Box>
                <Text as="b">Choose Reason</Text>
                <HStack mt="5">
                  <Button
                    bg="white"
                    border="1px solid black"
                    borderRadius="20px"
                    value="Missing Product"
                    onClick={handleReason}
                  >
                    Missing Product
                  </Button>
                  <Button
                    bg="white"
                    border="1px solid black"
                    borderRadius="20px"
                    value="Quantiy is not same"
                    onClick={handleReason}
                  >
                    Quantiy is not same{" "}
                  </Button>
                  <Button
                    bg="white"
                    border="1px solid black"
                    borderRadius="20px"
                    value="Price is not same"
                    onClick={handleReason}
                  >
                    Price is not same{" "}
                  </Button>
                  <Button
                    bg="white"
                    border="1px solid black"
                    borderRadius="20px"
                    value="Other"
                    onClick={handleReason}
                  >
                    Other{" "}
                  </Button>
                </HStack>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
              <Button
                colorScheme="blue"
                ml={3}
                onClick={handleSubmit}
                type="submit"
              >
                Send
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </FormControl>
    </div>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: #1e633f;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: left;

  p:nth-child(1) {
    /* color: gray;
    font-size: 12px; */
    font-size: 20px;
    font-weight: 600;
  }

  p:nth-child(2) {
  }

  button {
    /* background-color: aliceblue; */
    /* color: white; */
  }
`;

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
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }

  .chevron-icon {
    margin-left: 5px;
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
  padding: 0.5rem 0rem;
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
