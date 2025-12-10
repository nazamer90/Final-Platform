import re

file_path = r'C:\Users\dataf\Downloads\Eishro-Platform_V7\src\pages\ShopLoginPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_code = """  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      // استخدام طريقة OAuth redirect مباشرة
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
      const state = btoa(JSON.stringify({
        timestamp: Date.now(),
        returnTo: window.location.pathname
      }));

      // رابط Google OAuth مباشر
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent('1061932024996-8q2r0a1b2c3d4e5f6g7h8i9j0k1l2m3n.apps.googleusercontent.com')}&` +
        `redirect_uri=${redirectUri}&` +
        `scope=${encodeURIComponent('openid email profile')}&` +
        `response_type=code&` +
        `state=${encodeURIComponent(state)}&` +
        `access_type=offline&` +
        `prompt=consent`;

      // إعادة التوجيه المباشرة لـ Google
      window.location.href = authUrl;

    } catch (error) {
      setError('فشل في تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.');
      setIsGoogleLoading(false);
    }
  };"""

new_code = """  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || (window.location.origin + '/auth/google/callback');
      
      if (!clientId) {
        setError('لم يتم تكوين Google OAuth بشكل صحيح. يرجى الاتصال بالدعم الفني.');
        setIsGoogleLoading(false);
        return;
      }

      const state = btoa(JSON.stringify({
        timestamp: Date.now(),
        returnTo: window.location.pathname
      }));

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(clientId)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent('openid email profile')}&` +
        `response_type=code&` +
        `state=${encodeURIComponent(state)}&` +
        `access_type=offline&` +
        `prompt=consent`;

      window.location.href = authUrl;

    } catch (error) {
      setError('فشل في تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.');
      setIsGoogleLoading(false);
    }
  };"""

if old_code in content:
    content = content.replace(old_code, new_code)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully updated ShopLoginPage.tsx")
else:
    print("Could not find the exact code to replace")
    print("Trying alternative approach...")
