import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const makeData = [
  { label: "Maruti Suzuki", value: "Maruti Suzuki" },
  { label: "Mahindra & Mahindra", value: "Mahindra & Mahindra" },
  { label: "Tata Motors", value: "Tata Motors" },
  { label: "Hyundai", value: "Hyundai" },
  { label: "Toyota", value: "Toyota" },
  { label: "Kia", value: "Kia" },
  { label: "Mercedes-Benz", value: "Mercedes-Benz" },
  { label: "Ashok Leyland", value: "Ashok Leyland" },
];

type SelectionProps = {
  onSelect: (data: string) => void;
  disabled: boolean
};

const MakeDropDown = ({onSelect, disabled}:SelectionProps) => {
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
        data={makeData}
        maxHeight={300}
        dropdownPosition='bottom'
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Make" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item.value)
        }}
        renderLeftIcon={() => (
          <FontAwesome name="car" style={styles.icon} size={16} color={isFocus ? "red" : "gray"} />
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

export default MakeDropDown;
