import { useState } from "react";

function useFlip() {
  const [flipped, setFlipped] = useState(true);
  const flip = () => {
    setFlipped(!flipped);
  };

  return [flipped, flip];
}

export default useFlip;
