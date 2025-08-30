import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const icon: Record<string, (props: any) => JSX.Element> = {
        home: (props: any) => <Foundation name="home" size={24} color={'#000'} {...props} />,
        profile: (props: any) => <FontAwesome name="user" size={24} color={'#000'} {...props} />,
    };

    return (
        <View style={styles.tabbar} className='shadow-lg'>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >
                        {icon[route.name]
                            ? icon[route.name]({ color: isFocused ? "#ff1616" : "black" })
                            : null}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        display: 'flex',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 120,
        paddingVertical: 15,
        borderRadius: 35,
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})