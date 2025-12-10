import React, { useEffect, useState } from "react";

const AuthCallbackPage: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get URL parameters from Google OAuth response
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const errorParam = urlParams.get("error");

        // Check for OAuth errors
        if (errorParam) {
          setStatus("error");
          setError(`خطأ في Google OAuth: ${errorParam}`);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return;
        }

        if (!code || !state) {
          setStatus("error");
          setError("معاملات استدعاء الرجوع غير صحيحة");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return;
        }

        // Decode state to verify it's from our request
        try {
          const decodedState = JSON.parse(atob(state));
          console.log("State validation:", decodedState);
        } catch (e) {
          console.warn("Could not validate state:", e);
        }

        // في تطبيق حقيقي، يتم إرسال الـ code للخادم للتحقق والحصول على user info
        // للآن، سنقوم بمحاكاة نجاح تسجيل الدخول
        
        // نموذج بيانات مستخدم Google
        const mockGoogleUser = {
          id: "google-" + Math.random().toString(36).substr(2, 9),
          email: "user@gmail.com",
          name: "Google User",
          picture: "https://via.placeholder.com/40",
          provider: "google",
          code: code
        };

        // حفظ بيانات المستخدم
        localStorage.setItem("eshro_google_user", JSON.stringify(mockGoogleUser));
        localStorage.setItem("eshro_google_auth_code", code);
        localStorage.setItem("eshro_logged_in_via_google", "true");
        localStorage.setItem("eshro_current_user", JSON.stringify({
          ...mockGoogleUser,
          token: 'google-token-' + Date.now(),
          userType: 'user',
          loginTime: new Date().toISOString()
        }));

        setStatus("success");
        
        // إعادة التوجيه بعد ثانية واحدة
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        
      } catch (err) {
        setStatus("error");
        setError("حدث خطأ في معالجة البيانات من Google");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 text-lg">جاري معالجة بيانات تسجيل الدخول...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <p className="text-green-700 text-lg">تم تسجيل الدخول بنجاح!</p>
            <p className="text-gray-600 text-sm mt-2">جاري إعادة التوجيه...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-red-600 text-5xl mb-4">✕</div>
            <p className="text-red-700 text-lg">{error}</p>
            <p className="text-gray-600 text-sm mt-2">جاري إعادة التوجيه...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackPage;
