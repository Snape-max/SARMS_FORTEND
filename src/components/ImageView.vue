<template>
    <div class="image-view-container">
      <div v-if="imageDetail" class="image-detail-wrapper">
        <div class="image-and-info">
          <img :src="imageDetail.img_url" :alt="imageDetail.img_name" class="image-detail" @load="onImageLoad" height="512px"/>
          <div class="info">
            <p><strong>文件名:</strong> {{ imageDetail.img_name }}</p>
            <p><strong>上传时间:</strong> {{ formatDateTime(imageDetail.img_date) }}</p>
            <p v-if="imageSize"><strong>图片尺寸:</strong> {{ imageSize.width }} x {{ imageSize.height }} px</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import config from '../config';
  
  export default {
    name: 'ImageView',
    data() {
      return {
        imageDetail: null,
        token: sessionStorage.getItem('token'),
        imageSize: null, // 新增用于存储图片尺寸的数据属性
      };
    },
    created() {
      this.loadImageDetail();
    },
    methods: {
      async loadImageDetail() {
        const imageId = this.$route.params.id;
        try {
          const filters = { id: imageId };
  
          const response = await axios.post(`${config.apiUrl}/query`, null, {
            params: filters,
            headers: { 'x-access-token': this.token }
          });
  
          this.imageDetail = {
            id: response.data[0].id,
            img_url: `${config.apiUrl}/${response.data[0].img_url}`,
            img_name: response.data[0].img_name,
            img_date: response.data[0].img_date
          };
        } catch (error) {
          console.error('Error loading image detail:', error);
        }
      },
      onImageLoad(event) {
        const img = event.target;
        this.imageSize = { width: img.naturalWidth, height: img.naturalHeight };
      },
      goBack() {
        this.$router.push({ name: 'browse' });
      },
      formatDateTime(dateTime) {
        if (!dateTime) return '';

        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    }
  };
  </script>
  
  <style scoped>
  .image-view-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  .image-detail-wrapper {
    display: flex;
    align-items: flex-start; /* 将内容顶部对齐 */
  }
  
  .image-and-info {
    display: flex;
    gap: 50px; /* 图片与信息之间的间距 */
  }
  
  .image-detail {
    max-width: 400px; /* 固定宽度 */
    max-height: 400px; /* 固定高度 */
    object-fit: contain; /* 或者使用cover根据需求 */
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .info {
    text-align: left; /* 左对齐文本 */
    line-height: 1.5; /* 增加行高以便于阅读 */
  }
  </style>