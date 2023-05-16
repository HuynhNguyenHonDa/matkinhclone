import { useEffect, useState } from "react";
import {
  fetchInsurance,
  InsuranceModel,
} from "../../api/insuranceApi/insurance";

const CustomerSupport = () => {
  const [data, setData] = useState([] as InsuranceModel[]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchInsurance();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="grid md:grid-cols-2 md:p-10 gap-5 m-auto w-full">
      {data &&
        data.length > 0 &&
        data
          .sort((a, b) => {
            return a.id - b.id;
          })
          .map((item) => {
            return (
              <div className="px-5 max-w-md md:max-w-lg text-center">
                <div className="">
                  <span className="py-5 text-md font-bold uppercase md:whitespace">
                    {item.title}
                  </span>
                </div>
                <p className="md:align-middle py-5 text-justify">
                  {item.description}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default CustomerSupport;
