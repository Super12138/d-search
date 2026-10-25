export interface SearchResults {
    results: Result[];
}

export interface Result {
    rerank_score: number;
    title: string;
    url: string;
    snippet: string;
    summary: string;
    content: string;
    site_name: string;
    site_icon: string;
    date: string;
    authority: number;
}
