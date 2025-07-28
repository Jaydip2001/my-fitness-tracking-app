import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import GoogleSignIn from '../components/GoogleSignin'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return
    if (!emailAddress || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-gray-100 to-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="px-6"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center">
            {/* Logo/Branding */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl items-center justify-center mb-4 shadow-xl">
                <Ionicons name="fitness" size={40} color="white" />
              </View>
              <Text className="text-4xl font-extrabold mb-2 tracking-wide bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm">
                GYMNI
              </Text>
              <Text className="text-base text-gray-600 text-center leading-relaxed">
                Track your fitness journey{'\n'}and reach your goals
              </Text>
            </View>
  
            {/* Sign in form */}
            <View className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20 mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Welcome Back
              </Text>
  
              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
                <View className="flex-row items-center bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-4 border border-gray-300 shadow-sm">
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
  
              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                <View className="flex-row items-center bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-4 border border-gray-300 shadow-sm">
                  <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  <TextInput
                    value={password}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!isLoading}
                  />
                </View>
              </View>
            </View>
  
            {/* Sign In Button */}
            <TouchableOpacity
              onPress={onSignInPress}
              disabled={isLoading}
              className={`rounded-2xl py-4 shadow-md mb-4 ${
                isLoading ? 'bg-gray-400' : 'bg-blue-700'
              }`}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <Ionicons name="refresh" size={20} color="white" />
                ) : (
                  <Ionicons name="log-in-outline" size={20} color="white" />
                )}
                <Text className="text-white font-semibold text-lg ml-2">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </View>
            </TouchableOpacity>
  
            {/* Divider */}
            <View className="flex-row items-center my-1">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="px-4 text-gray-500 text-sm">or</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>
  
            {/* Google Sign In */}
            <GoogleSignIn />
  
            {/* Sign Up */}
            <View className="flex-row justify-center items-center mt-5">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
  
            {/* Footer */}
            <View className="py-6">
              <Text className="text-center text-gray-500 text-sm">
                Developed by <Text className="font-bold">Jaydip Darji</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}