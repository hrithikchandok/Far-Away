import { useState } from "react";

export default function APP() {
  const [initialItems, setinitialItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: false },
    { id: 4, description: "Phone", quantity: 1, packed: false },
  ]);
  function set(newitem) {
    setinitialItems([...initialItems, newitem]);
  }
  function del(id) {
    setinitialItems((initialItems) =>
      initialItems.filter((obj) => obj.id !== id)
    );
  }
  function toogle(id) {
    setinitialItems((initialItems) =>
      initialItems.map((obj) =>
        obj.id === id ? { ...obj, packed: !obj.packed } : obj
      )
    );
  }
  function clear() {
    setinitialItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form initialItems={initialItems} set={set} />
      <PackingList
        initialItems={initialItems}
        set={set}
        del={del}
        toogle={toogle}
        clear={clear}
      />
      <Stats initialItems={initialItems} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🛍️</h1>;
}
function Form({ initialItems, set }) {
  const [in1, setin1] = useState("");
  const [qt, setqt] = useState(1);
  function handlesubmit(e) {
    // const []
    console.log(e);
    // console.log(e.target.input.value);
    e.preventDefault();
    const newitem = {
      description: in1,
      quantity: qt,
      packed: false,
      id: Date.now(),
    };
    console.log(set);
    set(newitem);
    setin1("");
    setqt(1);
    // console.log(initialItems);
    // console.log(newitem);
    // initialItems.add(newitem);
    // <PackingList initialItems={initialItems} />;
  }
  return (
    <div className="add-form">
      <form className="add-form" onSubmit={handlesubmit}>
        <h3>What do you need for your😍 Trip?</h3>
        <select value={qt} onChange={(e) => setqt(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="text"
          value={in1}
          onChange={(e) => setin1(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
function Ele({ obj, del, toogle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={obj.packed}
        onChange={() => {
          toogle(obj.id);
        }}
      />
      <span style={obj.packed ? { textDecoration: "line-through" } : {}}>
        {obj.quantity}
        {obj.description}
      </span>
      <button onClick={() => del(obj.id)}>❌</button>
    </li>
  );
}
function PackingList({ initialItems, set, del, toogle, clear }) {
  const [sortby, setsortby] = useState("input");
  console.log(initialItems);
  let sortedItems;
  if (sortby === "input") sortedItems = initialItems;
  else if (sortby === "description") {
    sortedItems = initialItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortby === "packed") {
    sortedItems = initialItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  function sort(e) {
    console.log(e.target.value);
    setsortby(e.target.value);
  }

  return (
    <div className="list">
      <ul className="list">
        {sortedItems.map((obj) => {
          return <Ele obj={obj} del={del} key={obj.id} toogle={toogle} />;
        })}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={sort}>
          <option value="input">Sort by Input-order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed-status</option>
        </select>
        <button className="btn" onClick={clear}>
          Clear List{" "}
        </button>
      </div>
    </div>
  );
}
function Stats({ initialItems }) {
  const tot = initialItems.length;
  if (!tot) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing List 🚀</em>
      </footer>
    );
  }
  let c = 0;
  for (let obj of initialItems) {
    if (obj.packed === true) {
      c++;
    }
  }
  let per = Math.round((c / tot) * 100);
  return (
    <footer className="stats">
      <em>
        {per === 100
          ? "You got everything! Ready to go✈️"
          : `💼You have ${tot} items and you already Packed
        ${per}(%)`}
      </em>
    </footer>
  );
}
