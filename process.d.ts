declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    SHEET_ID: string;
    GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
    GOOGLE_PRIVATE_KEY: string;
    NEXT_PUBLIC_VERIFICATION_DOMAIN: string;
    NEXT_PUBLIC_DISCORD_TOKEN: string;
    DISCORD_CHANNED_ID: string;
  }
}
