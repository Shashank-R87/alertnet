import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const alertData = [
  { label: "Drowsy Driver", value: "Drowsy Driver Detected" },
  { label: "Accident Ahead", value: "Accident Reported Ahead" },
  { label: "Heavy Traffic", value: "Heavy Traffic Congestion" },
  { label: "Police Checkpoint", value: "Police Checkpoint Reported" },
  { label: "Overspeeding", value: "Overspeeding Alert" },
  { label: "Harsh Braking", value: "Harsh Braking Event" },
  { label: "Road Obstruction", value: "Obstruction on Road Ahead" },
  { label: "Emergency Vehicle", value: "Emergency Vehicle Approaching" },
  { label: "Red Light Camera", value: "Red Light Camera Ahead" },
  { label: "Vehicle Tampering", value: "Vehicle Tampering Detected" },
];

type SelectionProps = {
  onSelect: (data: string) => void;
  disabled: boolean
};

const MessageDropDown = ({onSelect, disabled}:SelectionProps) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="w-full">
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "red" }, disabled && { backgroundColor: '#E5E7EB'}]}
        disable={disabled}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={{borderRadius: 10, padding: 2}}
        itemTextStyle={{fontFamily: "Poppins_400Regular", fontSize: 14}}
        itemContainerStyle={{borderRadius: 10}}
        iconStyle={styles.iconStyle}
        data={alertData}
        maxHeight={300}
        dropdownPosition='bottom'
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Message" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value)
        }}
        renderLeftIcon={() => (
          <Entypo name="message" style={styles.icon} size={20} color={isFocus ? "red" : "gray"} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: 'Poppins_400Regular',
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    padding: 2,
    color: 'gray'
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default MessageDropDown;
