import React, { useState, useEffect } from "react";

import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import CardHeader from "../../cards/CardHeader";
import CardBody from "../../cards/CardBody";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import applicationSchema from "../../../validations/applicationSchema";
import { postApplicationAction } from "../../../actions/applicationActions";

function Application() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);

  function handleSubmit(values) {
    const { message } = values;

    dispatch(postApplicationAction(values, token));
  }

  return isFetching ? (
    <SpinnerComponent />
  ) : (
    <Flex
      justifyContent="space-between"
      direction="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <Card
        justifyContent="space-between"
        height="610px"
        overflowX={{ sm: "scroll", xl: "hidden" }}
      >
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color="gray.400" fontWeight="bold">
            Application{" "}
          </Text>
        </CardHeader>
        <CardBody>
          <Card p="16px">
            <CardBody height="100%" px="5px">
              <Flex direction="column" width="100%">
                <Formik
                  initialValues={{
                    message: "",
                  }}
                  validationSchema={applicationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <FormControl>
                      <Field name="message">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel fontWeight="semibold" fontSize="md">
                              Message
                            </FormLabel>
                            <Textarea
                              height="280px"
                              fontSize="md"
                              borderRadius="15px"
                              type="text"
                              placeholder="Enter the message"
                              size="lg"
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Button
                        isLoading={isFetching}
                        type="submit"
                        bg="teal.300"
                        fontSize="13px"
                        color="white"
                        fontWeight="bold"
                        w="100%"
                        h="45"
                        mt="24px"
                        mb="24px"
                        _hover={{
                          bg: "teal.200",
                        }}
                        _active={{
                          bg: "teal.400",
                        }}
                      >
                        SEND
                      </Button>
                    </FormControl>
                  </Form>
                </Formik>
              </Flex>
            </CardBody>
          </Card>
        </CardBody>
        <Text
          onClick={() => history.goBack()}
          lineHeight="unset"
          bg="transparent"
          fontWeight="bold"
          fontSize="lg"
          _hover={{
            color: "teal.500",
            cursor: "pointer",
          }}
          color="teal.400"
          mt="2rem"
          width="max-content"
        >
          Back
        </Text>
      </Card>
    </Flex>
  );
}

export default Application;
