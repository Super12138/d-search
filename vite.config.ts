import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig, UserConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
    const baseConfig: UserConfig = {
        plugins: [
            vue({
                template: {
                    compilerOptions: {
                        // 所有以 mdui- 开头的标签名都是 mdui 组件
                        isCustomElement: (tag) => tag.startsWith("mdui-"),
                    },
                },
            }),
            vueDevTools(),
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        build: {
            rolldownOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("mdui")) {
                            return "mdui";
                        }
                        if (id.includes("vue")) {
                            return "vue";
                        }
                    },
                },
            },
        },
    };

    if (command === "serve") {
        return { ...baseConfig };
    } else {
        return {
            ...baseConfig,
            base: "/d-search/",
        };
    }
});
