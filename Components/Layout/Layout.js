import React, { useEffect, useState } from 'react'
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../Header/Sidebar";

export default function Layout(props) {
  const [url, setUrl] = useState("")
  useEffect(() => {
    setUrl(props.url)
  }, [props.url])

  return (
    <Flex pos="relative">
      <Sidebar
        bgColor={props.bgColor}
        toggleColorMode={props.toggleColorMode}
        txtColor={props.txtColor}
        colorMode={props.colorMode().colorMode}
        url={url}
        onChangeNavSize={props.onChangeNavSize}
        navSize={props.navSize}
      />
      <Box display={props.navSize == "small" ? "block" : { base: "none", md: "block" }} p={4}>
        {props.children}
      </Box>
    </Flex>
  );
}
