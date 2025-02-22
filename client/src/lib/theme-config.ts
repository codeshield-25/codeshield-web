export type ThemeConfig = {
    defaultTheme: "light" | "dark" | "system"
    storageKey: string
    disableTransitionOnChange: boolean
  }
  
  export const themeConfig = {
    defaultTheme: "system",
    storageKey: "codeshield-theme",
    disableTransitionOnChange: false,
  } as const
  
  