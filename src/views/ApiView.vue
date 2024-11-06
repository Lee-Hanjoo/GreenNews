<template lang="">
  <div class="container">
    <nav class="tab">
      <button
        @click="changeTab('korea')"
        :class="{active:tabName=='korea'}"
      >
        국내
      </button>
       <button
        @click="changeTab('global')"
        :class="{active:tabName=='global'}"
      >
        해외
      </button>
    </nav>
    <div class="news-content">
      <div v-if="tabName=='korea'">
        <NewsKorea 
          :data="articles" 
          :category="category"
          @category-changed="fetchArticlesByCategory" 
        />
      </div>
      <div v-else-if="tabName=='global'">
        <NewsGlobal 
          :data="global_articles" 
          :category="category"
          @category-changed="fetchArticlesByCategory" 
        />
      </div>
    </div>
  </div>
</template>
<script>
import NewsKorea from "@/components/NewsKorea";
import NewsGlobal from "@/components/NewsGlobal";
import axios from 'axios';

export default {
  data(){
    return {
      tabName: 'korea',
      articles: [], // 기사 데이터 저장하는 변수
      global_articles: [],
      category: 'politics'
    }
  },
  created() {
    this.fetchArticlesByCategory(this.category);
  },
  watch: {
    tabName() {
      this.category = 'politics';
      this.fetchArticlesByCategory(this.category)
    },
    '$route.query.search'(newQuery) {
      if (newQuery) {
        this.fetchSearchResults(newQuery);
      } else {
        this.fetchSearchResults('');
      }
    },
  },
  methods: {
    changeTab(tab) {
      this.tabName = tab;
    },
    async fetchArticlesByCategory(category) {
      const res = await axios.get(`https://api-v2.deepsearch.com/v1/articles/${category}?page_size	
=30`, {
        params: {
          api_key: process.env.VUE_APP_API_KEY
        }
      })
      this.articles = res.data.data;
      const global_res = await axios.get(`https://api-v2.deepsearch.com/v1/global-articles/${category}?page_size=30`, {
        params: {
          api_key: process.env.VUE_APP_API_KEY
        }
      })
      this.global_articles = global_res.data.data;
    },
    async fetchSearchResults(query) {
      const res = await axios.get(`https://api-v2.deepsearch.com/v1/articles?keyword=${query}&page_size=30`, {
        params: {
          api_key: process.env.VUE_APP_API_KEY
        }
      })
      this.articles = res.data.data;
      const global_res = await axios.get(`https://api-v2.deepsearch.com/v1/articles?keyword=${query}&page_size=30`, {
        params: {
          api_key: process.env.VUE_APP_API_KEY
        }
      })
      this.global_articles = global_res.data.data;
    },
  },
  components:{
    NewsKorea, NewsGlobal
  },
  computed: {
    searchQuery() {
      return this.$route.query.search || "";
    },
  }
}
</script>
<style lang="scss">
  .container {
    padding: 0 40px;
  }
  .tab {
    display: flex;
    justify-content: center;
    gap: 6px;
    button {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border: 2px solid #afafaf;
      border-radius: 999px;
      color: #afafaf;
      &.active {
        font-weight: bold;
        border-color: #2f2f2f;
        background-color: #2f2f2f;
        color: #fff;
      }
    }
  }
</style>