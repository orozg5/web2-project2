import { ICustomSwitchProps } from "../interfaces/ICustomSwitchProps";
import { Flex, Icon, Switch, Text } from "@chakra-ui/react";
import { MdCheck, MdClose } from "react-icons/md";
import { FC } from "react";

export const CustomSwitch: FC<ICustomSwitchProps> = ({ isChecked, setIsChecked }) => {
  const thumbIcon = isChecked ? MdCheck : MdClose;

  return (
    <Flex gap="2" align="center">
      <Text>Secured:</Text>

      <Switch
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        colorScheme="purple"
        size="lg"
        position="relative"
        sx={{
          "--switch-track-width": "60px",
          "--switch-track-height": "30px",
        }}
      >
        <Icon
          as={thumbIcon}
          position="absolute"
          boxSize="24px"
          top="15%"
          left={isChecked ? "calc(100% - 37px)" : "6.5%"}
          color={isChecked ? "green" : "red.light"}
          pointerEvents="none"
        />
      </Switch>
    </Flex>
  );
};
