import React from "react";
import { MdPostAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { modalFunc } from "../../redux/modalSlice";
import { searchDataFunc, sortingDataFunc } from "../../redux/dataSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center gap-3 whitespace-nowrap bg-blue-500 text-white px-4 py-3">
      <h1 className="text-3xl">React App</h1>
      <div className="flex items-center gap-5 text-black">
        <div>
          <select
            onChange={(e) => dispatch(sortingDataFunc(e.target.value))}
            className="h-8 rounded-lg outline-none"
            name=""
            id=""
          >
            <option value="asc">Artan</option>
            <option value="desc">Azalan</option>
          </select>
        </div>

        <input
          onChange={(e) =>
            dispatch(searchDataFunc(e.target.value.toLowerCase()))
          }
          className="h-8 rounded-lg px-3 outline-none"
          type="text"
          placeholder="Arama yapınız..."
        />

        <div
          onClick={() => dispatch(modalFunc())}
          className="bg-blue-800 hover:bg-blue-700 transition text-white w-8 h-8 grid place-items-center rounded-full cursor-pointer "
        >
          <MdPostAdd className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
