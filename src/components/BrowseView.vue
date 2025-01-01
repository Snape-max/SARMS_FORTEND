<template>
  <div class="browse">
    <el-row :gutter="20" style="padding-bottom: 10px;">
      <el-col :span="4" v-for="(image, index) in paginatedImages" :key="index" style="padding-bottom: 10px;">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="image.img_url" class="image" :id="image.id" @click="viewImageDetail(image)"/>
          <div 
            @click="toggleImageSelection(image)" 
            :class="{ 'selected': isImageSelected(image) }" 
            style="padding: 14px; font-size: 14px; cursor: pointer;"
          >
            <span>{{ image.img_name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <div v-if="images.length == 0">
      <el-result
        title="Data Loading"
        sub-title="Please wait for a moment"
      >
        <template #icon>
          <el-icon class="large-icon"><Loading /></el-icon>
        </template>
      </el-result>
    </div>

    <!-- 分页控件 -->
    <div class="pagination-container">
      <el-pagination
        v-if="images.length > 0"
        background
        layout="prev, pager, next"
        :total="images.length"
        :page-size="pageSize"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>

    <!-- 浮动按钮 -->
    <div class="floating-action-button">
      <el-popover
        placement="top"
        width="180"
        trigger="hover"
        @show="onShow"
        @hide="onHide"
      >
        <template #reference>
          <el-button type="primary" color="#56799c" size="large" circle><el-icon><Setting /></el-icon></el-button>
        </template>
        <div class="options">
          <el-button type="danger" size="large" @click="deleteSelectedImages()" circle><el-icon><Delete /></el-icon></el-button>
          <el-button type="warning" size="large" @click="renameImage()" circle><el-icon><Edit /></el-icon></el-button>
          <el-button type="success" size="large" @click="scrollToTop()" circle><el-icon><Top /></el-icon></el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox, ElIcon } from 'element-plus';
import { Loading, Setting, Delete, Edit, Top } from '@element-plus/icons-vue';
import config from '../config';
import api from '@/api';

export default {
  name: 'BrowseView',
  components: {
    ElIcon,
    Loading,
    Setting,
    Delete,
    Edit,
    Top
  },
  data() {
    return {
      images: [],
      selectedImages: [],
      token: sessionStorage.getItem('token'),
      showOptions: false,
      currentPage: 1,
      pageSize: 24
    };
  },
  created() {
    this.fetchImages();
  },
  computed: {
    paginatedImages() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.images.slice(start, end);
    }
  },
  watch: {
    '$route.query': {
      handler: 'fetchImages',
      immediate: true
    }
  },
  methods: {
    async fetchImages() {
      let filters = {};
      if (this.$route.query) {
        filters = this.$route.query;
      }
      try {
        const response = await api.query(filters, this.token);
        this.images = response.data.map(image => ({
          id: image.id,
          img_url: `${config.apiUrl}/${image.img_url}`,
          img_name: image.img_name,
          img_date: image.img_date
        }));
      } catch (error) {
        console.error('Error fetching images:', error);
        this.images = [{
          id: 'default',
          img_url: require('@/assets/logo.png'),
          img_name: 'Error Loading Images'
        }];
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    toggleImageSelection(image) {
      if (this.isImageSelected(image)) {
        this.selectedImages = this.selectedImages.filter(selectedImage => selectedImage.id !== image.id);
      } else {
        this.selectedImages.push(image);
      }
    },
    isImageSelected(image) {
      return this.selectedImages.some(selectedImage => selectedImage.id === image.id);
    },
    deleteSelectedImages() {
      if (this.selectedImages.length === 0) {
        ElMessage.warning('请选择要删除的图片');
        return;
      }

      ElMessageBox.confirm('确定要删除选中的图片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        this.selectedImages.forEach(image => {
          this.deleteImage(image);
        });
        this.selectedImages = [];
      })
      .catch(() => {
        ElMessage.info('删除取消');
        this.selectedImages = [];
      });
    },
    renameImage() {
      if (this.selectedImages.length === 0) {
        ElMessage.warning('请选择要重命名的图片');
        return;
      }

      if (this.selectedImages.length > 1) {
        ElMessage.warning('只能选择一张图片进行重命名');
        this.selectedImages = [];
        return;
      }

      const image = this.selectedImages[0];
      ElMessageBox.prompt('请输入新的图片名称', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\s\.]+$/,
        inputErrorMessage: '图片名称不能包含特殊字符'
      })
      .then(({ value }) => {
        if (value) {
          this.renameImageOnServer(image, value);
        }
      })
      .catch(() => {
        ElMessage.info('重命名取消');
        this.selectedImages = [];
      });
    },
    renameImageOnServer(image, newName) {
      const filters = {
        id: image.id,
        rename: newName
      };

      api.modeify(filters, this.token)
      .then(response => {
        ElMessage.success('图片重命名成功');
        this.fetchImages();
        this.selectedImages = [];
      })
      .catch(error => {
        console.error('Error renaming image:', error);
        ElMessage.error('图片重命名失败');
      });
    },
    deleteImage(image) {
      const filters = {
        id: image.id,
        delete: 'true'
      };

      api.modeify(filters, this.token)
      .then(response => {
        ElMessage.success('图片删除成功');
        this.fetchImages();
      })
      .catch(error => {
        console.error('Error deleting image:', error);
        ElMessage.error('图片删除失败');
      });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onShow() {
      this.showOptions = true;
    },
    onHide() {
      this.showOptions = false;
    },
    viewImageDetail(image) {
      this.$router.push({ name: 'image', params: { id: image.id } });
    }
  }
};
</script>

<style scoped>
.browse {
  padding: 20px;
}

.image {
  width: 100%;
  display: block;
}

.floating-action-button {
  position: fixed;
  bottom: 100px;
  right: 120px;
}

.options {
  display: flex;
  justify-content: space-between;
}

/* 选中状态的样式 */
.selected {
  background-color: rgba(85, 99, 205, 0.455); /* 背景颜色稍微变暗 */
  border: 1px solid #3f51b5; /* 添加边框 */
}

/* 自定义图标大小 */
.large-icon {
  font-size: 48px; /* 调整图标大小 */
}

/* 分页控件居中 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>