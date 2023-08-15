import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import Products from "./Components/Products";
import "./App.css";

const App = () => {
  const [data, setData] = useState(Products);
  const [allProducts, setProducts] = useState([]);
  const [show, setShow] = useState(false);          //showing the category select tag which has further options.
  useEffect(() => {
    const arrayMp = data.map((item) => {
      return (
        <ListGroup.Item key={item.price}>
          <Container>
            <Row>
              <Col lg={3}>
                <h3>{item.name}</h3>
              </Col>
              <Col lg={3}>{item.category}</Col>
              <Col lg={3}>${item.price}</Col>
              <Col lg={3}>{item.available ? "Available" : "Not-Available"}</Col>
            </Row>
          </Container>
        </ListGroup.Item>
      );
    });
    setProducts(arrayMp);
  }, [data]);

  const changeHandler1 = (event) => {
    let filteredProducts = [];
    switch (event.target.value) {
      case "priceIncrease":
        filteredProducts = Products.slice().sort((a, b) => a.price - b.price); //for filtering the products array in increasing order 
        break;
      case "priceDecrease":
        filteredProducts = Products.slice().sort((a, b) => b.price - a.price); //for filtering the products array in decreasing order

        break;
      case "available":
        filteredProducts = Products.filter((item) => {
          return item.available === true;                       //for filtering the products array with availability of product
        });
        break;
      case "notAvailable":
        filteredProducts = Products.filter((item) => {
          return item.available === false;                     //for filtering the products array with availability of product
        });
        break;
      case "category":
        setShow(true);                        //changing state to true for showing select tag for category
        filteredProducts = Products;
        break;
      default:
        filteredProducts = Products;
        break;
    }
    setData(filteredProducts);
  };
  const changeHandler2 = (event) => {
    let filteredProducts = [];
    switch (event.target.value) {
      case "Electronics":
        filteredProducts = Products.filter((item) => {    //for filtering the products array with category name Electronics
          return item.category === "Electronics";
        });
        break;
      case "Books":
        filteredProducts = Products.filter((item) => {    //for filtering the products array with category name Books
          return item.category === "Books";
        });
        break;
      case "Home & Kitchen":
        filteredProducts = Products.filter((item) => {    //for filtering the products array with category name Home & Kitchen
          return item.category === "Home & Kitchen";
        });
        break;
      case "Toys & Games":
        filteredProducts = Products.filter((item) => {
          return item.category === "Toys & Games";  //for filtering the products array with category name Toys & Games
        });
        break;
      case "Other":
        filteredProducts = Products;
        setShow(false);          //changing state to false for showing select tag for others.
        break;
      default:
        break;
    }
    setData(filteredProducts);  
  };
  return (
    <Fragment>
      <h1>Products List</h1>
      <section className="box1">
        {!show && (
          <Form.Select
            aria-label="Default select example"
            onChange={changeHandler1}
            defaultValue={""}
          >
            <option disabled value="" hidden>
              Choose filter option
            </option>
            <option value="priceIncrease">Price Increasing</option>
            <option value="priceDecrease">Price Decreasing</option>
            <option value="available">Available</option>
            <option value="notAvailable">Not-Available</option>
            <option value="category">Category</option>
          </Form.Select>
        )}
        {show && (
          <Form.Select
            aria-label="Default select example"
            onChange={changeHandler2}
            defaultValue={""}
          >
            <option disabled value="" hidden>
              Choose category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Other">Other</option>
          </Form.Select>
        )}
      </section>
      <section className="box">
        <ListGroup>{allProducts}</ListGroup>
      </section>
    </Fragment>
  );
};

export default App;
