/* eslint-disable jsx-a11y/alt-text */
import platforms from "../mock/platforms.json";
import { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
export default function PopularPlatformSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    gameName: "",
    platform: "",
    state: "",
    trade: "",
    delivery: "",
  });

  useEffect(() => {
    if (query.platform !== "") {
      navigate({
        pathname: "/listings",
        search: createSearchParams(query).toString(),
      });
    }
  }, [query]);

  return (
    <div className="grid grid-cols-5 gap-10 place-items-center py-3 mb-10">
      {platforms.map((platform) => {
        return (
          <img
            key={platform.name}
            id={platform.name}
            src={process.env.PUBLIC_URL + platform.image}
            onClick={(e) => {
              setQuery({
                ...query,
                platform: e.target.id,
              });
            }}
            className=" object-contain h-[100px] grayscale hover:scale-110 transition-all duration-300 hover:grayscale-0 opacity-50 hover:opacity-100"
          ></img>
        );
      })}
    </div>
  );
}
