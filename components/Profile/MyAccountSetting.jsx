import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-switch';
const MyAccountSetting = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    };
    return (
        <View style={styles.accountSettingContainer}>
            <Text style={styles.nameSetting}>Receive Nhuqy notifications</Text>
            <Switch
                backgroundActive={"#3a9693"}
                renderActiveText={false}
                renderInActiveText={false}
                barHeight={24}
                switchWidthMultiplier={2.2}
                circleSize={20}
                circleBorderWidth={0}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
  )
}

export default MyAccountSetting

const styles = StyleSheet.create({
    accountSettingContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
        paddingVertical: 12
    },
    nameSetting:{
        textAlign: 'left',
        fontSize: 15,
        color: '#231F20'
    },
})