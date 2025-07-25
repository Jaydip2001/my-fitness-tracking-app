import { Stack, Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "react-native";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          headerShown: false,
          title: "exercises",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="active-workout"
        options={{
          headerShown: false,
          href:null,
         tabBarStyle:{
          display:"none"
         }
         
        }}
      />
       <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" color={color} size={size} />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          // tabBarIcon: ({ color, size }) => (
          //   <Image
          //     source={user?.imageUrl ?? user?.externalAccounts[0]?.imageUrl}
          //     className="rounded-full"
          //     style={{width: 28, height: 28, borderRadius:100}}
          //     />
          // ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
