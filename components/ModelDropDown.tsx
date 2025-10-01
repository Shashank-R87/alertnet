import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const modelData = [
  { label: "Swift", value: "Swift" }, // Maruti Suzuki
  { label: "Thar", value: "Thar" }, // Mahindra & Mahindra
  { label: "Nexon", value: "Nexon" }, // Tata Motors
  { label: "Creta", value: "Creta" }, // Hyundai
  { label: "Innova Hycross", value: "Innova Hycross" }, // Toyota
  { label: "Seltos", value: "Seltos" }, // Kia
  { label: "C-Class", value: "C-Class" }, // Mercedes-Benz
  { label: "Dost", value: "Dost" }, // Ashok Leyland
];

type SelectionProps = {
  onSelect: (data: string) => void;
  disabled: boolean
};

const ModelDropDown = ({onSelect, disabled}:SelectionProps) => {
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
        data={modelData}
        maxHeight={300}
        dropdownPosition='bottom'
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Model" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value)
        }}
        renderLeftIcon={() => (
          <MaterialIcons name="model-training" style={styles.icon} size={20} color={isFocus ? "red" : "gray"} />
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

export default ModelDropDown;
