import { Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Progress } from "@chakra-ui/progress";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { start } from "@popperjs/core";

function Timer({ expiryTimestamp, overAllTime }) {
  const { seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart} =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => console.log("VAXT BITDI QIJDILLAX"),
    });

  return (
    <Flex direction='column' width='max-content'>
        <button onClick={start}>
            start
        </button>
        <Progress style={{transition:'linear 150ms !important'}} borderRadius='10px' height='10px' value={(hours*3600 + minutes*60 + seconds)/overAllTime*100} />
    <Text color="teal.300" fontWeight="bold">
      {hours != 0 && (
        <Text me='0.5rem' display="inline-block">
          {hours}{" "}
          <Text display="inline-block" color="black">
            {hours == 1 ? "hour" : "hours"}
          </Text>
        </Text>
      )}

      <Text me='0.5rem' display="inline-block">
        {minutes}{" "}
        <Text display="inline-block" color="black">
          {minutes == 1 ? "minute" : "minutes"}
        </Text>
      </Text>

      <Text display="inline-block">
        {seconds}{" "}
        <Text display="inline-block" color="black">
          {seconds ==1 ? 'second' : 'seconds'}
        </Text>
      </Text>
    </Text>
    </Flex>
  );
}

const QuizMain = () => {
  const time = new Date();
  const overAllTime = 10;
  time.setSeconds(time.getSeconds() + overAllTime);
  return <Timer expiryTimestamp={time} overAllTime={overAllTime} />;
};

export default QuizMain;
