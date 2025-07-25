import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'

export default function ProfilePage() {
  const {signOut} = useAuth();

 const handleSignOut = () => {
  Alert.alert("Sign Out", "Are you sure you want to sign out?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Sign Out",
      style: "destructive",
      onPress: () => signOut(),
    },
  ]);
};
  return (
    <SafeAreaView  className='flex flex-1'>
      <Text>profile</Text>

      {/* Sign out  */}

      <View className='px-6 mb-6'>
        <TouchableOpacity onPress={handleSignOut}
        className='bg-red-600 rounded-2xl p-4 shadow-sm'
        activeOpacity={0.8}
        >
          <View className='flex-row items-center justify-center'>
            <Ionicons name='log-out-outline' size={20} color="white"/>
            <Text className='"text-white font-semibold text-lg ml-2'>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

