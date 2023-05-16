import { Divider, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  removeProduct,
  updateQuantity,
} from "../../redux/slice/shoppingCartSlice/shoppingCartSlice";
import { ProductOrderedModel } from "../../models/productOrdered";

export const ShoppingCartItem = () => {
  const dispatch = useAppDispatch();
  const productsOrdered = useAppSelector(
    (state) => state.shoppingCart.productsOrdered
  );
  const orderedSet = new Set(productsOrdered);
  const renderProductOrdersLsite = Array.from(orderedSet);

  const handleRemoveOrderedProduct = (product: ProductOrderedModel) => {
    dispatch(removeProduct(product));
  };

  const handleQuantityChange = (e: any, product: any) => {
    console.log(e);
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    dispatch(
      updateQuantity({
        id: product.id,
        quantity: value,
        colors: product.colors,
      })
    );
  };
  const renderOrderedItems = () => {
    return !!renderProductOrdersLsite ? (
      renderProductOrdersLsite.map((product) => {
        return (
          <>
            <div className="flex">
              <img className="w-24 h-24 m-auto" src={product.image} alt="" />
              <div className="w-2/3 p-2">
                <div className="text-md py-2 font-bold">
                  <Typography
                    className="truncate font-bold"
                    fontWeight={"600"}
                    fontSize={"inherit"}
                    variant="h6"
                  >
                    {product.name}
                  </Typography>
                </div>
                <div className="flex text-center">
                  <p>Color:</p>
                  <div className="rounded-full mx-5 text-center w-1/4">
                    {product.colors}
                  </div>
                </div>
                <div>
                  <NumericFormat
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div className="flex  text-center">
                  <p>Amount:</p>
                  <input
                    onChange={(e) => handleQuantityChange(e, product)}
                    value={product.quantity}
                    className="mx-5 text-center w-1/4"
                  ></input>
                </div>
              </div>
              <div
                onClick={() => handleRemoveOrderedProduct(product)}
                className="m-auto text-red-500 hover:cursor-pointer"
              >
                <DeleteForeverIcon />
              </div>
            </div>
            <Divider></Divider>
          </>
        );
      })
    ) : (
      <></>
    );
  };
  return <div>{renderOrderedItems()}</div>;
};
