import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  theme: {
    fontFamily: {
      lato: ["Lato", "sans"],
    },
  },
  base: "",
  plugins: [react()],
});
