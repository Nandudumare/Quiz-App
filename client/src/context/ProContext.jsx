import { createContext, useEffect, useState } from "react";

export const ProContext = createContext();

export const ProContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  // useEffect(() => {
  //   let d = JSON.parse(localStorage.getItem("data"));
  //   let r = JSON.parse(localStorage.getItem("result"));
  //   if (d) {
  //     setData(d);
  //     setResult(r);
  //   }
  // }, []);
  return (
    <ProContext.Provider
      value={{
        data,
        setData,
        index,
        setIndex,
        loading,
        setLoading,
        result,
        setResult,
      }}
    >
      {children}
    </ProContext.Provider>
  );
};
