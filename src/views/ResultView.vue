<script setup lang="ts">
import { useFetch, useStorage } from "@vueuse/core";
import { computed } from "vue";
import { useRoute } from "vue-router";

import ResultCard from "@/components/ResultCard.vue";
import type { SearchResults } from "@/interface/SearchResult";

const route = useRoute();
const query = route.params.query as string; // 已经URI编码了

const {
    isFetching,
    error,
    data: results,
} = useFetch("https://api.deepseek.com/v1/tools/search", {
    immediate: true,
    beforeFetch({ url, options, cancel }) {
        const myToken = useStorage("token", "");
        const myCount = useStorage("page_count", 10);

        if (myToken.value.trim().length === 0) {
            cancel();
            console.error("Token not set.");
        }

        options.method = "POST";

        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${myToken.value}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        options.body = JSON.stringify({ query: query, count: myCount.value });

        return { options };
    },
}).json<SearchResults>();

const resultList = computed(
    () => results.value?.results.sort((a, b) => b.rerank_score - a.rerank_score) ?? []
);
</script>

<template>
    <div class="container">
        <p>
            Search Query: {{ query }}, isFetching: {{ isFetching }}, error:
            {{ error }}
        </p>
        <div class="result-container">
            <ResultCard
                v-for="result in resultList"
                :key="result.title + result.url"
                :icon="result.site_icon"
                :site-name="result.site_name"
                :description="result.title"
                :title="result.title"
                :content="result.snippet"
                :href="result.url"
                :rerank-score="result.rerank_score"
            />
        </div>
    </div>
</template>

<style lang="css" scoped>
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.result-container {
    column-count: 1;
    column-gap: 1rem;
}
</style>
