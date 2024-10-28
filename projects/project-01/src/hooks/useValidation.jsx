import { useCallback } from 'react';

export function useValidation() {
  const validateUsername = useCallback((username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return username.length >= 4 && username.length <= 15 && usernameRegex.test(username);
  }, []);

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    // const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    return (
      password.length >= 8 &&
      password.length <= 20 &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
      // && specialCharRegex.test(password)
    );
  }, []);

  const passwordsMatch = useCallback((password, confirmPassword) => password === confirmPassword, []);

  return { validateUsername, validateEmail, validatePassword, passwordsMatch };
}
