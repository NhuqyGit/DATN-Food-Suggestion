import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';

const screenWidth = Dimensions.get('window').width;

const About = ({ navigation }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topics = [
    {
      id: 1,
      title: 'Terms of Use',
      content: `
            <h2>1. Introduction</h2>
            <p>This Terms of Use Agreement ("Agreement") constitutes a legal agreement between IntelliTaste ("we," "us," or "our") and you ("you" or "your") regarding your access to and use of the IntelliTaste mobile application (the "App").</p>
            <h2>2. Acceptance of Terms</h2>
            <p>By downloading, installing, or using the App, you agree to be bound by the terms and conditions of this Agreement. If you disagree with any part of the Agreement, then you may not access or use the App.</p>
            <h2>3. User Accounts</h2>
            <p>You may be required to create an account to access certain features of the App. You are responsible for maintaining the confidentiality of your account information, including your login credentials, and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account or any other security breaches.</p>
            <h2>4. Acceptable Use</h2>
            <p>You agree to use the App for lawful purposes only and in accordance with this Agreement. You agree not to use the App:</p>
            <ul>
              <li>In any way that violates any applicable laws or regulations.</li>
              <li>To harm, threaten, abuse, or harass others.</li>
              <li>To interfere with or disrupt the App or the servers or networks connected to the App.</li>
              <li>To upload, transmit, or distribute any content that is defamatory, obscene, or otherwise objectionable.</li>
              <li>To impersonate any person or entity.</li>
              <li>To attempt to gain unauthorized access to the App or any other accounts, systems, or networks connected to the App.</li>
            </ul>
            <h2>5. Content</h2>
            <p>The App may contain content provided by us or by third parties. This content is protected by intellectual property laws. You agree not to modify, reproduce, distribute, or create derivative works of this content without our express written permission.</p>
            <h2>6. Disclaimer of Warranties</h2>
            <p>THE APP IS PROVIDED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL FUNCTION UNINTERRUPTED, ERROR-FREE, OR VIRUS-FREE.</p>
            <h2>7. Limitation of Liability</h2>
            <p>WE SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING OUT OF YOUR USE OF THE APP, INCLUDING, BUT NOT LIMITED TO, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, AND PUNITIVE DAMAGES.</p>
            <h2>8. Termination</h2>
            <p>We may terminate your access to the App at any time, for any reason, without notice.</p>
            <h2>9. Changes to the Agreement</h2>
            <p>We may revise this Agreement at any time by posting the revised terms on the App. You are expected to check this page periodically so you are aware of any changes, as they are binding on you.</p>
            <h2>10. Governing Law</h2>
            <p>This Agreement shall be governed by and construed in accordance with the laws of Vietnam, without regard to its conflict of law provisions.</p>
            <h2>11. Entire Agreement</h2>
            <p>This Agreement constitutes the entire agreement between you and us regarding your use of the App.</p>
            <h2>12. Contact Us</h2>
            <p>If you have any questions about this Agreement, please contact us at phanthihuunien@gmail.com</p>
      `,
    },
    {
      id: 2,
      title: 'Privacy Notice',
      content: `
        <h2>Privacy Notice</h2>
        <p>This Privacy Notice ("Notice") describes how IntelliTaste ("we," "us," or "our") collects, uses, and discloses your personal information when you use our mobile application, IntelliTaste ("App").</p>
        <h3>1. Information We Collect</h3>
        <p>We collect several types of information from and about users of our App:</p>
        <ul>
          <li><strong>Personal Information:</strong> This may include information that can be used to identify you, such as your name, email address, phone number, and username (if applicable).</li>
          <li><strong>Usage Data:</strong> This information may include data about your activity within the App, such as the features you use, the content you access, and the time and date of your activity.</li>
          <li><strong>Device Information:</strong> This information may include the type of device you use, your operating system, device identifiers, IP address, and browser information.</li>
        </ul>
        <h3>2. How We Collect Information</h3>
        <p>We collect information from you directly when you provide it to us, such as when you create an account (if applicable) or contact us through the App.</p>
        <p>We also collect information automatically through your use of the App. This information is collected using cookies and similar tracking technologies.</p>
        <h3>3. How We Use Your Information</h3>
        <p>We use the information we collect for several purposes, including:</p>
        <ul>
          <li>To provide and operate the App</li>
          <li>To personalize your experience with the App</li>
          <li>To improve the App and develop new features</li>
          <li>To send you marketing communications (if you consent)</li>
          <li>To respond to your inquiries and requests</li>
          <li>To comply with legal and regulatory obligations</li>
        </ul>
        <h3>4. Sharing Your Information</h3>
        <p>We may share your information with third-party service providers who help us operate the App, such as data storage providers and analytics providers. We may also share your information with other third parties with your consent.</p>
        <h3>5. Your Choices</h3>
        <p>You have choices regarding your information:</p>
        <ul>
          <li>You can opt out of receiving marketing communications from us.</li>
          <li>You can access and update your personal information through the App settings (if applicable).</li>
          <li>You can delete your account (if applicable).</li>
        </ul>
        <h3>6. Data Retention</h3>
        <p>We will retain your information for as long as it is necessary to fulfill the purposes described in this Notice, unless a longer retention period is required or permitted by law.</p>
        <h3>7. Children's Privacy</h3>
        <p>Our App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us.</p>
        <h3>8. Security</h3>
        <p>We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage is 100% secure.</p>
        <h3>9. Changes to this Notice</h3>
        <p>We may update this Notice from time to time. We will notify you of any changes by posting the new Notice on the App.</p>
        <h3>10. Contact Us</h3>
        <p>If you have any questions about this Notice, please contact us at phanthihuunien@gmail.com</p>
      `,
    },    
    {
      id: 3,
      title: 'Copyright Policy',
      content: `
        <h2>Copyright Policy</h2>
        <p>This Copyright Policy ("Policy") outlines the terms and conditions regarding the use of copyrighted material within the IntelliTaste mobile application ("App").</p>
        <h3>1. Ownership of Content</h3>
        <p>All content available in the App, including but not limited to text, images, graphics, logos, and audiovisual materials, is the property of IntelliTaste or its licensors and is protected by copyright laws.</p>
        <h3>2. Permitted Use</h3>
        <p>Users of the App are granted a limited, non-exclusive, non-transferable license to access and use the content for personal and non-commercial purposes only. Any unauthorized use, reproduction, or distribution of the content is strictly prohibited.</p>
        <h3>3. Reporting Copyright Infringement</h3>
        <p>If you believe that any content in the App infringes upon your copyright, please contact us at phanthihuunien@gmail.com with the following information:</p>
        <ul>
          <li>Description of the copyrighted work</li>
          <li>Identification of the infringing material</li>
          <li>Your contact information</li>
          <li>A statement that you have a good faith belief that the use of the material is not authorized</li>
          <li>A statement that the information provided is accurate</li>
        </ul>
        <h3>4. Removal of Infringing Content</h3>
        <p>Upon receipt of a valid copyright infringement notice, we will promptly remove or disable access to the infringing material.</p>
        <h3>5. Contact Us</h3>
        <p>If you have any questions about this Copyright Policy, please contact us at phanthihuunien@gmail.com</p>
      `,
    },    
    {
      id: 4,
      title: 'Do Not Sell My Personal Information',
      content: `
        <h2>Do Not Sell My Personal Information</h2>
        <p>This section outlines your rights under the California Consumer Privacy Act (CCPA) and provides information on how to opt-out of the sale of your personal information.</p>
        <h3>1. Right to Opt-Out</h3>
        <p>Under the CCPA, California residents have the right to opt-out of the sale of their personal information. If you would like to exercise this right, please complete the form below:</p>
        <h3>2. Verification Process</h3>
        <p>We may need to verify your identity before processing your request. This may involve requesting additional information or documentation from you.</p>
        <h3>3. No Discrimination</h3>
        <p>We will not discriminate against you for exercising your rights under the CCPA, including the right to opt-out of the sale of your personal information.</p>
        <h3>4. Contact Us</h3>
        <p>If you have any questions about opting out of the sale of your personal information, please contact us at phanthihuunien@gmail.com</p>
      `,
    },    
  ];

  const handleTopicPress = (id) => {
    setSelectedTopic(selectedTopic === id ? null : id);
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
          </TouchableOpacity>

          <Text style={styles.head}>About IntelliTaste</Text>

          <Text style={styles.content}>
            IntelliTaste was launched in 2024 by students of HCMUS on a mission to invent the ultimate kitchen tool. Whether it's finding a recipe or going to the store, IntelliTaste wants to make it easier for foodies to do what they love - cook, eat, and share!. IntelliTaste's mission is to be the world's largest, most powerful and most helpful food site in the world.
          </Text>

          {topics.map((topic) => (
            <View key={topic.id}>
              <TouchableOpacity
                style={styles.subTitleWrapper}
                onPress={() => handleTopicPress(topic.id)}
              >
                <Text style={styles.subTitle}>{topic.title}</Text>
              </TouchableOpacity>
              {selectedTopic === topic.id && (
                <View style={styles.topicContent}>
                  <RenderHtml
                    contentWidth={screenWidth}
                    source={{ html: topic.content }}
                  />
                </View>
              )}
              <View
                style={{
                  borderBottomWidth: topic.id !== topics.length ? 1 : 0,
                  borderBottomColor: '#F1F1F1',
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

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
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  subTitleWrapper: {
    paddingVertical: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topicContent: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
});
