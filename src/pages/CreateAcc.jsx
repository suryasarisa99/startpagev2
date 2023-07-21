import React from "react";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { addAcc } from "../store/store";
import { useNavigate } from "react-router-dom";
export default function CreateAcc() {
  let [items, setItems] = useState([]);
  let [title, setTitle] = useState("");
  let [input, setInput] = useState(null);
  let [addInput, setAddInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const accs = useSelector((state) => state.accs);
  return (
    <div className="create-acc">
      <form action="" className="inp-title">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
      </form>
      {items.length > 0 && (
        <div>
          <p>Items</p>
          {items.map((item, index) => {
            return (
              <div key={item.label + index} className="item">
                <div>{item.label} </div>
                <CiCircleRemove
                  className="icon"
                  onClick={() => {
                    let x = [...items];
                    x.splice(index, 1);
                    setItems(x);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
      <form
        action=""
        className="add-item-fields"
        onSubmit={(e) => {
          e.preventDefault();
          let x = { label: e.target.label.value, href: e.target.url.value };
          setItems((prv) => [...prv, x]);
          e.target.label.value = "";
          e.target.url.value = "";
        }}
      >
        <input
          type="text"
          placeholder="Enter Url"
          name="url"
          className="input"
        />
        <div className="field">
          <input
            type="text"
            placeholder="Enter Label"
            name="label"
            className="input"
          />
          <button className="btn">+</button>
        </div>
      </form>
      <div className="item-icon">
        <div>Add Input Field</div>
        <input
          type="checkbox"
          checked={addInput}
          onChange={(e) => setAddInput(e.target.checked)}
        />
      </div>
      {addInput && (
        <form
          className="add-item-fields"
          onSubmit={(e) => {
            e.preventDefault();
            setInput({
              url: e.target.url.value,
              placeholder: e.target.placeholder.value,
            });
          }}
        >
          <input
            className="input"
            type="text"
            name="url"
            placeholder="Enter Url"
          />
          <div className="field">
            <input
              type="text"
              className="input"
              placeholder="Enter Placeholder"
              name="placeholder"
            />
            <button className="btn">+</button>
          </div>
        </form>
      )}
      <button
        className="btn"
        onClick={() => {
          const data = { title, items };
          if (addInput && input != null) data.input = input;
          dispatch(addAcc(data));
          navigate("/");
        }}
      >
        Add Accordian
      </button>
    </div>
  );
}
