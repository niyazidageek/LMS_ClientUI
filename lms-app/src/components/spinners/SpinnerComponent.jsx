import React from "react";
import { Spinner } from "@chakra-ui/spinner";

const SpinnerComponent = React.memo(() => {
  return (
    <div
      style={{
        height:'max-content',
        width:'max-content',
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
});

export default SpinnerComponent;
