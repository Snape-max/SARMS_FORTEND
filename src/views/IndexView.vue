<template>
  <div id="app">
    <!-- 导航栏 -->
    <el-header class="header">
      <el-row type="flex" justify="space-between" align="middle">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" />
          <span><strong>遥感图像信息管理系统</strong></span>
        </div>
        <el-menu mode="horizontal" :router="true">
          <el-menu-item index="/home/dashboard">进入控制台</el-menu-item>
          <el-menu-item index="/auth">登录注册</el-menu-item>
        </el-menu>
      </el-row>
    </el-header>

    <!-- 特色展示区 -->
    <section class="hero">
      <div class="hero-content">
        <h1>SAR Management System</h1>
        <p>基于 Vue 3 + Flask，面向研究所和高校的遥感图像管理系统</p>
        
        <br>
        
        <el-button type="primary" size="large" @click="goToHome">Get Started</el-button>
      </div>
    </section>

    <!-- 组件演示区 -->
    <section class="features">
      <h2>Our Features</h2>
      <el-carousel :interval="4000" type="card" motion_blur="true" arrow="always">
        <el-carousel-item v-for="(feature, index) in features" :key="index">
          <el-card 
            shadow="hover" 
            :style="{
              height: '100%',
              backgroundImage: `url(${feature.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: feature.color
            }"
            class="feature-card"
          >
            <div class="content-overlay">
              <h3>{{ feature.title }}</h3>
              <ul class="feature-list">
                <li v-for="(point, idx) in feature.description" :key="idx">{{ point }}</li>
              </ul>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </section>
    <br>

    <!-- 合作伙伴展示区 -->
    <section class="partners">
      <h2>Our Partners</h2>
      <el-row :gutter="20" justify="center">
        <el-col :span="6" v-for="(partner, index) in partners" :key="index">
          <el-card shadow="hover" class="partner-card">
            <el-row type="flex" align="middle">
              <el-col :span="8">
                <img :src="partner.logo" alt="Partner Logo" class="partner-logo"/>
              </el-col>
              <el-col :span="16">
                <div style="padding: 0px;">
                  <h3>{{ partner.name }}</h3>
                  <p>{{ partner.description }}</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <br>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 Pengwei Wang&Wending Zhao. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
  
<script>
import { ElHeader, ElRow, ElMenu, ElMenuItem, ElButton, ElCard, ElCol } from 'element-plus';

export default {
  name: 'IndexView',
  components: {
    ElHeader,
    ElRow,
    ElMenu,
    ElMenuItem,
    ElButton,
    ElCard,
    ElCol
  },
  data() {
    return {
      features: [
        {
          title: '强大的数据统计功能',
          description: [
            '直观展示最近十天内用户上传图片的数量变化趋势，帮助管理员了解系统的活跃度。',
            '提供图像中各类目标的详细分布情况，便于评估系统在不同应用场景下的表现。',
            '清晰显示已标注和未标注图片的比例，便于追踪标注进度。'
          ],
          backgroundImage: require('@/assets/features/0.jpg')
        },
        {
          title: '高效便捷的图片管理',
          description: [
            '简化多张图片上传流程，提升工作效率。',
            '基于日期、图片名称和标签进行快速检索，确保用户能够轻松找到所需图片。',
            '提供重命名和删除功能，保持资料库的整洁有序。'
          ],
          backgroundImage: require('@/assets/features/1.jpg')
        },
        {
          title: '详细的图片浏览体验',
          description: [
            '一目了然地查看所有已上传图片，方便用户快速浏览。',
            '每张图片都附带详细的元数据，包括文件名、上传时间、尺寸、内部目标及其数量、上传人信息等，满足深度分析需求。'
          ],
          backgroundImage: require('@/assets/features/2.jpg')
        },
        {
          title: '安全可靠的数据保护',
          description: [
            '采用Token机制确保每次请求的安全性，防止未授权访问。',
            '利用Flask构建稳定可靠的后端服务，结合Vue.js与Element Plus打造响应迅速、用户体验友好的前端界面。',
            '通过合理的项目结构设计和文档指导，使得部署过程变得简单快捷。'
          ],
          backgroundImage: require('@/assets/features/0.jpg')
        },
        {
          title: '易于使用且高度定制化',
          description: [
            '遵循Material Design原则设计的UI/UX，确保系统不仅美观而且易于上手。',
            '无论是界面布局还是功能模块，都可以根据实际业务需求进行调整，以适应不同的工作流和应用场景。'
          ],
          backgroundImage: require('@/assets/features/1.jpg')
        }
      ],
      partners: [
        {
          name: '国防科技大学',
          description: 'National University of Defense Technology.',
          logo: require('@/assets/partners/nudt.png')
        },
        {
          name: '信息支援部队',
          description: 'Information Support Troops.',
          logo: require('@/assets/partners/81.png')
        },
      ]
    };
  },
  methods: {
    goToHome() {
      this.$router.push({ path: '/home/dashboard' });
    }
  }
};
</script>
  
<style scoped>
    .header {
    padding: 0 20px;
    background-color: #fff;
    }

    .logo {
    display: flex;
    align-items: center;
    }

    .logo img {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    }

    .hero {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    padding: 50px 20px;
    height: 400px;
    background-image: url('@/assets/features/back.png');
    background-size: cover;
    background-position: center;
    color: #303133;
    }

    .hero-content {
      max-width: 800px;
    }

    .hero h1 {
    font-size: 48px;
    }

    .features {
      padding: 50px 50px;
      background: #f9fafb;
    }

    .features h2 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 2rem;
      color: #303133;
    }

    .features h3 {
      margin-top: 40px;
    }

    .el-carousel__item {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19);
      transition: transform 0.3s ease-in-out;
      padding: auto;
      margin-bottom: 10px;
    }

    .el-carousel__item:hover {
      transform: scale(1.05);
    }

    .feature-list {
      list-style-type: none;
      padding-left: 20px;
      margin-top: 10px;
    }

    .feature-list li {
      margin-top: 15px;
      font-size: 1rem;
      color: #606266;
    }

    /* 调整轮播图箭头样式 */
    .el-carousel__arrow--left,
    .el-carousel__arrow--right {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .el-carousel__indicator {
      padding: 8px;
    }

    .el-carousel__button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #c0c4cc;
    }

    .el-carousel__indicator.is-active .el-carousel__button {
      background-color: #409eff;
    }
    
    .footer {
    text-align: center;
    background: #ffffff;
    color: #000000;
    padding: 20px 0;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .footer-logo {
      width: 100px;  /* 调整SVG大小 */
      height: auto;
      margin-bottom: 10px;
    }

    .feature-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      padding-top: 20px;
    }

    .content-overlay {
      padding: 20px;
      background-color: transparent;
      position: relative;
      top: -30px;
    }

    .feature-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .feature-list li {
      margin: 10px 0;
      color: #606266;
    }

    /* 调整走马灯卡片大小 */
    :deep(.el-carousel__item) {
      height: 400px !important;
    }

    .partners {
      padding:30px 30px;
      background: #f0f0f0;
    }

    .partners h2 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 2rem;
      color: #303133;
    }

    .partner-card {
      background-color: #ffffff; /* 设置背景颜色为白色 */
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease-in-out;
      width: 100%;
      height: 150px; /* 设置固定高度 */
    }

    .partner-card:hover {
      transform: scale(1.05);
    }

    .partner-logo {
      width: 80px; /* 设置图片宽度 */
      height: auto;
      display: block;
      margin: 0 auto;
    }

    .partners {
      padding: 50px 20px; /* 根据实际情况调整padding */
      background: #f9fafb;
      text-align: center;
    }

    .partners h2 {
      margin-bottom: 30px;
      font-size: 2rem;
      color: #303133;
    }

    .partner-row {
      justify-content: center; /* 使合作伙伴logo居中显示 */
    }

    .partner-logo {
      max-width: 100%;
      height: auto;
      transition: transform 0.3s ease-in-out;
    }

    .partner-logo:hover {
      transform: scale(1.05);
    }
</style>