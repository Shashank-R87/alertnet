import LogoName from '@/components/LogoName';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

const StartPage = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <LogoName />
            <ActivityIndicator size="small" color="#808080" />
            <StatusBar style='dark'/>
        </View>
    );
};

export default StartPage;