import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { ContactInform } from "./ContactInform";

export const Footer = () => {
  const googleMapLink = useAppSelector(
    (state) => state.contact.contact?.google_map_url
  );
  return (
    <div className="w-full p-5 justify-between justify-items-center grid md:grid-cols-2 bg-gradient-to-r from-[#a8cdf2] to-[#70b8fb] m-auto">
      <iframe
        className="w-full h-96"
        src={googleMapLink}
        loading="lazy"
      ></iframe>
      <div>
        <ContactInform />
      </div>
    </div>
  );
};
