<script setup lang="ts">
import "mdui/components/layout.js";
import "mdui/components/layout-item.js";
import "mdui/components/layout-main.js";
import "mdui/components/top-app-bar.js";
import "mdui/components/top-app-bar-title.js";
import { onMounted } from "vue";
import { RouterView } from "vue-router";

onMounted(() => {
    document.body.classList.add("ready");
});
</script>

<template>
    <mdui-layout>
        <mdui-top-app-bar>
            <mdui-top-app-bar-title>D Search</mdui-top-app-bar-title>
        </mdui-top-app-bar>

        <mdui-layout-main>
            <RouterView />
        </mdui-layout-main>
    </mdui-layout>
</template>
