<template>
  <div class="home">
    <el-container style="height: 100vh;">
      <el-container>
        <el-aside :width="isCollapsed ? '60px' : '150px'" class="sidebar" close-on-click-outside="true">
          <el-menu :collapse="isCollapsed" :router="true" default-active="upload" class="menu">
            <el-menu-item @click="goToIndex">
              <img :src="logo" alt="Logo" class="logo" />
              <h1 v-if="!isCollapsed" class="title">SARMS</h1>
            </el-menu-item>
            <el-divider style="margin: 0; border-color: #222c30; transition: 0s;" />
            <el-menu-item index="/home/dashboard">
              <el-icon><DataBoard /></el-icon>
              <span slot="title">数据统计</span>
            </el-menu-item>
            <el-menu-item index="/home/upload">
              <el-icon><UploadFilled /></el-icon>
              <span slot="title">图片上传</span>
            </el-menu-item>
            <el-menu-item index="/home/browse">
              <el-icon><PictureFilled /></el-icon>
              <span slot="title">图片浏览</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="el-main">
          <div class="header">
            <el-button @click="toggleSidebar" style="margin-right: 10px;" circle>
              <svg data-v-49e15297="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="hamburger"><path data-v-49e15297="" d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
            </el-button>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item to="/home/dashboard">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path" :to="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button size="large" @click="searchDialogVisible = true" style="margin-right: 20px;right: 0;position: absolute;" circle>
              <el-icon><Search /></el-icon>
            </el-button>
          </div>
            <el-dialog v-model="searchDialogVisible" title="图片检索" width="800">
              <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="开始日期">
                  <el-date-picker
                    v-model="searchForm.startDate"
                    type="datetime"
                    placeholder="选择开始日期时间"
                  />
                </el-form-item>
                <el-form-item label="结束日期">
                  <el-date-picker
                    v-model="searchForm.endDate"
                    type="datetime"
                    placeholder="选择结束日期时间"
                  />
                </el-form-item>
                <el-form-item label="文件名">
                  <el-input v-model="searchForm.fileName" placeholder="请输入文件名" />
                </el-form-item>
                <el-form-item label="标签">
                  <el-select v-model="searchForm.tags" multiple placeholder="请选择标签" style="width: 200px;">
                    <el-option
                      v-for="tag in availableTags"
                      :key="tag.value"
                      :label="tag.label"
                      :value="tag.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="cancelSearch">取 消</el-button>
                  <el-button type="primary" @click="performSearch">检 索</el-button>
                </span>
              </template>
            </el-dialog>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      isCollapsed: false, // 控制侧边栏的折叠状态
      logo: require('@/assets/logo.png'),
      searchDialogVisible: false,
      searchDialogVisible: false,
      searchForm: {
        startDate: '',
        endDate: '',
        fileName: '',
        tags: []
      },
      availableTags: [
        { value: 'ship', label: 'ship' },
        { value: 'aircraft', label: 'aircraft' },
        { value: 'car', label: 'car' },
        { value: 'tank', label: 'tank' },
        { value: 'bridge', label: 'bridge' },
        { value: 'harbor', label: 'harbor' },
      ]
    };
  },
  computed: {
    breadcrumbItems() {
      const matched = this.$route.matched.filter(record => record.meta && record.meta.title);
      if (this.$route.name === 'image'){
        return [{ path: '/home/browse', name: '图片浏览' }, { path: `/home/browse/${this.$route.params.id}`, name: '详细信息' }];
      }
      return matched.map(record => ({
        path: record.path,
        name: record.meta.title
      }));
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    performSearch() {
      // 执行检索逻辑
      const query = {
        start_date: this.searchForm.startDate ? this.searchForm.startDate.toISOString().slice(0, -1):'',
        end_date: this.searchForm.endDate ? this.searchForm.endDate.toISOString().slice(0, -1) : '',
        name: this.searchForm.fileName,
        tags: this.searchForm.tags.join(',')
      };
      this.$router.push({ name: 'browse', query : query})
      this.searchDialogVisible = false;
    },
    cancelSearch() {
      // 清空表单并关闭对话框
      this.searchForm = {
        startDate: '',
        endDate: '',
        fileName: '',
        tags: []
      };
      this.searchDialogVisible = false;
    },
    goToIndex() {
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  margin: auto;
}

.sidebar {
  height: 100%;
  transition: width 0.3s ease;
  overflow-x: hidden;
  background-color: #2c3e50;
}

.logo {
  width: 20px;
  height: 20px;
}

.title {
  margin-left: 10px;
  font-size: 18px;
  color: #ecf0f1;
  transition: 0;
}

.menu {
  height: 100%;
  border-right: none;
}

.el-main {
  background-color: #f0f2f5;
  position: relative;
  padding: 0;
}

/* 使用深类选择器 */
.sidebar >>> .el-menu {
  background-color: #2c3e50;
  color: #f0f2f5;
}
.sidebar >>> .el-menu-item {
  background-color: #2c3e50;
  color: #f0f2f5;
}

/* 面包屑和按钮的布局 */
.header {
  position: sticky;
  top: 0;
  z-index: 1000; /* 确保头部始终在最上层 */
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* 面包屑样式 */
.el-breadcrumb {
  margin-left: 10px;
}
</style>