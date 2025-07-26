import {
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { useWorkoutStore, WorkoutSet } from "store/workout-store";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ExerciseSelectionModal from "@/app/components/ExerciseSelectionModal";
import { client } from "@/lib/sanity/client";
import groq from "groq";
import { useUser } from "@clerk/clerk-expo";
import { WorkoutData } from "@/app/api/save-workout+api";





export default function ActiveWorkout() {
  const [showExerciseSelection, setShowExerciseSelection] = useState(false);

  const {
    workoutExercises,
    setWorkoutExercises,
    resetWorkout,
    weightUnit,
    setWeightUnit,
  } = useWorkoutStore();
  const router = useRouter();
//use the stopwatch hook to track the workout duration
  const { seconds, minutes, hours, totalSeconds, reset } = useStopwatch({
    autoStart: true,
  });
  //Reset timer when screen is no focused
  useFocusEffect(
    React.useCallback(() => {
      //Only reset if we have no exercise(indicates a freshe start after ending workout)
      if (workoutExercises.length === 0) {
        reset();
      }
    }, [workoutExercises.length, resetWorkout])
  );

  
  
  const getWorkoutDuration = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const cancelWorkout = () => {
    Alert.alert(
      "Cancel Workout",
      "Are you sure you want to cancel the workout?",
      [
        { text: "No", style: "cancel" },
        {
          text: "End Workout",
          onPress: () => {
            resetWorkout();
            router.back();
          },
        },
      ]
    );
  };
  const addExercise = () => {
    setShowExerciseSelection(true);
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      {/* Top Safe Area */}
      <View
        className="bg-gray-800"
        style={{
          paddingTop: Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0,
        }}
      />
      {/* Header */}
      <View className="bg-gray-800 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-xl font-semibold">
              Active Workout
            </Text>
            <Text className="text-gray-300">{getWorkoutDuration()}</Text>
          </View>

          <View className="flex-row items-center space-x-3 gap-2">
            {/* Weight Unit Toggle */}
            <View className="flex-row bg-gray-700 rounded-lg p-1">
              <TouchableOpacity
                onPress={() => setWeightUnit("lbs")}
                className={`px-3 py-1 rounded ${
                  weightUnit === "lbs" ? "bg-blue-600" : ""
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    weightUnit === "lbs" ? "text-white" : "text-gray-300"
                  }`}
                >
                  lbs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setWeightUnit("kg")}
                className={`px-3 py-1 rounded ${
                  weightUnit === "kg" ? "bg-blue-600" : ""
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    weightUnit === "kg" ? "text-white" : "text-gray-300"
                  }`}
                >
                  kg
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={cancelWorkout}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-medium">End Workout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
         {/* Content Area */}
         <View className="flex-1 bg-white">
        {/* Workout Progress */}
        <View className="px-6 mt-4">
          <Text className="text-center text-gray-600 mb-2">
            {workoutExercises.length} exercises
          </Text>
        </View>
        
        {/* If no exercises, show a message */}
        {workoutExercises.length === 0 && (
          <View className="bg-gray-50 rounded-2xl p-8 items-center mx-6">
            <Ionicons name="barbell-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-600 text-lg text-center mt-4 font-medium">
              No exercises yet
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Get started by adding your first exercise below
            </Text>
          </View>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView className="flex-1 px-6 mt-4">
            {workoutExercises.map((exercise) => (
              <View key={exercise.id} className="mb-8">
                {/* Exercise Header */}
              </View>
            ))}
            {/* Add Exercise Button */}
            <TouchableOpacity
            onPress={addExercise}
            className="bg-blue-600 rounded-2xl py-4 items-center mb-8 active:bg-blue-700"
            activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                <Ionicons name="add" size={20} color="white" style={{marginRight: 8}} />
                <Text className="text-white font-semibold text-lg">Add Exercise</Text>                
              </View>
            </TouchableOpacity>
            
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      {/* Exercise Selection Modal */}
      <ExerciseSelectionModal
      visible={showExerciseSelection}
      onClose={() => setShowExerciseSelection(false)}
    />
    </View>


  )
}
