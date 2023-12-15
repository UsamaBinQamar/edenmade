import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "./config";

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();
  const userLogin = async (email, password) => {
    setLoading(true);
    email.toLowerCase();
    await signInWithEmailAndPassword(auth, email, password).then(
      async ({ user }) => {
        const val = await user.getIdTokenResult();
        // if (val?.claims["type"] !== "payer") {
        //   signOut(auth).then(() => {
        //     setAuthUser(undefined);
        //   });
        // } else {
        setAuthUser(user);
        // }
      }
    );
    setLoading(false);
  };
  const userSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setAuthUser(result.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const userSignUp = async (email, password, displayName) => {
    setLoading(true);
    email.toLowerCase();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        // Set user display name (optional)
        await updateProfile(user, { displayName });

        // Send email verification
        await sendEmailVerification(user);

        setAuthUser(user);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const userSignOut = () => {
  //   setLoading(true);
  //   signOut(auth)
  //     .then(() => {
  //       setAuthUser(undefined);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const resetPassword = async (email) => {
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setLoading(false);
  };

  const tokenId = async () => {
    return await authUser?.getIdToken();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(undefined);
        setLoadingAuthUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    loadingAuthUser,
    loading,
    authUser,
    resetPassword,
    setAuthUser,
    userLogin,
    tokenId,
    error,
    userSignUp,
    GoogleAuthProvider,
    userSignInWithGoogle,
  };
};
