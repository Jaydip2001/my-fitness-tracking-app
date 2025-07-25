import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image, Linking, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { urlFor, client } from '@/lib/sanity/client';
import { Exercise } from "@/lib/sanity/types";
import { defineQuery } from 'groq';
import Markdown from 'react-native-markdown-display';

const singleExerciseQuery = defineQuery(`*[_type == "exercise" && _id == $id][0]`);

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner": return "bg-green-500";
    case "intermediate": return "bg-yellow-500";
    case "advanced": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "beginner": return "Beginner";
    case "intermediate": return "Intermediate";
    case "advanced": return "Advanced";
    default: return "Unknown";
  }
};

export default function ExerciseDetail() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGuidance, setAiGuidance] = useState<string | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchExercise = async () => {
      if (!id) return;
      try {
        const exerciseData = await client.fetch(singleExerciseQuery, { id });
        setExercise(exerciseData as Exercise);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  // Placeholder for future AI logic
  const getAiGuidance = async () => {
    if (!exercise) return;
    setAiLoading(true);
  
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseName: exercise.name,
        }),
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch AI guidance");
      }
    
      const data = await response.json();
      setAiGuidance(data.message);
    } catch (error) {
      console.error("Error fetching AI guidance:", error);
      setAiGuidance(
        "Sorry, there was an error getting AI guidance. Please try again."
      );
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="text-gray-500">Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar barStyle="light-content" backgroundColor="#0000ff" />
      <View className="absolute top-12 left-0 right-0 z-10 px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="h-80 bg-white relative">
          {exercise?.image ? (
            <Image
              source={{ uri: urlFor(exercise.image.asset._ref).url() }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={80} color="white" />
            </View>
          )}
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </View>

        {/* Content */}
        <View className="px-6 py-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                {exercise?.name}
              </Text>
            </View>
            <View className={`self-start px-4 py-2 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
              <Text className="text-sm font-semibold text-white">
                {getDifficultyText(exercise.difficulty)}
              </Text>
            </View>
          </View>

          <Text className="text-lg font-bold text-gray-800 mb-2">Description</Text>
          <Text className="text-lg text-gray-600 mb-4">
            {exercise.description}
          </Text>

          {/* Video */}
          {exercise.videoUrl && (
            <View className="mb-6">
              <Text className="text-xl font-semibold text-gray-800 mb-3">Video Tutorial</Text>
              <TouchableOpacity
                className="bg-red-500 rounded-xl p-4 flex-row items-center"
                onPress={() => Linking.openURL(exercise.videoUrl)}
              >
                <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
                  <Ionicons name="play" size={20} color="#EF4444" />
                </View>
                <View>
                  <Text className="text-white font-semibold text-lg">Watch Tutorial</Text>
                  <Text className="text-red-100 text-sm">Learn proper form</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* AI Guidance */}
          {aiGuidance && (
  !aiLoading ? (
    <View className="mt-6">
      <View className="flex-row items-center mb-2">
        <Ionicons name="sparkles" size={20} color="#3B82F6" />
        <Text className="text-lg font-bold text-blue-800 ml-2">AI Guidance</Text>
      </View>

      <View className="bg-blue-50 p-5 rounded-xl border border-blue-200">
        <Markdown
          style={{
            body: {
              paddingBottom: 20,
            },
            heading2: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#3B82F6",
            },
            heading3: {
              fontSize: 16,
              fontWeight: "bold",
              color: "#3B82F6",
            },
          }}
        >
          {aiGuidance}
        </Markdown>
      </View>
    </View>
  ) : null
)}


          {/* AI Guidance Button */}
          <View className="mt-8 gap-2">
            <TouchableOpacity
              className={`rounded-xl py-4 items-center ${
                aiLoading ? "bg-gray-400" : "bg-blue-500"
              }`}
              onPress={getAiGuidance}
              disabled={aiLoading}
            >
              {aiLoading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white font-bold text-lg ml-2">Loading...</Text>
                </View>
              ) : (
                <Text className="text-white font-bold text-lg">
                  Get AI Guidance on Form & Technique
                </Text>
              )}
            </TouchableOpacity>

            {aiGuidance && (
              <View className="mt-6 bg-blue-50 p-5 rounded-xl border border-blue-200">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="sparkles" size={20} color="#3B82F6" />
                  <Text className="text-lg font-bold text-blue-800 ml-2">AI Guidance</Text>
                </View>
                <Text className="text-base text-gray-700 leading-relaxed">{aiGuidance}</Text>
              </View>
            )}

            <TouchableOpacity
              className="bg-gray-200 rounded-xl py-4 items-center"
              onPress={() => router.back()}
            >
              <Text className="text-gray-800 font-bold text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
