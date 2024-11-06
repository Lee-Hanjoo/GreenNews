<template lang="">
  <div>
    <div class="top">
      <swiper
    :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    navigation
    :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="article in data.slice(0, 10)" :key="article.id" @click="openNewWindow(article.content_url)">
          <img v-if="article.image_url" :src="article.image_url" class="top-img"/>
          <img v-else src="../assets/img_top_nodata.png" class="top-img"/>
          <p class="top-title">{{ article.title }}</p>
        </swiper-slide>
      </swiper>
    </div>
    <div class="bottom">
      <div class="category-tab-wrap">
        <ul>
          <li @click="changeCategory('politics')" :class="{active:category=='politics'}">정치</li>
          <li @click="changeCategory('economy')" :class="{active:category=='economy'}">경제</li>
          <li @click="changeCategory('society')" :class="{active:category=='society'}">사회</li>
          <li @click="changeCategory('culture')" :class="{active:category=='culture'}">문화</li>
          <li @click="changeCategory('world')" :class="{active:category=='world'}">세계</li>
          <li @click="changeCategory('tech')" :class="{active:category=='tech'}">기술</li>
          <li @click="changeCategory('entertainment')" :class="{active:category=='entertainment'}">오락</li>
          <li @click="changeCategory('opinion')" :class="{active:category=='opinion'}">의견</li>
        </ul>
      </div>
      <ul class="new-list">
        <li 
          v-for="article in data.slice(10, 30)" 
          :key="article.id"
          @click="openNewWindow(article.content_url)"
        >
          <div class="bottom-img-wrap">
            <p>{{ article.publisher }}</p>
          <img v-if="article.thumbnail_url" :src="article.thumbnail_url" class="top-img"/>
          <img v-else src="../assets/img_bottom_nodata.png"/>
          </div>
          <div class="bottom-info">
            <p class="bottom-title">{{ article.title }}</p>
            <p class="bottom-summary"> {{article.summary }}</p>
            <div class="bottom-date-wrap">
              <p class="date">{{ article.published_at.slice(0, 10) }} </p>
              <p class="author" v-if="article.author">{{ article.author }} 기자</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
  import 'swiper/scss/navigation';
  import 'swiper/scss/pagination';

export default {
  data() {
    return {
      category: 'politics',
    }
  },
  props: {
    data: Array,
    title: String
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Autoplay]
    };
  },
  methods: {
    openNewWindow(url) {
      window.open(url, '_blank')
    },
    changeCategory(newCategory) {
      this.category = newCategory;
      this.$emit('category-changed', newCategory);
    },
  }
};
</script>
<style lang="scss">
  .top {
    width: 100%;
    margin-top: 20px;
    .top-img {
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
      border: 1px solid #efefef;
    }
    .top-title {
      margin-top: 12px;
      font-size: 24px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .swiper-button-prev, .swiper-button-next {
      padding: 0 30px;
      top: 150px;
      z-index: 999;
    }
    .swiper-button-prev::after, .swiper-button-next::after {
      font-size: 30px;
      color: #fff;
    }
    .swiper-button-prev {
      left: 0px;
    }
    .swiper-button-next {
      right: 0px;
    }
    .swiper-button-next {
      top: 150px
    }
    .swiper-pagination{
      bottom: 62px;
      .swiper-pagination-bullet {
        background: #fff;
      }
      .swiper-pagination-bullet-active {
        background: #fff;
      }
    }
  }
  .bottom {
    margin-top: 32px;
    padding: 40px 0px;
    border-top: 1px solid #2f2f2f;
    border-bottom: 1px solid #2f2f2f;
    .category-tab-wrap {
      margin-bottom: 24px;
      ul {
        display: flex;
        align-items: center;
        li {
          padding: 8px 16px;
          background-color: #efefef;
          border: 1px solid #afafaf;
          color: #afafaf;
          border-bottom: 0;
          flex: 1;
          text-align: center;
          &:not(:first-of-type) {
            margin-left: -1px;
          }
          &.active {
            background-color: #fff;
            border: 1px solid #2f2f2f;
            color: #2f2f2f;
            border-bottom: 0;
            z-index: 2;
            font-weight: bold;
          }
        }
      }
    }
    .new-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      li {
        display: flex;
        align-items: center;
        .bottom-img-wrap {
          position: relative;
          margin-right: 12px;
          p {
            width: fit-content;
            height: 24px;
            background-color: rgba(0,0,0,0.6);
            color: #fff;
            padding: 0px 12px;
            border-radius: 999px;
            font-size: 12px;
            line-height: 24px;
            position: absolute;
            left: 8px;
            top: 8px;
          }
          img {
            width: 200px;
            height: 140px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #efefef;
          }
        }
        .bottom-info {
          width: calc(100% - 212px);
          height: 140px;
          padding: 8px 0;
          display: flex;
          flex-direction: column;
          .bottom-title {
            color: #2f2f2f;
            font-weight: bold;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            margin-bottom: 4px;
          }
          .bottom-summary {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            text-overflow: ellipsis;
            color: #5f5f5f;
          }
          .bottom-date-wrap {
            display: flex;
            align-items: center;
            margin-top: auto;
            .date {
              color: #afafaf;
            }
            .author {
              margin-left: 16px;
              color: #afafaf;
            }
          }
        }
      }
    }
  }
</style>