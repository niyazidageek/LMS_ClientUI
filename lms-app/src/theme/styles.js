import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: 'Helvetica, sans-serif'
      },
      html: {
        fontFamily: 'Helvetica, sans-serif'
      },
      input:{
        _focus:{
          borderColor:'rgb(117,206,197) !important',
          boxShadow:'0 0 0 1px rgb(117,206,197) !important'
        }
      },
      ".css-1ibe2e7[data-focus]":{
        input:{
          borderColor:'unset !important',
          boxShadow:'unset !important'
        },
        borderColor:'rgb(117,206,197) !important',
        boxShadow:'0 0 0 1px rgb(117,206,197) !important'
      },
      textArea:{
        _focus:{
          borderColor:'rgb(117,206,197) !important',
          boxShadow:'0 0 0 1px rgb(117,206,197) !important'
        }
      }
    }),
  },
};
