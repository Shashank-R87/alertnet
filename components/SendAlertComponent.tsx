import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import MakeDropDown from "./MakeDropDown";
import MessageDropDown from "./MessageDropDown";
import ModelDropDown from "./ModelDropDown";
import NumberPlateDropDown from "./NumberPlateDropDown";
import WTCDropDown from "./WTCDropDown";

const SENDALERT_ENDPOINT_URL =
  "https://lvcierja02.execute-api.ap-south-1.amazonaws.com/sendAlert";

const SendAlertComponent = ({
  location,
  contractAddress,
  zoneNumber,
}: {
  location: { latitude: number | undefined; longitude: number | undefined };
  contractAddress: string;
  zoneNumber: number;
}) => {
  const [sending, setSending] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [numberplate, setNumberPlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [wtc, setWTC] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (numberplate && make && model && wtc && message) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [numberplate, make, model, wtc, message]);

  const handleSendAlert = async () => {
    setSending(true);

    const alertPackage = {
      latitude: parseFloat(location.latitude?.toFixed(6) ?? "0.0") * 1000000,
      longitude: parseFloat(location.longitude?.toFixed(6) ?? "0.0") * 1000000,
      numberPlate: numberplate,
      make: make,
      model: model,
      wtc: wtc,
      message: message,
      contractAddress: contractAddress,
      zoneNumber: zoneNumber,
    };

    try {
      const response = await fetch(SENDALERT_ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alertPackage),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }

      const result = await response.json();
      Toast.show({
        type: "success",
        text1: result.message,
        text1Style: {
          fontSize: 16,
          fontWeight: "normal",
          color: "black",
          fontFamily: "Poppins_400Regular",
        },
        position: "bottom",
        swipeable: true,
      });

      setSending(false);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
        text1Style: {
          fontSize: 16,
          fontWeight: "normal",
          color: "black",
          fontFamily: "Poppins_400Regular",
        },
        position: "bottom",
        swipeable: true,
      });
      setSending(false);
    }
  };

  return (
    <>
      <NumberPlateDropDown onSelect={setNumberPlate} disabled={sending} />
      <MakeDropDown onSelect={setMake} disabled={sending} />
      <ModelDropDown onSelect={setModel} disabled={sending} />
      <WTCDropDown onSelect={setWTC} disabled={sending} />
      <MessageDropDown onSelect={setMessage} disabled={sending} />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleSendAlert}
        disabled={sending || disabled}
        style={{ borderRadius: 10 }}
        className="bg-white w-full px-5 py-3 flex flex-row gap-2 justify-center items-center disabled:bg-gray-200 mt-3"
      >
        {sending ? (
          <ActivityIndicator size="small" color="#808080" />
        ) : (
          <View className="flex justify-center items-center gap-4 flex-row">
            <FontAwesome name="send" size={16} color="black" />
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-lg"
            >
              Send Alert
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default SendAlertComponent;
