import type { NextPage } from "next";
import React, { useReducer, useState } from "react";
import Link from "next/link";
import Modal from "../components/Modal";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const newItem = [
        ...state.people,
        { id: new Date().getTime(), name: action.payload },
      ];
      return {
        ...state,
        people: newItem,
        isModalOpen: true,
        modalContent: "Item added",
      };

    case "NO_NAME":
      return {
        ...state,
        isModalOpen: true,
        modalContent: "Please enter value",
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        modalContent: "",
      };

    case "REMOVE_ITEM":
      const NewPeople = state.people.filter(
        (person) => person.id !== action.payload
      );
      return {
        ...state,
        people: NewPeople,
      };

    default:
      throw new Error("Invalid option supplied to reducer");
  }
};

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "Hello world",
};

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch({
        type: "ADD_ITEM",
        payload: name,
      });
    } else {
      dispatch({ type: "NO_NAME" });
    }
    setName("");
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      <div>
        <Link href="/context">
          <a>Context</a>
        </Link>{" "}
        {" | "}
        <Link href="/draggable">
          <a>Draggable</a>
        </Link>
      </div>
      <h1>Reducer playground</h1>
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type here"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {state.people.length > 0 && (
        <ul className="people">
          {state.people.map((person) => {
            return (
              <li key={person.id}>
                <h4>{person.name}</h4>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: person.id })
                  }
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Home;
