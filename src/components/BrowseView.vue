<template>
    <div class="browse">
      <el-row :gutter="20" style="padding-bottom: 10px;">
        <el-col :span="4" v-for="(image, index) in images" :key="index" style="padding-bottom: 10px;">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="image.url" class="image" />
            <div style="padding: 14px;">  
              <span>{{ image.name }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ image.date }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BrowseView',
    data() {
      return {
        images: [
          { url: 'https://via.placeholder.com/150', name: 'Image 1', date: '2021-01-01' },
          { url: 'https://via.placeholder.com/150', name: 'Image 2', date: '2021-01-02' },
          { url: 'https://via.placeholder.com/150', name: 'Image 3', date: '2021-01-03' },
          { url: 'https://via.placeholder.com/150', name: 'Image 1', date: '2021-01-01' },
          { url: 'https://via.placeholder.com/150', name: 'Image 2', date: '2021-01-02' },
          { url: 'https://via.placeholder.com/150', name: 'Image 3', date: '2021-01-03' },
          { url: 'https://via.placeholder.com/150', name: 'Image 1', date: '2021-01-01' },
          { url: 'https://via.placeholder.com/150', name: 'Image 2', date: '2021-01-02' },
          { url: 'https://via.placeholder.com/150', name: 'Image 3', date: '2021-01-03' },
          { url: 'https://via.placeholder.com/150', name: 'Image 1', date: '2021-01-01' },
          { url: 'https://via.placeholder.com/150', name: 'Image 2', date: '2021-01-02' },
          { url: 'https://via.placeholder.com/150', name: 'Image 3', date: '2021-01-03' },
          { url: 'https://via.placeholder.com/150', name: 'Image 1', date: '2021-01-01' },
          { url: 'https://via.placeholder.com/150', name: 'Image 2', date: '2021-01-02' },
          { url: 'https://via.placeholder.com/150', name: 'Image 3', date: '2021-01-03' },
          { url: 'https://via.placeholder.com/150', name: 'Image 1', date: '2021-01-01' },
          { url: 'https://via.placeholder.com/150', name: 'Image 2', date: '2021-01-02' },
          { url: 'https://via.placeholder.com/150', name: 'Image 3', date: '2021-01-03' },
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .browse {
    padding: 20px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  </style>