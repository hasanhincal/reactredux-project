import React, { useEffect, useState } from "react";
import ProductCard from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Input from "../components/Modal/Input";
import Button from "../components/Modal/Button";
import { GoFileMedia } from "react-icons/go";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((store) => store.modalSlice);
  const { data, keyword } = useSelector((store) => store.dataSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location.search.split("=")[1];

  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id == loc));
    }
  }, [loc]);

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
    setProductInfo("");
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input
        value={productInfo?.name}
        type={"text"}
        placeholder={"Ürün ekle..."}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        value={productInfo?.price}
        type={"text"}
        placeholder={"Fiyat eke..."}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <label htmlFor="url" className="text-xl flex justify-end w-full mt-3">
        <GoFileMedia className="cursor-pointer hover:scale-[1.1]" />
      </label>
      <Input
        style={{ display: "none" }}
        type={"file"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        btnText={loc ? "Güncelle" : "Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );

  const filteredItems = data?.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );

  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>
      {modal && (
        <Modal
          title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
          content={contentModal}
        />
      )}
    </div>
  );
};

export default Product;
