import { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { ShoppingCart } from "../../ShoppingCart/ShoppingCart";
import { useCickOutside } from "../../../hooks/useClickOutside";
import { useAppSelector } from "../../../redux/hooks";
import { totalOrdered } from "../../../redux/slice/shoppingCartSlice/shoppingCartSlice";

const RightNav = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const wrapperRef = useRef(null);
  const isClickOutside = useCickOutside(wrapperRef);
  const totalOrder = useAppSelector(totalOrdered);
  useEffect(() => {
    if (isClickOutside) {
      setIsOpenCart(false);
    }
  }, [isClickOutside]);

  const triggerShoppingcard = () => {
    setIsOpenCart(!isOpenCart);
  };
  return (
    <div className="invisible md:visible md:flex md:gap-5 p-1 self-center">
      <div className="flex gap-5">
        {/* <GrSearch size={20} /> */}
        <div
          className="flex hover:cursor-pointer"
          onClick={triggerShoppingcard}
        >
          <FiShoppingCart size={20} />
          <span className="absolute px-6 text-red-500 text-xs">
            {totalOrder}
          </span>
        </div>
        {isOpenCart ? <ShoppingCart ref={wrapperRef}/> : <></>}
      </div>
    </div>
  );
};

export default RightNav;
