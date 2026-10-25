<script setup lang="ts">
import "@mdui/icons/search--outlined.js";
import "mdui/components/button-icon.js";
import "mdui/components/button.js";
import "mdui/components/collapse-item.js";
import "mdui/components/collapse.js";
import "mdui/components/list-item.js";
import "mdui/components/list.js";
import "mdui/components/slider.js";
import "mdui/components/text-field.js";
import { useStorage } from "@vueuse/core";
import { TextField } from "mdui/components/text-field.js";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const apiKey = useStorage("token", "");
const pageCount = useStorage("page_count", 10);

const emptyTip = "Value cannot be empty.";

const isValidate = ref(false);
const searchQueryRef = useTemplateRef<TextField>("search-query");
const apiKeyRef = useTemplateRef<TextField>("api-key");
const searchQuery = ref("");
const specificSite = ref("");
const searchLanguage = ref("");
const searchQueryError = computed(() => isValidate.value && searchQuery.value.length === 0);
const apiKeyError = computed(() => isValidate.value && apiKey.value.length === 0);

const navigateToDetail = () => {
    if (!isValidate.value) isValidate.value = true;
    if (searchQueryError.value || apiKeyError.value) return;

    const sitesStr = specificSite.value
        .split(",")
        .map((val) => `site:${val}`)
        .join(" OR ");

    const langStr = searchLanguage.value.split(",").join(",");

    const finalKeyword = `${searchQuery.value} ${sitesStr} lang:${langStr}`;
    router.push(`/search/${encodeURIComponent(finalKeyword)}`);
};

watch(searchQueryError, (isError) => {
    searchQueryRef.value?.setCustomValidity(isError ? emptyTip : "");
});

watch(apiKeyError, (isError) => {
    apiKeyRef.value?.setCustomValidity(isError ? emptyTip : "");
});

onMounted(() => {
    searchQueryRef.value?.focus();
});
</script>

<template>
    <div class="container">
        <form class="search-panel" @submit.prevent="navigateToDetail">
            <mdui-text-field
                ref="api-key"
                label="Key"
                v-model.trim="apiKey"
                type="password"
                maxlength="35"
            ></mdui-text-field>

            <mdui-text-field
                ref="search-query"
                label="Search anything..."
                v-model.trim="searchQuery"
                maxlength="128"
            >
                <mdui-button-icon slot="icon" type="submit" :disabled="searchQueryError">
                    <mdui-icon-search--outlined></mdui-icon-search--outlined>
                </mdui-button-icon>
            </mdui-text-field>
        </form>
        <mdui-list>
            <mdui-collapse accordion>
                <mdui-collapse-item>
                    <mdui-list-item slot="header">高级</mdui-list-item>
                    <div style="margin-left: 2.5rem">
                        <mdui-list-item headline="指定站点" description="多个站点请用英文逗号隔开">
                            <mdui-text-field
                                label="站点"
                                slot="end-icon"
                                v-model.trim.lazy="specificSite"
                            ></mdui-text-field>
                        </mdui-list-item>

                        <mdui-list-item headline="指定语言" description="多个语言请用英文逗号隔开">
                            <mdui-text-field
                                label="语言"
                                placeholder="e.g. zh,en"
                                slot="end-icon"
                                v-model.trim.lazy="searchLanguage"
                            ></mdui-text-field>
                        </mdui-list-item>
                    </div>
                </mdui-collapse-item>
            </mdui-collapse>
        </mdui-list>
    </div>
</template>

<style lang="css" scoped>
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
}

.search-panel {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    padding-left: 20%;
    padding-right: 20%;
}

mdui-text-field {
    display: block;
}
</style>
