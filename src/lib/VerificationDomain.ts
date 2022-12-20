export const VerificationDomain = (
  email: string,
  AppnoveDomain: string
): boolean => {
  const SpliteEmail = email.split("@");
  if (SpliteEmail.slice(-1)[0] == AppnoveDomain) {
    return true;
  } else {
    return false;
  }
};
