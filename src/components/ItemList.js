import React, { useState } from "react";
import styles from "./ItemLIst.module.css";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 20;

function ItemList({ product, Delete, onEdit }) {
  const sortPrices = (prices) => {
    return prices.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  };

  console.log("sorted", sortPrices(product.prices));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();

    if (event.target.innerText === "Edit") {
      onEdit(product.id);

      handleClose();
      return;
    } else if (event.target.innerText === "Delete") {
      Delete(product.id);
      handleClose();
    }
    console.log(event.target.innerText);
  };

  const openAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //console.log(anchorEl);

  return (
    <div className={styles.container}>
      <div className={styles.actionContainer}>
        <Accordion style={{ width: "90%" }}>
          <AccordionSummary
            //   expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={styles.productNameContainer}>
              {" "}
              <Typography className={styles.h1}>
                {product?.name ? product.name : "N/A"}
              </Typography>{" "}
              <Typography className={styles.h1}>
                Current Price:{sortPrices(product?.prices)?.[0].price}
              </Typography>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className={styles.priceHistoryContainer}>
              {sortPrices(product?.prices).map(({ price }) => {
                return (
                  <div>
                    <Typography> Price :{price}</Typography>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>

        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={openAction}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClick={(e) => handleClick(e)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
