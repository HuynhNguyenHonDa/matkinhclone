import { Box } from "@mui/material";
import { NumericFormat } from "react-number-format";
import FormControl from "@mui/material/FormControl";
import { ProductModel } from "../../models/product";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addMoreProduct } from "../../redux/slice/shoppingCartSlice/shoppingCartSlice";
import { ProductOrderedModel } from "../../models/productOrdered";
import { ProductColorModel } from "../../models/productColor";
import { SnackbarCustom } from "../../shareComponent/SnackBarCustom";

export const Card = (card: ProductModel, { ...props }) => {
  const navigate = useNavigate();
  const [currentColor, setCurrentColor] = useState("blue");
  const dispatch = useAppDispatch();
  const gotoProductsDetailsPage = () => {
    navigate(`/Product/${card.id}`);
  };

  useEffect(() => {
    if (card.colors[0]) {
      setCurrentColor(card.colors[0].label);
    }
  }, []);

  const [openSackBar, setOpenSackBar] = useState(false);

  const handleAddToBag = () => {
    const productOrdered: ProductOrderedModel = {
      id: card.id,
      image: card.thumbnail,
      quantity: 1,
      name: card.name,
      colors: currentColor,
      price: card.price,
    };
    setOpenSackBar(true)
    dispatch(addMoreProduct(productOrdered));
  };

  const RadioButtonsGroup = (cardColor: Array<ProductColorModel>) => {
    const colorList: any = [];
    cardColor.forEach((element) => {
      colorList.push(element.label);
    });
    const handleColorClick = (e: any) => {
      setCurrentColor(e.target.innerText);
    };

    return (
      <FormControl>
        <div className="flex py-2">
          {colorList &&
            colorList.map((color: string, index: number) => {
              if (index > 0) {
                return (
                  <div
                    onClick={(e) => handleColorClick(e)}
                    className={`p-2 px-5 border-2 text-center md:text-md text-xs ml-1 ${
                      currentColor === color ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {color}
                  </div>
                );
              }
              return (
                <div
                  onClick={(e) => handleColorClick(e)}
                  className={`p-2 px-5 border-2 text-center md:text-md text-xs ${
                    currentColor === color ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {color}
                </div>
              );
            })}
        </div>
      </FormControl>
    );
  };

  

  return (
    <div className="hover:cursor-pointer p-2 md:p-5 py-5 m-auto w-full overflow-hidden shadow-xl rounded-2xl">
      <div className="overflow-hidden">
        <Box
          onClick={gotoProductsDetailsPage}
          className="m-auto overflow-hidden"
          component="img"
          sx={{
            height: 400,
            maxHeight: { xs: 300, },
            maxWidth: { xs: 300, },
            // maxHeight: { xs: 300, md: 340 },
            // maxWidth: { xs: 300, md: 500 },
          }}
          alt="The house from the offer."
          src={card.thumbnail}
        ></Box>
      </div>
      <div className="break-before-all py-2 flex justify-between">
        <div className="p-2">
          <div>
            <span className="break-all text-md truncate w-1/2">
              {card.name}
            </span>
          </div>
          <div className="font-thin text-xs md:text-md p-3">
          <div>
              {!!card.origin_price && card.origin_price !== 0 && (
                <NumericFormat
                  className="text-red-500 line-through px-1"
                  value={card.origin_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" vnđ"}
                />
              )}
              <NumericFormat
            className=""
            value={card.price}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={""}
            suffix={" vnđ"}
          />
          </div>
          
        </div>
          <div>{RadioButtonsGroup(card.colors)}</div>
        </div>
        
      </div>
      <div
        onClick={handleAddToBag}
        className={`uppercase p-2 text-center w-5/6 m-auto bg-gradient-to-r from-[#1E90FF] to-[#0b7def] text-white font-semibold rounded-xl`}
      >
        <span className="">Thêm vào giỏ hàng </span>

       
      </div> 
      <SnackbarCustom open={openSackBar} onClose={() => setOpenSackBar(false)}
              duration={2000} severity="success" />
    </div>
  );
};
