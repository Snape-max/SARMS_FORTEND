<template>
      <div v-if="imageDetail">
          <el-image
            style="width: 256px; height: 256px"
            :src="imageDetail.img_url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[imageDetail.img_url]"
            :initial-index="4"
            @load="onImageLoad"
            fit="cover"
          />
          <el-image
            v-if="getSrcList().length > 1"
            style="width: 256px; height: 256px"
            :src="imageDetail.labeled_img_url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[imageDetail.labeled_img_url]"
            :initial-index="4"
            fit="cover"
          />
          <el-divider />
          <div class="info-container" v-if="imageDetail">
            <el-descriptions
              direction="vertical"
              :column="4"
              :size="large"
              border
            >
              <el-descriptions-item label="文件名">{{ imageDetail.img_name }}</el-descriptions-item>
              <el-descriptions-item label="上传时间" :span="2">{{ formatDateTime(imageDetail.img_date) }}</el-descriptions-item>
              <el-descriptions-item label="图片尺寸"  v-if="imageSize">{{ imageSize.width }} x {{ imageSize.height }} px</el-descriptions-item>
              <el-descriptions-item label="标签" :span="2">
                <el-tag
                    v-for="item in imageDetail.tags"
                    :color=color[item]
                    effect="dark">
                    {{ item }} * {{ tags[item] }}
                  </el-tag>
                <el-tag
                  v-if="isLabel === false"
                  color="black"
                  effect="dark">
                  暂无
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="上传者">
                {{imageDetail.author}}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <el-divider />
          <div v-if="imageDetail">
            <el-button type="primary" @click="renameImage()">重命名</el-button>
            <el-button type="danger" @click="deleteImage()">删除</el-button>
          </div>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
  </template>
  
  <script>
  import config from '../config';
  import api from '@/api';
  import { ElMessage, ElMessageBox } from 'element-plus';
  
  export default {
    name: 'ImageView',
    data() {
      return {
        imageDetail: null,
        token: sessionStorage.getItem('token'),
        imageSize: null, // 新增用于存储图片尺寸的数据属性
        color: config.CATEGORIES_COLOR,
        tags: null,
        isLabel: true,
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
          const response = await api.query(filters, this.token);
          if (response.data[0].labeled_image_url == null){
            this.isLabel = false;
          }
          this.tags = response.data[0].tags;
          this.imageDetail = {
            id: response.data[0].id,
            img_url: `${config.apiUrl}/${response.data[0].img_url}`,
            img_name: response.data[0].img_name,
            img_date: response.data[0].img_date,
            labeled_img_url: `${config.apiUrl}/${response.data[0].labeled_image_url}`,
            author: response.data[0].author,
            tags: Object.keys(response.data[0].tags) 
          };
          console.log(this.imageDetail.tags);
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
      getSrcList() {
        let ret = [this.imageDetail.img_url,
          this.imageDetail.labeled_img_url
        ];
        if (this.imageDetail.labeled_img_url === `${config.apiUrl}/null`)
          ret =  [this.imageDetail.img_url]
        return ret
      },
      renameImage() {
        ElMessageBox.prompt('请输入新的图片名称', '重命名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\s\.]+$/,
          inputErrorMessage: '图片名称不能包含特殊字符'
        })
        .then(({ value }) => {
          if (value) {
            const filters = {
              id: this.imageDetail.id,
              rename: value
            };

            api.modeify(filters, this.token)
            .then(response => {
              ElMessage.success('图片重命名成功');
              this.loadImageDetail();
            })
            .catch(error => {
              console.error('Error renaming image:', error);
              ElMessage.error('图片重命名失败');
            });
          }
        })
        .catch(() => {
          ElMessage.info('重命名取消');
        });
    },
    deleteImage() {
      ElMessageBox.confirm('确定要删除选中的图片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
          const filters = {
            id: this.imageDetail.id,
            delete: 'true'
          };

          api.modeify(filters, this.token)
          .then(response => {
            ElMessage.success('图片删除成功');
            this.goBack()
          })
          .catch(error => {
            console.error('Error deleting image:', error);
            ElMessage.error('图片删除失败');
          });
          })
      .catch(() => {
        ElMessage.info('删除取消');
      });
    },
    }
  };
  </script>

  <style scoped>
  .el-image{
    margin: 10px;
    margin-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
  }

  .info-container { 
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.info {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 子元素左对齐 */
    text-align: left; /* 文本左对齐 */
    max-width: 500px; 
    margin: 10px;
}

  </style>