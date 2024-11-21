<template>
    <div class="auth-container">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>系统{{ isLogin ? '登录' : '注册' }}</span>
          </div>
        </template>
        <el-form :model="authForm" :rules="rules" ref="authFormRef" label-position="right">
          <el-form-item v-if="!isLogin" label="用户名" prop="username">
            <el-input v-model="authForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="authForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="authForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item v-if="!isLogin" label="确认密码" prop="confirmPassword">
            <el-input v-model="authForm.confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" class="auth-btn">{{ isLogin ? '登录' : '注册' }}</el-button>
          </el-form-item>
        </el-form>
        <div class="toggle-link">
          <el-text class="mx-1">{{ isLogin ? '没有账号？请' : '已有账号？请' }}</el-text>
          <el-link type="primary" @click="toggleForm">{{ isLogin ? '注册' : '登录' }}</el-link>
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
    name: 'AuthView',
    setup() {
      const store = useStore();
      const router = useRouter();
      const authFormRef = ref(null);
      const isLogin = ref(true);
  
      const authForm = ref({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      const validateConfirmPassword = (rule, value, callback) => {
        if (value !== authForm.value.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      };
  
      const rules = ref({
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度应在6到20个字符之间', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      });
  

  
      const handleSubmit = () => {
        authFormRef.value.validate(async (valid) => {
          if (valid) {
            try {
              let msg;
              if (isLogin.value) {
                msg = await store.dispatch('login', { email: authForm.value.email, password: authForm.value.password });
                
                if (msg) {
                  console.log(msg);
                  ElMessage.error(msg);
                } else {
                  router.push({ name: 'home' });
                  ElMessage.success('登录成功');
                }
              } else {
                msg = await store.dispatch('register', {username:authForm.value.username, email: authForm.value.email, password: authForm.value.password });
                if (msg) {
                  ElMessage.error(msg);
                } else {
                  ElMessage.success('注册成功');
                  isLogin.value = true; // 注册成功后切换到登录表单
                }
              }
            } catch (error) {
              ElMessage.error("登录失败");
            }
          } else {
            ElMessage.error('请填写所有字段');
            return false;
          }
        });
      };
  
      const toggleForm = () => {
        isLogin.value = !isLogin.value;
        authForm.value = {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
      };
  
      return {
        authForm,
        rules,
        authFormRef,
        isLogin,
        handleSubmit,
        toggleForm
      };
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
    background-image: url('@/assets/background.jpg');
    background-size: cover; /* 使背景图像覆盖整个容器 */
    background-position: center; /* 使背景图像居中 */
    background-repeat: no-repeat;
  }

  .auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.398); /* 暗色遮罩，透明度为 0.5 */
  z-index: 1;
}
  
  .box-card {
    width: 400px;
    padding: 20px;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.442);
  }
  
  .card-header {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  .auth-btn{
    width: 100%;
  }
  
  .toggle-link {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px; /* 调整与表单的距离 */
    font-size: 14px;
  }

  
  
  .toggle-link .el-text, .toggle-link .el-link {
    margin-left: 5px;
  }
  </style>