import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { AuthStackParamList } from '../types';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

interface Styles {
  container: object;
  content: object;
  header: object;
  title: object;
  form: object;
  resendContainer: object;
  resendText: object;
  resendButtonText: object;
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [fullNameError, setFullNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSendOtp = () => {
    setFullNameError('');
    setEmailError('');
    if (!fullName.trim()) {
      setFullNameError('Full name is required');
      return;
    }
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    // MOCK: In MVP 1, any email is accepted
    setOtpSent(true);
    Alert.alert('OTP Sent', 'Please check your email for the OTP code.');
  };

  const handleVerifyAndContinue = () => {
    setOtpError('');
    if (!otp.trim()) {
      setOtpError('OTP is required');
      return;
    }
    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }
    // MOCK: In MVP 1, any 6-digit OTP is accepted
    Alert.alert('Success', 'Account created successfully!');
    // navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  const handleResendOtp = () => {
    handleSendOtp();
    Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create an Account</Text>
      </View>
      <View style={styles.form}>
        <FormField
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          error={fullNameError}
        />
        <FormField
          label="Email ID"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />
        {otpSent && (
          <>
            <FormField
              label="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter 6-digit OTP"
              keyboardType="numeric"
              autoCapitalize="none"
              error={otpError}
            />
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive OTP? </Text>
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <PrimaryButton
          title={otpSent ? 'Verify & Continue' : 'Send OTP'}
          onPress={otpSent ? handleVerifyAndContinue : handleSendOtp}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.screenPadding,
    paddingTop: SPACING.xxl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.xxxl,
    fontWeight: FONTS.weight.bold,
  },
  form: {
    width: '100%',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  resendText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.sm,
  },
  resendButtonText: {
    color: COLORS.accent,
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.medium,
  },
});

export default SignUpScreen;
