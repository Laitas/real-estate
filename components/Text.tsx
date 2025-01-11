import { cn } from "@/lib/utils";
import React from "react";
import { Text as DefaultText } from "react-native";

const Text = ({ className, ...props }: DefaultText["props"]) => {
  return (
    <DefaultText {...props} className={cn("font-rubik", className)}>
      {props.children}
    </DefaultText>
  );
};

export default Text;
