import { Text, View } from "react-native";
import './global.css';
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
        className="flex-1 justify-center items-center"
    >
      <Text
        className="text-4xl text-dark-100 font-bold"
      >Welcome!huy</Text>
      <Link href={'/onboarding'}>Onboarding</Link>
      <Link href={'/movie/avengers'}>Avenger Movie</Link>
    </View>
  );
}
