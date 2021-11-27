import { Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useState, useMemo } from "react";
import { useTimer } from "react-timer-hook";
import { Progress } from "@chakra-ui/progress";

function Timer({ expiryTimestamp, overAllTime, onExpire }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: true,
    expiryTimestamp,
    onExpire: () =>onExpire(),
  });

  const progressValue = useMemo(
    () => ((hours * 3600 + minutes * 60 + seconds) / overAllTime) * 100,
    [hours, minutes, seconds]
  );

  

  return (
    <Flex direction="column">

      <Text color="white" fontWeight="bold">
        {hours != 0 && (
          <Text me="0.5rem" display="inline-block">
            {hours}{" "}
            <Text display="inline-block">{hours == 1 ? "hour" : "hours"}</Text>
          </Text>
        )}

        <Text me="0.5rem" display="inline-block">
          {minutes}{" "}
          <Text display="inline-block">
            {minutes == 1 ? "minute" : "minutes"}
          </Text>
        </Text>

        <Text display="inline-block">
          {seconds}{" "}
          <Text display="inline-block">
            {seconds == 1 ? "second" : "seconds"}
          </Text>
        </Text>
      </Text>

      <Progress
        mt='0.5rem'
        border="1px solid white"
        colorScheme={
          progressValue > 40 ? "green" : progressValue > 10 ? "yellow" : "red"
        }
        style={{ transition: "linear 150ms !important" }}
        borderRadius="10px"
        height="17px"
        value={progressValue}
      />
    </Flex>
  );
}

export default Timer;
