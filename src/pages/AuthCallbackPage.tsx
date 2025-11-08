import React, { useEffect, useState } from "react";

const AuthCallbackPage: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get URL parameters manually since we''re not using React Router
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const provider = urlParams.get("provider");

        if (!token || provider !== "google") {
          setStatus("error");
          setError("بيانات المصادقة غير صحيحة");
          window.location.href = "/";
          return;
        }

        // Decode the token (base64 encoded user data)
        const decodedData = JSON.parse(atob(token));

        // Store user data in localStorage
        localStorage.setItem("eshro_visitor_user", JSON.stringify(decodedData));
        localStorage.setItem("eshro_logged_in_as_visitor", "true");

        // Redirect to home immediately
        window.location.href = "/";
      } catch (err) {
        console.error("Error processing auth callback:", err);
        setStatus("error");
        setError("حدث خطأ في معالجة بيانات المصادقة");
        window.location.href = "/";
      }
    };

    handleAuthCallback();
  }, []);

  // Callback page redirects immediately, no UI needed
  return null;
};

export default AuthCallbackPage;
