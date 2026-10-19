"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppRouterCacheProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
    </AppRouterCacheProvider>
  );
}
