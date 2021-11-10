import React, { useState } from "react";
import Link from "next/link";

/**
 * This is very basic draggable list
 * If you want to use something more advanced and much more pretty use: https://www.framer.com/docs/reorder/
 */

const initialItems = [
  { name: "🍅 Tomato", order: 1 },
  { name: "🥒 Cucumber", order: 2 },
  { name: "🧀 Cheese", order: 3 },
  { name: "🥬 Lettuce", order: 4 },
];

const Items = () => {
  const [dragged, setDragged] = useState(null);
  const [people, setPeople] = useState(initialItems);

  const switchElement = (idx) => {
    if (idx !== dragged) {
      let newPeople = people;

      const b = newPeople[idx].order;
      newPeople[idx].order = newPeople[dragged].order;
      newPeople[dragged].order = b;

      setPeople(newPeople);
    }

    setDragged(null);
  };

  return (
    <div>
      <Link href="/">
        <a>{"< "}Home</a>
      </Link>
      <h1>Draggable list</h1>
      <ul className="draggable-list">
        {people
          .sort((a, b) => a.order - b.order)
          .map((item, idx) => (
            <li
              className={idx === dragged ? "over" : ""}
              key={idx}
              draggable={true}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => switchElement(idx)}
              onDragStart={() => setDragged(idx)}
              onDragEnd={() => setDragged(null)}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Items;
