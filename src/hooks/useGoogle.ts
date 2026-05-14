import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ENV from "../config/env";

const useGoogle = () => {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: ENV.FIREBASE.WEB_CLIENT_ID,
      scopes: ["profile", "email"],
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      setLoading(true);
      setErr(null);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const signInResult = await GoogleSignin.signIn();

      const googleIdToken = signInResult.idToken;

      if (!googleIdToken) {
        throw new Error("Google ID token not found");
      }

      const googleCredential =
        GoogleAuthProvider.credential(googleIdToken);

      const result = await signInWithCredential(
        getAuth(),
        googleCredential
      );

      const firebaseIdToken = await result.user.getIdToken();

      setIdToken(firebaseIdToken);

      return result;
    } catch (error) {
      console.log("❌ Google Sign-In Error:", error);
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    onGoogleButtonPress,
    idToken,
    err,
    loading,
  };
};

export default useGoogle;