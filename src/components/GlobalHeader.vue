<template>

<div id="global-header">
    <a-row :wrap="false">
    <a-col flex="200px"><div class="title-bar"><div class="title" style="color: pink; font-weight: bold;font-size: 40px;">YoliYoli</div></div></a-col>
    <a-col flex="auto"> <div class="menu"><a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="doMenuClick" /></div></a-col>
    <a-col flex="200px"><div class="login-button" style="margin-top: 6px;"><a-button type="text" @click="dialogFormVisible = true">登陆</a-button></div></a-col>
  </a-row>
</div>
<div id="login-page">

  <el-dialog v-model="dialogFormVisible"  width="750" :style="{ height: dialogHeight }">
    <el-row
        :gutter="0"
        justify="center"
      >
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />
        <el-text class="qrcode" size="large" :style="{color:normalColor}">扫描二维码登录</el-text>
        <vue-qrcode :value="qrCodeValue" :width="qrCodeSize"></vue-qrcode>
      </el-col>
      <el-col :span="12" >
        <div class="he">
          <el-text class="pwd" size="large" @click="pwdChange" :style="{color:pwdColor}">密码登录</el-text>
          <el-text size="large">|</el-text>
          <el-text class="phone" size="large" @click="phoneChange" :style="{color:phoneColor}">短信登录</el-text>
        </div>
          
        
        <el-form :model="form" v-if="pwdNum === 1" :hide-required-asterisk="true">
          <el-form-item label="账号" :label-width="formLabelWidth" status-icon  prop="account" :rules="[{required:true,message:'账号不能为空'}]">
            <el-input style="margin-bottom: 5px;margin-top: 5px ;" v-model="form.account" autocomplete="off" placeholder="请输入账号"/>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth"  prop="password" :rules="[{required:true,message:'密码不能为空'}]">
            <el-input style="margin-bottom: 5px;" v-model="form.password" autocomplete="off" show-password type="password" placeholder="请输入密码" />
          </el-form-item>
          <div class="form-button">
            <el-button @click="phoneChange">注册</el-button>
            <el-button type="primary" @click="doLogin">登录</el-button>
          </div>
        </el-form>

        <el-form :model="form" v-if="phoneNum === 1" :hide-required-asterisk="true" status-icon>
          <el-form-item label="+86" :label-width="formLabelWidth" :hide-required-asterisk="false" :rules="[
            { required: true, message: '手机号不能为空' },
            { type: 'number', message: '手机号格式有误' },
          ]" prop="phoneNumber">
            <el-input v-model.number="form.phoneNumber" autocomplete="off" placeholder="请输入手机号"/>
          </el-form-item>
          <el-form-item label="验证码" :label-width="formLabelWidth" :rules="[{required:true,message:'验证码不能为空'}]" prop="code">
            <el-input v-model="form.code" autocomplete="off" show-password type="password" placeholder="请输入验证码" />
          </el-form-item>
          <div class="form-button">
            <el-button type="primary" @click="doLogin">登录/注册</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <div class="image-left-bottom">
        <el-image
          src="/src/assets/image/nailong1.jpg"
          alt="dragon"
          fit="contain"
          style="width: 150px; height: 150px"
        />
      </div>

      <div class="image-right-bottom">
        <el-image
          src="/src/assets/image/nailong2.jpg"
          alt="dragon"
          fit="contain"
          style="width: 150px; height: 150px"
        />
      </div>
  </el-dialog>
</div>

  </template>

  <script lang="ts" setup>
  import { h, ref } from 'vue';
  import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { MenuProps, message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  const current = ref<string[]>(['mail']);

  const router = useRouter();

  const doLogin = () => {
    if (!form.value.account || !form.value.password ) {
      message.error('账号或密码不能为空');
      return;
    }
    else if (form.value.phoneNumber === null || isNaN(form.value.phoneNumber)) {
      message.error('账号必须为数字');
      return;
    }
    message.success('登录成功');
    /**
     * todo: 登录逻辑
     */
    dialogFormVisible.value = false;
  };

  const doMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };
  router.afterEach((to,from,failure)=>{
    current.value = [to.path];
  })
  const items = ref<MenuProps['items']>([
    {
      key: '/',
      icon: () => h(MailOutlined),
      label: '首页',
      title: '首页',
    },
    {
      key: 'app',
      icon: () => h(AppstoreOutlined),
      label: '番剧',
      title: '番剧',
    },
    {
      key: 'sub1',
      icon: () => h(SettingOutlined),
      label: '电影',
      title: '电影',
    //   children: [
    //     {
    //       type: 'group',
    //       label: 'Item 1',
    //       children: [
    //         {
    //           label: 'Option 1',
    //           key: 'setting:1',
    //         },
    //         {
    //           label: 'Option 2',
    //           key: 'setting:2',
    //         },
    //       ],
    //     },
    //     {
    //       type: 'group',
    //       label: 'Item 2',
    //       children: [
    //         {
    //           label: 'Option 3',
    //           key: 'setting:3',
    //         },
    //         {
    //           label: 'Option 4',
    //           key: 'setting:4',
    //         },
    //       ],
    //     },
    //   ],
    },
    {
        key: 'alipay',
        icon: () => h(SettingOutlined),
        label: '动态',
        title: '动态',
    },
  ]);
  const dialogFormVisible = ref(false)
  const dialogHeight = ref("400px")
  const formLabelWidth = '100px'
  const pwdNum = ref(1)
  const phoneNum = ref(0)
  const pwdColor = ref("#409EFF")
  const phoneColor = ref("#000000")
  const qrCodeValue = ref("https://example.com")
  const qrCodeSize = ref(200)
  const normalColor = ref("#303133");

  const form = ref({
  phoneNumber:null,  
  account: '',
  password:'',
  code:'',
})

const pwdChange = () => {
      pwdNum.value = 1;
      phoneNum.value = 0;
      pwdColor.value = "#409EFF"
      phoneColor.value = "#000000"
    }


    const phoneChange = () => {
      pwdNum.value = 0;
      phoneNum.value = 1;
      pwdColor.value = "#000000"
      phoneColor.value = "#409EFF"
    }






  </script>
  
  <style scoped>
  .title-bar {
  display: flex;
  align-items: center;
}
.title {
  margin-left: 16px;
  font-size: 16px;
}
.menu {
  margin-left: 18px;
  width: 1000px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  min-height: 10px;
}
.qrcode {
  text-align: center;
  margin-left: 38px;
  font-weight: 500;
  font-size: 18px;
}
.he{
  text-align: center;
  margin: 20px 0 20px 50px;
  font-weight: 500;
  }
.pwd{
  margin-right: 15px;
  user-select: none;  
  cursor: pointer;
}
.phone{
  margin-left: 15px;
  user-select: none;  
  cursor: pointer;    
}
.form-button{
  text-align: center;
  margin-left: 60px;
}
.phone-form{
  display: none;
}
.image-left-bottom,
.image-right-bottom {
  position: absolute;
  bottom: 0px;
}

.image-left-bottom {
  left: -25px;
}

.image-right-bottom {
  right: -25px;
}
  </style>
  