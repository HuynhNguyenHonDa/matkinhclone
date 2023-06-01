import { Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Phone } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchContactAsync } from "../../redux/slice/contactSlice/contactSlice";
import { useEffect } from "react";

export const ContactInform = () => {
  const contactList = useAppSelector((state) => state.contact.contact);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContactAsync());
  }, []);

  return (
    <div className="grid grid-rows-1 text-center  ">
      <Typography className="p-5" variant="h3" color="black" align="left">
        Mắt Kính Bảo Tín
      </Typography>

      <Typography
        className="p-6"
        variant="h3"
        fontSize={"medium"}
        color="text.secondary"
        align="left"
        // marginLeft={"10"}
      >
        <Phone /> {contactList?.Phone}
      </Typography>
      <Typography
        className="p-5"
        variant="h3"
        fontSize={"medium"}
        color="text.secondary"
        align="center"
      >
        <LocationOnIcon />
        <a href="https://www.google.com/search?q=mat%20kinh%20bao%20tin&rlz=1C5CHFA_enVN1040VN1040&oq=mat+kinh+bao+tin&aqs=chrome..69i57j0i22i30j69i60.4699j1j7&sourceid=chrome&ie=UTF-8&tbs=lf:1,lf_ui:10&tbm=lcl&sxsrf=AJOqlzX6eJnBDKZnfWeRj_Tz_IoenNwhww:1673973887004&rflfq=1&num=10&rldimm=15754703421119812241&lqi=ChBtYXQga2luaCBiYW8gdGluSL3858C4j4CACFoiEAAQARACEAMYABgBGAIYAyIQbWF0IGtpbmggYmFvIHRpbpIBF2NvbnRhY3RfbGVuc2VzX3N1cHBsaWVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJUTUdOcGQyZG5SUkFC&phdesc=OLOnUHlL18I&ved=2ahUKEwiXs5fXhs_8AhW-9XMBHZ7ECqwQvS56BAgTEAE&sa=X&rlst=f#rlfi=hd:;si:15754703421119812241,l,ChBtYXQga2luaCBiYW8gdGluSL3858C4j4CACFoiEAAQARACEAMYABgBGAIYAyIQbWF0IGtpbmggYmFvIHRpbpIBF2NvbnRhY3RfbGVuc2VzX3N1cHBsaWVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJUTUdOcGQyZG5SUkFC,y,OLOnUHlL18I;mv:[[10.8310595,106.6912924],[10.7436707,106.6470947]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:10">
          {contactList?.address}
        </a>
      </Typography>
      <div className="grid grid-cols-3 p-5 gap-10 md:gap-20">
        <a href={contactList?.facebook} target={"_blank"}>
          <img
            className="hover:cursor-pointer w-24 md:w-32 "
            src="/assets/images/eShopIcon/Facebook-icon.png"
            alt=""
          />
        </a>
        <a href={contactList?.shopee_id} target="_blank">
          <img
            className="hover:cursor-pointer w-24 md:w-32 "
            src="/assets/images/eShopIcon/Shopee-icon.png"
            alt=""
          />
        </a>
        <a href={contactList?.lazada_ip} target="_blank">
          <img
            className="hover:cursor-pointer w-20 md:w-28 "
            src="/assets/images/eShopIcon/logo-lazada.png"
            alt=""
          />
        </a>
      </div>
      <div className="justify-self-center">
        <Typography
          variant="caption"
          fontSize={"small"}
          color="textSecondary"
          align="center"
        >
          {/* {"Copyright © nvanh31798@gmail.com"} */}
        </Typography>
      </div>
    </div>
  );
};
