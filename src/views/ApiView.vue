<template lang="">
  <div class="container">
    <nav class="tab">
      <button
        @click="changeTab('articles')"
        :class="{active:tabName=='articles'}"
      >
        국내
      </button>
       <button
        @click="changeTab('global-articles')"
        :class="{active:tabName=='global-articles'}"
      >
        해외
      </button>
    </nav>
    <div class="news-content">
      <NewsKorea 
        v-if="tabName=='articles'"
        :data="articles" 
        :category="category"
        @category-changed="handleCategoryChange" 
      />
      <NewsGlobal 
        v-else-if="tabName=='global-articles'"
        :data="articles" 
        :category="category"
        @category-changed="handleCategoryChange" 
      />
    </div>
  </div>
</template>
<script>
import NewsKorea from "@/components/NewsKorea";
import NewsGlobal from "@/components/NewsGlobal";
import axios from 'axios';

export default {
  props: {
    keyword: String
  },
  data(){
    return {
      tabName: 'articles',
      articles: [], // 기사 데이터 저장하는 변수
      category: 'politics'
    }
  },
  created() {
    this.category = 'politics';
    this.fetchArticlesByCategory(this.category);
  },
  watch: {
    tabName() {
      this.category = 'politics';
      this.fetchArticlesByCategory(this.category);
    },
    keyword(newKeyword) {
      if (newKeyword) {
        this.searchArticles(newKeyword);
      } else {
        this.fetchArticlesByCategory();
      }
    },
  },
  methods: {
    changeTab(tab) {
      this.tabName = tab;
    },
    handleCategoryChange(category) {
      this.$emit('clear-keyword');
      this.fetchArticlesByCategory(category);
    },
    async fetchArticlesByCategory(category = this.category) {
      try {
        if (!this.tabName || !category) {
          console.error('유효하지 않은 탭 또는 카테고리입니다.');
          return;
        }

        const res = await axios.get(`https://green-todo-server.vercel.app/news?articles=${this.tabName}&section=${category}`);
        this.articles = res.data.data;
      } catch (error) {
        console.error('기사 불러오기 오류:', error);
      }
    },
    async searchArticles(keyword) {
      try {
        if (!this.tabName || !keyword) {
          console.error('유효하지 않은 탭 또는 검색어입니다.');
          return;
        }

        const res = await axios.get(`https://green-todo-server.vercel.app/news/search?articles=${this.tabName}&keyword=${keyword}`);
        this.articles = res.data.data;
      } catch (error) {
        console.error('검색 오류:', error);
      }
    },
  },
  components:{
    NewsKorea, NewsGlobal
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