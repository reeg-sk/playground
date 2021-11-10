import React, { useContext } from "react";
import Link from "next/link";

const PersonContext = React.createContext(null);

const Context = () => {
  return (
    <>
      <Link href="/">
        <a>{"< "}Home</a>
      </Link>
      <PersonContext.Provider value={{ message: "Hello there" }}>
        <h1>Context playground</h1>
        <Something />
      </PersonContext.Provider>
    </>
  );
};

const Something = () => {
  const { message } = useContext(PersonContext);
  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default Context;
