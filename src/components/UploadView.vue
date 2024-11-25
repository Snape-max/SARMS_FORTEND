<template>
  <div class="upload">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1>图片上传</h1>
    <el-upload
      class="upload-demo"
      drag
      action="http://127.0.0.1:5000/upload"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
    </el-upload>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  name: 'UploadView',
  data() {
    return {
      headers: {
        'x-access-token': sessionStorage.getItem('token') // 从本地存储中获取Token
      }
    };
  },
  methods: {
    beforeUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJPGorPNG) {
        ElMessage.error('只能上传jpg/png文件!');
      }

      return isJPGorPNG;
    },
    handleSuccess(response, file, fileList) {
      ElMessage.success('文件上传成功！');
      console.log('Response:', response);
    },
    handleError(err, file, fileList) {
      ElMessage.error('文件上传失败！');
      console.error('Error:', err);
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 30px;
}

.upload {
  height: 80%;
  width: 60%;
  left: 0;
  right: 0;
  top: 50%;
  bottom: 0;
  margin: auto;
  padding: 20px;
}
</style>