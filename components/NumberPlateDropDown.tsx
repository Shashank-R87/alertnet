import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const numberplateData = [
  { label: "KA01AB1234", value: "KA01AB1234" },
  { label: "KA05XY5678", value: "KA05XY5678" },
  { label: "MH12CD9012", value: "MH12CD9012" },
  { label: "DL03EF3456", value: "DL03EF3456" },
  { label: "TN07GH7890", value: "TN07GH7890" },
  { label: "KA51JK1122", value: "KA51JK1122" },
  { label: "HR26LM3344", value: "HR26LM3344" },
  { label: "WB02NP5566", value: "WB02NP5566" },
];

type SelectionProps = {
  onSelect: (data: string) => void;
  disabled: boolean
};

const NumberPlateDropDown = ({onSelect, disabled}: SelectionProps) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="w-full">
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "red" }, disabled && { backgroundColor: '#E5E7EB'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={{borderRadius: 10, padding: 2}}
        itemTextStyle={{fontFamily: "Poppins_400Regular", fontSize: 14}}
        itemContainerStyle={{borderRadius: 10}}
        iconStyle={styles.iconStyle}
        data={numberplateData}
        dropdownPosition='bottom'
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Number Plate" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value)
        }}
        renderLeftIcon={() => (
          <Octicons name="number" style={styles.icon} size={18} color={isFocus ? "red" : "gray"} />
        )}
        disable={disabled}
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

export default NumberPlateDropDown;
