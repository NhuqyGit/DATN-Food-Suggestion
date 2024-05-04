import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

const FAQScreen = ({ navigation }) => {
  const menu = [
    {
      id: 1,
      title: 'Explore Help Topics',
      topics: [
        {
          id: 1,
          title: 'Adding Personal Recipes in Android',
          content: {
            html: `
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
            <div style="max-width: 800px; margin: auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <div style="font-size:16px; display: flex; flex-direction: column;">
            <p>You can add your own personal recipes to Suggestion Food. All you need is a title to save a recipe, but you can add a picture, ingredients, directions, total cook time and even a URL link.</p>
            <p>Get started by accessing your All Personal Recipe Collection.</p>
            <p>Tap the heart icon at the bottom of the screen, then select the All Personal Recipes collections. From here, you can manage the personal recipes, you've already added or create new ones by clicking the Create Your Own Recipe button.</p>
              <img style="max-width: 300px" src="https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-4.jpg" alt="Image">
        </div>
        </div>
        </body>
            `,
          },
        },
        {
          id: 2,
          title: 'Android app Basic troubleshooting',
          content: {
            html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">

            <div style="max-width: 800px; margin: auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        
                <p style="color: #555; line-height: 1.6;">Encountering issues with your Android app? Here are some basic troubleshooting tips to help you get back on track:</p>
        
                <div class="troubleshooting-tips">
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h2 style="margin-top: 0; color: #333;">1. Restart Your Device</h2>
                        <p style="margin-bottom: 0; color: #666;">Sometimes, a simple restart can resolve many app-related issues. Press and hold the power button on your device, then select 'Restart'.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h2 style="margin-top: 0; color: #333;">2. Check Internet Connection</h2>
                        <p style="margin-bottom: 0; color: #666;">Ensure that your device is connected to a stable internet connection. Poor connectivity can lead to app malfunctioning.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h2 style="margin-top: 0; color: #333;">3. Clear App Cache</h2>
                        <p style="margin-bottom: 0; color: #666;">Over time, app cache can accumulate and cause performance issues. Go to Settings > Apps > [App Name] > Storage, then tap 'Clear Cache'.</p>
                    </div>
                </div>
            </div>
        
        </body>`,
          },
        },
        {
          id: 3,
          title: 'Home Feed',
          content: {
            html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">

            <div style="max-width: 800px; margin: auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h1 style="color: #333;">Android App Troubleshooting</h1>
        
                <h2 style="color: #333;">Home Feed Issues</h2>
                <p style="color: #555; line-height: 1.6;">Having trouble with your app's home feed? Here are some steps to resolve common issues:</p>
        
                <div class="troubleshooting-tips">
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">1. Refresh the Feed</h3>
                        <p style="margin-bottom: 0; color: #666;">Sometimes, the feed may not load properly due to a temporary glitch. Try pulling down on the screen to refresh the feed.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">2. Check Internet Connection</h3>
                        <p style="margin-bottom: 0; color: #666;">Ensure that your device is connected to a stable internet connection. Poor connectivity can lead to issues with loading the feed.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">3. Clear App Data</h3>
                        <p style="margin-bottom: 0; color: #666;">If the feed continues to have issues, try clearing the app's data. Go to Settings > Apps > [App Name] > Storage, then tap 'Clear Data'.</p>
                    </div>
        
                    <!-- Additional Tips -->
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">4. Update the App</h3>
                        <p style="margin-bottom: 0; color: #666;">Make sure you have the latest version of the app installed. Updates often include bug fixes and performance improvements.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">5. Restart Your Device</h3>
                        <p style="margin-bottom: 0; color: #666;">A simple restart can sometimes resolve various issues with the app's functionality.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">6. Check for Server Outages</h3>
                        <p style="margin-bottom: 0; color: #666;">There might be server issues on the app's end. Check the app's official website or social media for any announcements regarding downtime.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">7. Disable Battery Optimization</h3>
                        <p style="margin-bottom: 0; color: #666;">Battery optimization settings may interfere with the app's background processes. Go to Settings > Battery > Battery Optimization, then select the app and choose 'Don't Optimize'.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">8. Check App Permissions</h3>
                        <p style="margin-bottom: 0; color: #666;">Ensure the app has the necessary permissions to access data and resources on your device. Go to Settings > Apps > [App Name] > Permissions.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">9. Contact Support</h3>
                        <p style="margin-bottom: 0; color: #666;">If none of the above steps work, reach out to the app's support team for further assistance.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">10. Reinstall the App</h3>
                        <p style="margin-bottom: 0; color: #666;">As a last resort, uninstall the app and reinstall it from the Google Play Store.</p>
                    </div>
                </div>
            </div>
        
        </body>`,
          },
        },
        {
          id: 4,
          title: 'Sign-in issues',
          content: {
            html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">

            <div style="max-width: 800px; margin: auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h1 style="color: #333;">Android App Troubleshooting</h1>
        
                <h2 style="color: #333;">Sign-in Issues</h2>
                <p style="color: #555; line-height: 1.6;">Experiencing difficulties signing into your account on the app? Here are some steps to address sign-in issues:</p>
        
                <div class="troubleshooting-tips">
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">1. Check Internet Connection</h3>
                        <p style="margin-bottom: 0; color: #666;">Ensure that your device is connected to a stable internet connection. Sign-in requires an active internet connection.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">2. Verify Username and Password</h3>
                        <p style="margin-bottom: 0; color: #666;">Double-check that you are entering the correct username and password. Ensure that caps lock is off and there are no typos.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">3. Reset Password</h3>
                        <p style="margin-bottom: 0; color: #666;">If you've forgotten your password, use the "Forgot Password" option to reset it. Follow the instructions sent to your email or phone to create a new password.</p>
                    </div>
        
                    <!-- Additional Tips -->
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">4. Update the App</h3>
                        <p style="margin-bottom: 0; color: #666;">Make sure you have the latest version of the app installed. Updates often include bug fixes related to sign-in issues.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">5. Clear App Cache</h3>
                        <p style="margin-bottom: 0; color: #666;">Clearing the app's cache can sometimes resolve sign-in issues caused by corrupted cache files. Go to Settings > Apps > [App Name] > Storage, then tap 'Clear Cache'.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">6. Check Account Status</h3>
                        <p style="margin-bottom: 0; color: #666;">Ensure that your account is in good standing and not suspended or banned. Contact customer support if you suspect any issues with your account.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">7. Try Different Sign-in Method</h3>
                        <p style="margin-bottom: 0; color: #666;">If you're unable to sign in using one method (e.g., email/password), try an alternative method such as signing in with Google or Facebook.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">8. Disable VPN or Proxy</h3>
                        <p style="margin-bottom: 0; color: #666;">VPN or proxy services may interfere with the sign-in process. Disable them temporarily and try signing in again.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">9. Update Device Software</h3>
                        <p style="margin-bottom: 0; color: #666;">Ensure that your device's operating system is up to date. Outdated software can sometimes cause compatibility issues with the app.</p>
                    </div>
        
                    <div class="tip" style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <h3 style="margin-top: 0; color: #333;">10. Contact Support</h3>
                        <p style="margin-bottom: 0; color: #666;">If you've tried all the above steps and are still unable to sign in, contact the app's support team for further assistance.</p>
                    </div>
                </div>
            </div>
        
        </body>`,
          },
        },
        {
          id: 5,
          title: 'Recipe search results',
        },
        {
          id: 6,
          title: 'My saved recipes are missing',
        },
        {
          id: 7,
          title: 'Printing recipes',
        },
      ],
    },
    {
      id: 2,
      title: 'Getting Started',
      topics: [
        {
          id: 8,
          title: 'Android app overview',
        },
        {
          id: 9,
          title: 'Getting the Android app',
        },
        {
          id: 10,
          title: 'Recipes page',
        },
        {
          id: 11,
          title: 'Android Recipe search',
        },
      ],
    },
  ]

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
          </TouchableOpacity>

          <Text style={styles.head}>FAQ</Text>
          {menu?.map((item, index) => {
            return (
              <View style={[styles.titleWrapper]} key={index}>
                <Text style={styles.title}>{item?.title}</Text>
                {item?.topics?.map((topic, subIndex) => {
                  return (
                    <View key={subIndex}>
                      <TouchableOpacity
                        style={styles.subTitleWrapper}
                        onPress={() => {
                          navigation.navigate('FAQDetails', {
                            title: item?.title,
                            topic: topic,
                          })
                        }}
                      >
                        <Text style={styles.subTitle}>{topic?.title}</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          borderBottomWidth: index !== menu?.length - 1 ? 1 : 0,
                          borderBottomColor: '#F1F1F1',
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FAQScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
    marginBottom: 32,
  },

  titleWrapper: {
    paddingVertical: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },

  subTitleWrapper: {
    paddingVertical: 15,
  },

  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

