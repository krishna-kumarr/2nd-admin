import React, {useState, useEffect} from "react";

const Timer = () => {
  const [count, setCount] = useState(10);
  const [reset, setReset] = useState(10);

  useEffect(() => {
    var x = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      setCount(reset);
    }
  }, []);

  return <>You will be redirected to Home Page Within : {count}s</>;
};

export default Timer;
