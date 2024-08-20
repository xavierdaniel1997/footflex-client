 const handleGoogleSuccess = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post( "/auth/google",   { code: codeResponse.code }, { withCredentials: true } );

        if (response.data.user) {
          dispatch(setUser(response.data.user));
          console.log("test",  JSON.stringify(response.data.user));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/");
        } else {
          toast.error("Failed to authenticate with Google");
        }
      } catch (error) {
        console.error("Error during Google sign-up:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred during Google sign-up"
        );
      }
    },
    flow: "auth-code",
  });
