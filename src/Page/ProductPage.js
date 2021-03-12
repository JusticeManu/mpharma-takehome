import React, { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import { Box, StylesProvider } from "@material-ui/core";
import axios from "axios";
import styles from "./ProductPage.module.css";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";

import CircularProgress from "@material-ui/core/CircularProgress";

function ProductPage(props) {
  // const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => setIsOpen(false);
  // const onOpen = () => setIsOpen(true);
  const [editState, setEditState] = useState(false);
  const [products, setProducts] = useState([]);
  const arrayToHoldProducts = [...products];
  const [open, setOpen] = React.useState(false);
  const [productEditId, setProductEditId] = [];
  const [productToEdit, setProductEdit] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);

  //Handles submit and update
  const onSubmit = (data) => {
    console.log(data);

    const newProduct = {
      id: products.length + 1,
      name: data.name,
      prices: [{ id: Math.random(0, 1), price: data.price, date: new Date() }],
    };
    console.log("new", newProduct);

    if (editState) {
      handleEdit(productToEdit.id, data);
      handleClose();
      return;
    }

    setProducts((oldData) => [...oldData, newProduct]);
    handleClose();
  };

  //handle opening of modal
  const handleOpen = () => {
    setOpen(true);
  };

  //handle closing of modal
  const handleClose = () => {
    setOpen(false);
  };

  //handle delete of product name without deleting total price history
  const handleDelete = (id) => {
    alert("Are you sure you want to delete");

    console.log("id", id);
    const modifiedProducts = products.map((product) => {
      if (product.id === id) {
        return { id: product.id, prices: product.prices };
      }
      return product;
    });
    console.log("newProducts", modifiedProducts);

    setProducts(modifiedProducts);
  };

  //handle editing of product
  const handleEdit = (id, data) => {
    let editted;
    products.forEach((product, index) => {
      if (product.id === id) {
        editted = {
          ...product,
          name: data.name,
          prices: [...product.prices, { price: data.price, date: new Date() }],
        };

        products.splice(index, 1, editted);
      }
    });
    setProducts(products);

    console.log({ editted });

    setEditState(false);
  };

  //handle the edit modal with pre-populated data
  const handleEditModal = (id) => {
    setOpen(true);

    setEditState(true);
    const productToEdit = products.find((product) => product.id === id);
    setProductEdit(productToEdit);
    console.log(id);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://www.mocky.io/v2/5c3e15e63500006e003e9795"
        );
        console.log(data.products);
        data && setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
  }, []);

  console.log(products);
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          {" "}
          <CircularProgress color="blue" />
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.addProductButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleOpen}
            >
              Add Product
            </Button>
          </div>

          <div>
            {" "}
            {products.map((product, id) => {
              return (
                <div key={id}>
                  {" "}
                  <ItemList
                    id={id}
                    product={product}
                    Delete={(inde) => handleDelete(inde)}
                    onEdit={(inde) => handleEditModal(inde)}
                  ></ItemList>
                </div>
              );
            })}
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={styles.paper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* register your input into the hook by invoking the "register" function */}
                  <div className={styles.formContainer}>
                    <input
                      name="name"
                      defaultValue={
                        productToEdit?.name ? productToEdit.name : ""
                      }
                      ref={register}
                    />

                    {/* include validation wit vvh required or other standard HTML validation rules */}
                    <input
                      name="price"
                      defaultValue={
                        productToEdit?.prices
                          ? productToEdit.prices[0].price
                          : ""
                      }
                      ref={register({ required: true })}
                    />
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && (
                      <span>This field is required</span>
                    )}

                    <input type="submit" />
                  </div>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
