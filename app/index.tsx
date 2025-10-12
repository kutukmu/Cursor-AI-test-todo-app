import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the tabs layout (plan screen)
    router.replace("/(tabs)/plan");
  }, []);

  return null;
}
