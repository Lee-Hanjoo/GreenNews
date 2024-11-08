<template>
  <div id="root">
    <nav class="nav">
      <router-link to="/">뉴스모아</router-link>
      <div>
        <input
          v-model="keyword" 
          type="text" 
          class="search-input" 
          placeholder="검색어를 입력해주세요."
        />
        <img src="../src/assets/icon/icon_search.png" class="search-img" alt="search">
      </div>
    </nav>
    <router-view :keyword="keyword" @clear-keyword="clearKeyword" />
  </div>
</template>

<script>
export default {
    name: 'SearchList',
    data() {
        return {
            keyword: '',
        };
    },
    methods: {
      searchArticles() {
        // 검색어가 입력되면 검색을 실행
        this.$router.push({ path: '/', query: { search: this.keyword } });
      },
      clearKeyword() {
        this.keyword = '';
      },
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
// reset
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6,
  p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; box-sizing: border-box; color: #2f2f2f; font-size: 14px; font-family: "Noto Sans KR", sans-serif;
 line-height: 1.4; letter-spacing: -1px; font-weight: 400; word-wrap: break-word; word-break: break-word; }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section,main { display: block; }
  img { width: 100%; height: 100%; vertical-align: middle; }
  ol, ul { list-style: none; }
  blockquote, q { quotes: none; }
  blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; }
  table { border-collapse: collapse; border-spacing: 0; }
  button, input[type="button"] { padding:0; margin:0; border:none; vertical-align:middle; cursor:pointer; background:transparent; }
  input, select, button, textarea { outline: none; -moz-appearance: none;
 -webkit-appearance: none; font-size: 14px; }
  input[type="checkbox"], input[type="radio"] { display: none; }
  select { option { color: #2f2f2f; } }
  textarea { width: 100%; border: 1px solid #efefef; font-family: "Noto Sans KR", sans-serif; resize: none; border-radius: 8px; padding: 16px 20px; font-size: 14px; }
  textarea::placeholder { color: #afafaf; }
  button:focus { outline:0; }
  input { margin:0; padding:0; border:0; font-family: "Noto Sans KR", sans-serif; }
  input:read-only { background-color: #efefef; }
  input::placeholder { color: #afafaf; }
  hr { display:none; }
  a { color: inherit; font-size: inherit; }
  a:link, a:visited, a:hover, a:active { text-decoration:none; }
  .clearfix:after { content:""; visibility: hidden; display: block;
 height:0; clear:both; }
  .hidden { width: 0; height: 0; overflow: hidden; opacity: 0; visibility: hidden; font-size: 0; line-height: 0; position: absolute; 
 left: -9999px; }
  * { box-sizing: border-box; }

  #root {
    max-width: 768px;
    margin: 0 auto;
  }
  .nav {
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    > a {
      font-size: 16px;
      line-height: 34px;
      font-weight: bold;
    }
    & > div {
      .search-input {
        padding: 6px 32px 6px 12px ;
        border: 1px solid #afafaf;
        border-radius: 999px;
      }
      .search-img {
        position: absolute;
        right: 52px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
      }
    }
  }
</style>
