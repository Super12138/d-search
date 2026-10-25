<script setup lang="ts">
import "mdui/components/avatar.js";
import "mdui/components/badge.js";
import "mdui/components/card.js";

interface Props {
    /** 头部图标地址，可传入 URL 或 base64 */
    icon: string;
    /** 头部标题 */
    siteName: string;
    /** 头部描述 */
    description: string;
    /** 内容区标题 */
    title: string;
    /** 内容区正文 */
    content: string;
    /** 链接 */
    href: string;
    rerankScore: number;
}

const props = defineProps<Props>();
</script>

<template>
    <mdui-card :href="href" target="_blank">
        <div class="header">
            <mdui-badge v-if="rerankScore > 1.5">{{ rerankScore.toFixed(2) }}</mdui-badge>
            <mdui-avatar class="icon" :src="props.icon" alt="icon" />
            <div class="headline">
                <span class="title">{{ props.siteName }}</span>
                <span class="description">{{ props.href }}</span>
            </div>
        </div>
        <div class="content">
            <a class="title" target="_blank" :href="href">{{ props.title }}</a>
            <p class="content">{{ props.content }}</p>
        </div>
    </mdui-card>
</template>

<style lang="css" scoped>
mdui-card {
    width: 100%;
    padding: 1rem;
    margin: 1rem;
    display: block;
    box-sizing: border-box
}

mdui-avatar {
    background-color: rgb(var(--mdui-color-secondary-container))
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
}

.header > .headline {
    display: flex;
    flex-direction: column;
}

.header > .headline > .title {
    line-height: var(--mdui-typescale-body-medium-line-height);
    font-size: var(--mdui-typescale-body-medium-size);
    letter-spacing: var(--mdui-typescale-body-medium-tracking);
    font-weight: var(--mdui-typescale-body-medium-weight);
}

.header > .headline > .description {
    line-height: var(--mdui-typescale-label-medium-line-height);
    font-size: var(--mdui-typescale-label-medium-size);
    letter-spacing: var(--mdui-typescale-label-medium-tracking);
    font-weight: var(--mdui-typescale-label-medium-weight);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 500px;
}

.content > .title {
    line-height: var(--mdui-typescale-body-large-line-height);
    font-size: var(--mdui-typescale-body-large-size);
    letter-spacing: var(--mdui-typescale-body-large-tracking);
    font-weight: var(--mdui-typescale-body-large-weight);
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.content >.content{
    margin: 0;
}

.icon {
    height: 26px;
    width: 26px;
}
</style>
