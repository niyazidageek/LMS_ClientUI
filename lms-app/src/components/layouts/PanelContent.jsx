import { Box, useStyleConfig } from "@chakra-ui/react";
function PanelContent(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContent", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default PanelContent;
