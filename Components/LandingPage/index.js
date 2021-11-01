import React, { useState, useEffect } from "react";
import {
  Center,
  InputGroup,
  Input,
  Wrap,
  WrapItem,
  InputLeftAddon,
  HStack,
  PinInput,
  PinInputField,
  Box,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  Text,
  AlertDescription,
  AlertDialogFooter,
  Divider,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";
import { FaArrowRight } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import { connect } from "react-redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy, FiDownload } from "react-icons/fi";
import { thunk_register_user, thunk_register_user_default } from "../../middleware/user/register/registerMiddleware";

const LandingPage = (props) => {
  const [mode, setMode] = useState("dark");
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState(0)
  const nowMode = useColorMode().colorMode;
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setMode(nowMode);
  }, []);

  const InputUsername = (data) => {
    setUsername(data)
  }

  const closeModal = () => {
    props.onDefault()
    onClose()
    setPin(0)
  }

  const Register = () => {
    const dataRegis = {
      username: username,
      pin: pin
    }
    props.onRegister(dataRegis, window.location.origin)
  }

  const downloadTxtFile = (key,e) => {
    e.preventDefault();
    const element = document.createElement("a");
    if(key == "private"){
      const file = new Blob(["private : "+ props.userReducer.private_key_register ], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "private.txt";
      document.body.appendChild(element);
      element.click();
    }else{
      const file = new Blob(["public : "+ props.userReducer.public_key_register ], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "public.txt";
      document.body.appendChild(element);
      element.click();
    }
  }

  return (
    <React.Fragment>
      <Box
        backgroundImage="url('/mkmkmkmk.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        h="100vh"
      >
        <Box position="relative" top={280}>
          <Flex p={5} my="auto">
            <Center w="100%">
              <Wrap>
                <WrapItem
                  boxShadow="lg"
                  rounded="lg"
                  w={["100%", "100%", 350, 450, 450, 500]}
                >
                  <InputGroup size="lg">
                    <InputLeftAddon children="mejakerja.com/" />
                    <Input
                      type="search"
                      placeholder="username"
                      color={mode == "dark" ? "white" : "gray.300"}
                      onChange={(e) => InputUsername(e.target.value)}
                    />
                  </InputGroup>
                </WrapItem>
                <WrapItem w={["100%", "100%", 125, 150, 150, 175]}>
                  <Button
                    boxShadow="lg"
                    w="100%"
                    size="lg"
                    isLoading={false}
                    colorScheme="messenger"
                    loadingText="Mendaftar"
                    rightIcon={<FaArrowRight />}
                    onClick={ onOpen }
                  >
                    Mulai
                  </Button>
                </WrapItem>
              </Wrap>
            </Center>
          </Flex>
          <Flex pl={5} pr={5} my="auto">
            <Center w="100%">
              <Alert
                status="info"
                w={["100%", 525, 490, 610, 610, 690]}
                boxShadow="xl"
                rounded="md"
                bgColor={ mode == "dark" ? "gray.700" : "whiteAlpha.700"}
              >
                <AlertIcon />
                <AlertTitle mr={2}>mejamu mejaku meja kita semua.</AlertTitle>
                <AlertDescription whiteSpace="nowrap" w="100%" align="right">
                  <Link as={ReachLink} to="/explore" ml={1}>
                    <u>masuk</u>
                  </Link>
                  <small> atau </small>
                  <Link as={ReachLink} to="/explore" mr={1}>
                    <u>
                      <i>explore</i>
                    </u>
                  </Link>
                </AlertDescription>
              </Alert>
            </Center>
          </Flex>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ props.userReducer.isError ? "Register Gagal" : props.userReducer.private_key_register !== null ? "Simpan key anda" : username.length > 3 ? "Pin" : "Warning" }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            { props.userReducer.private_key_register !== null
              ? <UnorderedList>
              <ListItem>private key: { props.userReducer.private_key_register } 
                <CopyToClipboard text={ props.userReducer.private_key_register }>
                  <Button size="xs"><FiCopy /></Button>
                </CopyToClipboard>
                <Button size="xs" onClick={ (e) => downloadTxtFile("private",e) }><FiDownload /></Button>
              </ListItem>
              <ListItem>public key: { props.userReducer.public_key_register }
                <CopyToClipboard text={ props.userReducer.public_key_register }>
                  <Button size="xs"><FiCopy /></Button>
                </CopyToClipboard>
                <Button size="xs" onClick={ (e) => downloadTxtFile("public",e) }><FiDownload /></Button>
              </ListItem>
             </UnorderedList> : props.userReducer.isError ? "Maaf IP atau username kamu sudah terdaftar" : username.length > 3 ? 
              <HStack>
                <PinInput mask otp onChange={ (e) => setPin(e) }>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack> : "Username minimal 6 digit"
            }
          </ModalBody>

          <ModalFooter>
            { props.userReducer.private_key_register !== null || props.userReducer.isError ? false : username.length > 3 ?
                <Button isDisabled={ pin.length == 6 ? false : true } isLoading={ props.userReducer.isLoading } colorScheme="blue" mr={3} onClick={Register}>
                  Masuk
                </Button> :
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Tutup
                </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userReducer: state.UserReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (data, url) => { dispatch(thunk_register_user(data, url)) },
    onDefault: () => { dispatch(thunk_register_user_default()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);