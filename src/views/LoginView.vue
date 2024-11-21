<template>
    <div class="login-container">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>遥感数据信息管理系统</span>
          </div>
        </template>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-position="left">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <div class="login-btn-container">
            <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
          </div>
        </el-form>
        
        <div class="register-link">
        <el-text class="mx-1">没有账号？请</el-text><el-link href="/register" type="primary" >注册</el-link>
      </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  
  export default {
    name: 'LoginView',
    setup() {
      const store = useStore();
      const router = useRouter();
      const loginFormRef = ref(null);
  
      const loginForm = ref({
        email: '',
        password: ''
      });
  
      const rules = ref({
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      });
  
      const handleLogin = () => {
        loginFormRef.value.validate(async (valid) => {
          if (valid) {
            try {
              await store.dispatch('login', loginForm.value);
              router.push({ name: 'home' });
              ElMessage.success('Login successful');
            } catch (error) {
              ElMessage.error('Login failed');
            }
          } else {
            ElMessage.error('请填写所有内容');
            return false;
          }
        });
      };
  
      return {
        loginForm,
        rules,
        loginFormRef,
        handleLogin
      };
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  
  .box-card {
    width: 400px;
    padding: 10px;
  }
  
  .card-header {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  .login-btn-container{
    display: flex;
    justify-content: center;
  }
  .login-btn{
    width: 80%;
  }

  .register-link {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px; /* 调整与表单的距离 */
  font-size: 10px;
}

.register-link .el-text, .register-link .el-link {
  margin-left: 5px; /* 调整文本和链接之间的间距 */
}
  </style>