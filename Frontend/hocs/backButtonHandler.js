import { useEffect } from "react";
import { BackHandler } from "react-native"

export const defaultBackHandler = (navigator) => {
    navigator.goBack();
    return true;
}

export const useBackButton = (handler) => {
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handler);
  
      return () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          handler
        );
      };
    }, [handler]);
  }
