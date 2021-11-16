import React, { useCallback, useEffect, useRef } from "react";
// Chakra imports
import { Formik, Form, Field } from "formik";
import profileSettingsSchema from "../../../validations/profileSettingsSchema";
import "./Profile.scss";
import {
  AvatarGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  SimpleGrid,
  Box,
  Link,
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  Image,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { fileHelper } from "../../../utils/fileHelper";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../cards/Card";
import CardBody from "../../cards/CardBody";
import CardHeader from "../../cards/CardHeader";
import avatar from "../../../assets/img/default-avatar.jpeg";
import SpinnerComponent from "../../spinners/SpinnerComponent";
import ProfileBgImage from "../../../assets/img/ProfileBackground.png";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
  FaCamera,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import {
  editProfileAction,
  editProfilePictureAction,
  getProfileAction,
} from "../../../actions/profileActions";
import { NavLink } from "react-router-dom";

function Profile() {
  // Chakra color mode
  const dispatch = useDispatch();
  const textColor = useColorModeValue("gray.700", "white");
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const photoRef = useRef(null);
  const token = useSelector((state) => state.authReducer.jwt);
  const isFetching = useSelector((state) => state.authReducer.isFetching);
  const name = useSelector((state) => state.profileReducer.name);
  const surname = useSelector((state) => state.profileReducer.surname);
  const username = useSelector((state) => state.profileReducer.username);
  const email = useSelector((state) => state.profileReducer.email);
  const bio = useSelector((state) => state.profileReducer.bio);
  const groups = useSelector((state) => state.profileReducer.groups);
  const isSubscribedToSender = useSelector(
    (state) => state.profileReducer.isSubscribedToSender
  );
  const filename = useSelector((state) => state.profileReducer.filename);

  function handleSubmit(values) {
    console.log(values);
    dispatch(editProfileAction(token, values));
  }

  function handlePhoto(e) {
    var formData = new FormData();
    var file = e.target.files[0];
    formData.append("Picture", file);
    dispatch(editProfilePictureAction(token, formData));
  }

  useEffect(() => {
    dispatch(getProfileAction(token));
  }, []);

  return !name || !surname || !username || !email || isFetching ? (
    <SpinnerComponent />
  ) : (
    <Flex zIndex='-2' direction="column">
      <Box
        mb={{ sm: "205px", md: "75px", xl: "70px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          bgImage={ProfileBgImage}
          w="100%"
          h="300px"
          borderRadius="25px"
          bgPosition="50%"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{ sm: "column", md: "row" }}
            mx="1.5rem"
            maxH="330px"
            w={{ sm: "90%", xl: "95%" }}
            justifyContent={{ sm: "center", md: "space-between" }}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(45%)",
              md: "translateY(110%)",
              lg: "translateY(160%)",
            }}
          >
            <Flex
              align="center"
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Input
                style={{ display: "none" }}
                type="file"
                ref={photoRef}
                onChange={(e) => handlePhoto(e)}
              />
              <Box
                onClick={() => photoRef.current.click()}
                pos="relative"
                className="photo-container"
                transition="150ms linear"
                _hover={{
                  filter: "brightness(0.4)",
                }}
              >
                <Box
                  className="change-photo"
                  textAlign="center"
                  fontWeight="bold"
                  height="max-content"
                  width="max-content"
                  pos="absolute"
                  left="50%"
                  top="50%"
                  fontSize="xl"
                  transform="translate(-50%,-50%)"
                  zIndex="1"
                  opacity="0"
                  transition="150ms linear"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <FaCamera />
                  <Text textAlign="center" fontSize="sm">
                    New photo
                  </Text>
                </Box>
                {filename ? (
                  <Image
                    zIndex="3"
                    w="80px"
                    h="80px"
                    borderRadius="15px"
                    src={fileHelper.convertToUrl(filename)}
                  />
                ) : (
                  <Image
                    zIndex="3"
                    src={avatar}
                    w="80px"
                    h="80px"
                    borderRadius="15px"
                  />
                )}
              </Box>
              <Flex
                ml={{ md: "22px" }}
                direction="column"
                maxWidth="100%"
                my={{ sm: "14px" }}
              >
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color={textColor}
                  fontWeight="bold"
                  ms={{ sm: "8px", md: "0px" }}
                >
                  {name} {surname}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={emailColor}
                  fontWeight="semibold"
                >
                  {email}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={{ sm: "column", lg: "row" }}
              w={{ sm: "100%", md: "50%", lg: "auto" }}
            ></Flex>
          </Flex>
        </Box>
      </Box>
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="22px">
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Settings
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column" width="100%">
              <Formik
                initialValues={{
                  name: name,
                  surname: surname,
                  bio: bio ?? "",
                  isSubscribedToSender: isSubscribedToSender,
                }}
                validationSchema={profileSettingsSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <FormControl>
                    <SimpleGrid
                      columns={{ sm: 1, md: 1, lg: 2, xl: 2 }}
                      spacing={10}
                    >
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel fontSize="sm" fontWeight="normal">
                              Name
                            </FormLabel>
                            <Input
                              fontSize="sm"
                              borderRadius="15px"
                              type="text"
                              placeholder="Your Name"
                              size="lg"
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="surname">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.surname && form.touched.surname
                            }
                          >
                            <FormLabel fontSize="sm" fontWeight="normal">
                              Surname
                            </FormLabel>
                            <Input
                              fontSize="sm"
                              borderRadius="15px"
                              type="text"
                              placeholder="Your Surname"
                              size="lg"
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.surname}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>
                    <Field name="bio">
                      {({ field, form }) => (
                        <FormControl
                          mt="24px"
                          isInvalid={form.errors.bio && form.touched.bio}
                        >
                          <FormLabel fontSize="sm" fontWeight="normal">
                            Bio
                          </FormLabel>
                          <Textarea
                            resize="none"
                            fontSize="sm"
                            borderRadius="15px"
                            type="text"
                            placeholder="Write about yourself..."
                            size="sm"
                            {...field}
                          />
                          <FormErrorMessage>{form.errors.bio}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="isSubscribedToSender">
                      {({ field, form }) => (
                        <FormControl
                          mt="24px"
                          display="flex"
                          alignItems="center"
                        >
                          <Switch
                            id="isSubscribedToSender"
                            {...field}
                            isChecked={field.value}
                            colorScheme="teal"
                            me="10px"
                          />
                          <FormLabel
                            htmlFor="isSubscribedToSender"
                            mb="0"
                            ms="1"
                            fontWeight="normal"
                          >
                            Receive messages from e-mail
                          </FormLabel>
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
                      SAVE
                    </Button>
                  </FormControl>
                </Form>
              </Formik>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Flex align="center" mb="27.6px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Bio:
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {!bio ? (
                    <Text fontWeight="bold" color="red">
                      Empty
                    </Text>
                  ) : (
                    bio
                  )}
                </Text>
              </Flex>

              <Flex align="center" mb="27.6px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Full Name:
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {name} {surname}
                </Text>
              </Flex>

              <Flex align="center" mb="27.6px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Username:
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {username}
                </Text>
              </Flex>

              <Flex align="center" mb="27.6px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Email:
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {email}
                </Text>
              </Flex>

              <Flex align="center" mb="27.6px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Groups:
                </Text>
                <Text fontSize="md" color={titleColor} fontWeight="bold">
                  {groups ? (
                    groups.map((a) => a.name).join(", ")
                  ) : (
                    <Text fontWeight="bold" color="red">
                      You do not participate in any of the groups!
                    </Text>
                  )}
                </Text>
              </Flex>
            </Flex>
          </CardBody>
          <CardBody
            px="5px"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <NavLink style={{width:'100%',height:'100%'}} path to="/requestchangeemail">
            <Button
              bg="red"
              fontSize="13px"
              color="white"
              fontWeight="bold"
              w="100%"
              h="45"
              mt="24px"
              mb="24px"
              _hover={{
                bg: "red.400",
              }}
            >
              CHANGE YOUR E-MAIL
            </Button>
            </NavLink>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
