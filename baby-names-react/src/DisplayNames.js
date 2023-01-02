import React, { useState } from "react";
import data from "./babyNamesData.json";

function DisplayNames() {
  const [items, setItems] = useState(data);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState([]);
  const [gender, setGender] = useState(null);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  const onChangeValue = (event) => {
    setGender(event.target.value);
  };

  const favoriteName = (el) => {
    setCount([...count, el]);
    setItems(items.filter((i) => i.id !== el.id));
  };

  const removeFavoritesName = (el) => {
    setItems([...items, el]);
    setCount(count.filter((i) => i.id !== el.id));
  };

  const filteredItems = items.filter((item) => {
    if (gender && gender !== "all") {
      return item.sex === gender;
    } else {
      return true;
    }
  });

  const mainNames = filteredItems.filter((item) =>
    item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div>
      <div>
        <h1>BABY NAMES</h1>
        <input
          type="text"
          placeholder="Enter Baby Names"
          value={search}
          onChange={handleSearch}
          className="input"
        />
      </div>
      <div>
        <input
          type="radio"
          value="m"
          name="gender"
          checked={gender === "m"}
          onChange={onChangeValue}
          className="radioBtn"
        />{" "}
        Male Names
        <input
          type="radio"
          value="f"
          name="gender"
          checked={gender === "f"}
          onChange={onChangeValue}
          className="radioBtn"
        />{" "}
        Female Names
        <input
          type="radio"
          value="all"
          name="gender"
          checked={gender === "all"}
          onChange={onChangeValue}
          className="radioBtn"
        />{" "}
        All
      </div>

      <p>
        {mainNames
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((el, id) => {
            if (el.sex === "f") {
              return (
                <span
                  key={id}
                  className="orange"
                  onClick={() => favoriteName(el)}
                >
                  {" "}
                  {el.name}{" "}
                </span>
              );
            } else {
              return (
                <span
                  key={id}
                  className="blue"
                  onClick={() => favoriteName(el)}
                >
                  {" "}
                  {el.name}{" "}
                </span>
              );
            }
          })}
      </p>
      <div>
        <ol>
          {count.map((na) => (
            <li key={na.id} onClick={() => removeFavoritesName(na)}>
              {na.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default DisplayNames;
