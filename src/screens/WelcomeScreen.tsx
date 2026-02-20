import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { AuthStackParamList } from '../types';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

interface Styles {
  container: object;
  content: object;
  logo: object;
  title: object;
  subtitle: object;
  buttons: object;
  buttonSpacing: object;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo placeholder - replace with actual logo */}
        <View style={styles.logo} />
        <Text style={styles.title}>Evangel OTT</Text>
        <Text style={styles.subtitle}>Faith-based content for your journey</Text>
        <View style={styles.buttons}>
          <PrimaryButton
            title="Log In"
            onPress={() => navigation.navigate('Login')}
          />
          <View style={styles.buttonSpacing} />
          <PrimaryButton
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.screenPadding,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.accent,
    borderRadius: SPACING.radius.lg,
    marginBottom: SPACING.xl,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONTS.size.display,
    fontWeight: FONTS.weight.bold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
    marginBottom: SPACING.xxl,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
  },
  buttonSpacing: {
    height: SPACING.md,
  },
});

export default WelcomeScreen;
