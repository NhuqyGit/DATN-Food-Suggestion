import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingItem from '../../components/Profile/SettingItem';

function GeneralSetting({ navigation }) {
  const listSettingItem = [
    {
      name: 'My Account',
      action: 'MyAccount',
    },
    {
      name: 'Dietary Preferences',
      action: 'DietaryPreferences',
    },
    {
      name: 'Terms And Policies',
      action: 'TermsAndPolicies',
    },
    {
      name: 'Feedback & Support',
      action: 'FeedbackStack',
    },
    {
      name: 'Report Problems',
      action: 'ReportProblems',
    },
    {
      name: 'About Suggestion Food',
      action: 'About',
    },
  ];

  const listComponentSettingItem = listSettingItem.map((item, index) => {
    return (
      <SettingItem
        props={item}
        navigation={navigation}
        key={index.toString()}
      />
    );
  });

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
          </TouchableOpacity>

          <Text style={styles.head}>Settings</Text>

          {listComponentSettingItem}
        </View>

        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={styles.version}>Version 1.0</Text>
          <Text style={styles.brand}>
            Part of the Suggestion Food. family of brand
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  btnBack: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F3F3',
  },
  head: {
    textAlign: 'left',
    fontSize: 24,
    marginVertical: 10,
    fontWeight: '700',
    color: '#231F20',
  },

  version: {
    fontWeight: 'bold',
  },
});

export default GeneralSetting;
