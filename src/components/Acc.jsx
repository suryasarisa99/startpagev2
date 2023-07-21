import { useState, useEffect, useRef } from "react";
// import "../../styles/acc.css";
import { FaGithub, FaTrash } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editItem, addItem, removeItem, removeAcc } from "../store/store";
import { motion } from "framer-motion";
export default function Acc({
  data,
  index: mIndex,
  editMode,
  setEditMode,
  state: [accState, setAccState],
}) {
  const dispatch = useDispatch();
  // let [accState, setAccState] = useState(false);
  let [addMode, setAddMode] = useState(false);
  // let [editMode, setEditMode] = useState(false);

  let [editItemIndex, setEditItemIndex] = useState(-1);
  let [editItemUrl, setEditItemUrl] = useState("");
  let [editItemLable, setEditItemLable] = useState("");

  let [longTouch, setLongTouch] = useState("x");
  let [moveRight, setMoveRight] = useState(0);
  let [moveIndex, setMoveIndex] = useState(-1);
  let accRef = useRef(null);
  let posRef = useRef(0);
  let timer;
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (accRef.current && !accRef.current.contains(e.target)) {
        setAccState(false);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(data.input.url.replace("%s", e.target.urlSub.value));
  };
  const handleTouchStart = (index) => {
    timer = setTimeout(() => {
      setEditMode(index);
    }, 500);
  };
  const handleTouchEnd = (e) => {
    clearTimeout(timer);
    // if (longTouch) setLongTouch(false);
  };

  const handleSwipeStart = (e, index) => {
    posRef.current = e.targetTouches[0].clientX;
    setMoveIndex(index);
  };
  const handleSwipeMove = (e) => {
    const deltax = e.targetTouches[0].clientX - posRef.current;
    setMoveRight(deltax);
  };
  const handleSwipeEnd = (e) => {
    if (moveRight > 150 || moveRight < -150)
      dispatch(removeItem({ mIndex, index: moveIndex }));
    //  Reseting
    setMoveIndex(-1);
    setMoveRight(0);
    posRef.current = 0;
  };
  console.log(data);
  return (
    <div className="acc">
      <div
        className="acc-head"
        onClick={() => {
          if (editMode > -1) setEditMode(-1);
          else if (accState != mIndex) setAccState(mIndex);
          else setAccState(-1);
          console.log("accIndex: " + mIndex);
        }}
        onTouchStart={() => handleTouchStart(mIndex)}
        onTouchEnd={handleTouchEnd}
      >
        {/* <i className="fa-brands fa-github icon"></i> */}

        <div className="main">
          <FaGithub />
          <p className="label">{data.title}</p>
        </div>
        {editMode == mIndex && (
          <div className="options">
            <FaTrash
              className="icon bin"
              onClick={() => dispatch(removeAcc(mIndex))}
            />
            <motion.div
              whileTap={{ rotate: 45 }}
              animate={{ rotate: addMode ? 45 : 0 }}
              className="icon-outer"
            >
              <AiOutlinePlus
                className="icon add"
                onClick={(e) => {
                  e.stopPropagation();
                  setAddMode((prv) => !prv);
                }}
              />
            </motion.div>
            {/* // <MdModeEdit className="icon edit" /> */}
          </div>
        )}
      </div>

      {/* ================   Accordian Edit =================== */}
      {/* ===================================================== */}

      {editMode == mIndex && (
        <div className="edit-box">
          {data.items.map((link, index) => {
            return (
              <div key={link.label + index}>
                <div
                  className="edit-item"
                  onTouchStart={(e) => handleSwipeStart(e, index)}
                  onTouchMove={handleSwipeMove}
                  onTouchEnd={handleSwipeEnd}
                  style={{
                    transform: `translateX(${
                      moveIndex == index ? moveRight : 0
                    }px)`,
                  }}
                >
                  <p>{link.label} </p>
                  <MdModeEdit
                    onClick={() => {
                      setEditItemIndex(index);
                      setEditItemLable(link.label);
                      setEditItemUrl(link.href);
                    }}
                  />
                </div>

                {editItemIndex == index && (
                  <form
                    className="add-item-fields"
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log(data.items[index]);
                      console.log("submit edit");
                      dispatch(
                        editItem({
                          mIndex,
                          iIndex: index,
                          accItem: {
                            href: e.target.url.value,
                            label: e.target.label.value,
                          },
                        })
                      );
                      setEditItemIndex(-1);
                      // setLongTouch(false);
                    }}
                  >
                    <input
                      className="input"
                      value={editItemUrl}
                      name="url"
                      placeholder="Add url"
                      onChange={(e) => setEditItemUrl(e.target.value)}
                    />
                    <div className="field">
                      <input
                        className="input"
                        value={editItemLable}
                        placeholder="Add Label"
                        name="label"
                        onChange={(e) => setEditItemLable(e.target.value)}
                      />
                      <button className="btn">
                        <FaChevronRight />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            );
          })}
          {addMode && (
            <form
              className="add-item-fields"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  addItem({
                    mIndex,
                    item: {
                      href: e.target.addUrl.value,
                      label: e.target.addLabel.value,
                    },
                  })
                );
                e.target.addUrl.value = "";
                e.target.addLabel.value = "";
                setAddMode(false);
              }}
            >
              <input className="input" name="addUrl" placeholder="Add url" />
              <div className="field">
                <input
                  className="input"
                  placeholder="Add Label"
                  name="addLabel"
                />
                <button className="btn">
                  <AiOutlinePlus />
                </button>
              </div>
            </form>
          )}

          {/* {!addMode && (
            <button className="btn add-btn" onClick={() => setAddMode(true)}>
              <AiOutlinePlus />
            </button>
          )} */}
        </div>
      )}
      {/* ===================   Accordian Body ======================= */}

      {accState == mIndex && editMode == -1 && (
        <div className="acc-body">
          {data?.input && (
            <form action="" className="input-field" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={data.input.placeholder}
                name="urlSub"
              />
              <button>
                <FaGithub className="" />
              </button>
            </form>
          )}
          {data.items.map((link) => {
            return (
              <a href={link.href} key={link.label} className="acc-item">
                <FaGithub className="icon" /> <p>{link.label}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
