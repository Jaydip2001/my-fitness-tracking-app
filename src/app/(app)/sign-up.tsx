import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false); // Show verification screen after signup

  //  Handle "Create Account" button press
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    //  Validate input
    if (!emailAddress || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Weak Password", "Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    try {
      //  Call Clerk signUp
      await signUp.create({ emailAddress, password });

      //  Trigger email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true); // switch to verification screen
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err?.errors?.[0]?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  //  Handle verification code submission
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        // Verification successful, activate session and navigate to app
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Verification Error", err?.errors?.[0]?.message || "Invalid code");
    }
  };

  //  Verification UI
  const renderVerificationScreen = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={0} // 🧼 Avoid extra top padding
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 24,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View>
              {/* ✉️ Icon + Instructions */}
              <View className="items-center mb-8">
                <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                  <Ionicons name="mail" size={40} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</Text>
                <Text className="text-lg text-gray-600 text-center">
                  We've sent a verification code to{"\n"}
                  {emailAddress}
                </Text>
              </View>

              {/*  Code Input Box */}
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-5">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Enter Verification Code
                </Text>

                <View className="mb-6">
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </Text>
                  <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                    <Ionicons name="key-outline" size={20} color="#6B7280" />
                    <TextInput
                      value={code}
                      placeholder="Enter 6-digit code"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={setCode}
                      className="flex-1 ml-3 text-gray-900 text-center text-lg tracking-widest"
                      keyboardType="number-pad"
                      maxLength={6}
                      editable={!isLoading}
                    />
                  </View>
                </View>

                {/*  Verify button */}
                <TouchableOpacity
                  onPress={onVerifyPress}
                  disabled={isLoading}
                  className={`rounded-xl py-4 shadow-sm mb-4 ${
                    isLoading ? "bg-gray-400" : "bg-green-600"
                  }`}
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center justify-center">
                    <Ionicons
                      name={isLoading ? "refresh" : "checkmark-circle-outline"}
                      size={20}
                      color="white"
                    />
                    <Text className="text-white font-semibold text-lg ml-2">
                      {isLoading ? "Verifying..." : "Verify Email"}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Resend option */}
                <TouchableOpacity className="py-2">
                  <Text className="text-blue-600 font-medium text-center">
                    Didn't receive the code? Resend
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="pb-6">
                <Text className="text-center text-gray-500 text-sm">
                  Almost there! just one more step
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );

  // Sign up UI (shown before verification)
  const renderSignUpScreen = () => (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 24,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View>
              {/* Header */}
              <View className="items-center mb-8">
                <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                  <Ionicons name="fitness" size={40} color="white" />
                </View>
                <Text className="text-3xl font-bold text-gray-900 mb-2">Join FitTracker</Text>
                <Text className="text-lg text-gray-600 text-center">
                  Start your fitness journey{"\n"}and achieve your goals
                </Text>
              </View>

              {/*  Form Box */}
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Create Your Account
                </Text>

                {/* Email Field */}
                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
                  <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                    <Ionicons name="mail-outline" size={20} color="#6B7280" />
                    <TextInput
                      autoCapitalize="none"
                      value={emailAddress}
                      placeholder="Enter your email"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={setEmailAddress}
                      className="flex-1 ml-3 text-gray-900"
                      editable={!isLoading}
                    />
                  </View>
                </View>

                {/*  Password Field */}
                <View className="mb-6">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                  <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                    <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                    <TextInput
                      value={password}
                      placeholder="Create your password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={true}
                      onChangeText={setPassword}
                      className="flex-1 ml-3 text-gray-900"
                      editable={!isLoading}
                    />
                  </View>
                  <Text className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters
                  </Text>
                </View>

                {/*  Create Account Button */}
                <TouchableOpacity
                  onPress={onSignUpPress}
                  disabled={isLoading}
                  className={`rounded-xl py-4 shadow-sm mb-4 ${
                    isLoading ? "bg-gray-400" : "bg-blue-600"
                  }`}
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center justify-center">
                    <Ionicons
                      name={isLoading ? "refresh" : "person-add-outline"}
                      size={20}
                      color="white"
                    />
                    <Text className="text-white font-semibold text-lg ml-2">
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Text>
                  </View>
                </TouchableOpacity>

                <Text className="text-xs text-gray-500 text-center mb-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </Text>
              </View>

              {/*  Sign-in Redirect */}
              <View className="flex-row justify-center items-center">
                <Text className="text-gray-600">Already have an account? </Text>
                <Link href="/sign-in" asChild>
                  <TouchableOpacity>
                    <Text className="text-blue-600 font-semibold">Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>

              <View className="pb-6">
                <Text className="text-center text-gray-500 text-sm">
                  Ready to transform your fitness?
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );

  //  Show sign-up or verification screen
  return pendingVerification ? renderVerificationScreen() : renderSignUpScreen();
}
