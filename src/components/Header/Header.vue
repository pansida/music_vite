<template>
  <div class="header_left">
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="">
    </div>
  </div>
  <div class="header_center">
    <div class="div_button">
      <i class="iconfont icon-arrow-left-bold" @click="handleLeft"></i>
      <i class="iconfont icon-arrow-right-bold" @click="handleRight"></i>
    </div>
    <div class="div_search">
      <SearchOutlined />
      <el-input v-model="input" placeholder="请输入内容" @focus="handleFocus" />
      <div class="model" v-if="openSearch" v-click-outside="handleOutSide">
        <template v-if="!input">
          <span class="hotHeader">热搜榜</span>
          <div v-for="(item, index) in searchList" :key="index">
            <div class="item_list" :class="[(index < 3 ? 'active' : ''), (item.content ? 'large' : 'mouse')]">
              <span>{{ index + 1 }}</span>
              <div class="item_right">
                <div :class="item.content ? 'serchWords' : 'serchWord'">{{ item.searchWord }}</div>
                <div class="content" v-if="item.content">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div class="header_right">
    <img :src="headerStore.isLogin ? Useravatarurl : avatarurl" alt="" width="40" height="40"
      style="border-radius: 50%;position: absolute;left:0;margin-right: 7px;cursor: pointer;z-index: 9999;" @click="hide">
    <a-popover v-model:open="visible" trigger="click" style="z-index: 99999;position: absolute;">
      <template #content>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1">
            <template #tab>
              <span :class="activeKey === '1' ? 'active' : ''">二维码登录</span>
            </template>
            <img :src="Imgbase64" alt="" width="180" height="180">
            <div class="Tips">
              提示：请使用网易云音乐app扫码登录
            </div>
            <a @click="SignInHandle">注册</a>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span :class="activeKey === '2' ? 'active' : ''">验证码登录</span>
            </template>
            <a-form ref="verificationRef" :model="verificationState" layout="inline">
              <a-form-item label="手机号" name="phoneNumber" :rules="rules.phoneNumber" style="margin-bottom: 10px;">
                <a-input v-model:value="verificationState.phoneNumber" />
              </a-form-item>
              <a-form-item label="密码" name="password" :rules="rules.password" style="margin-bottom: 10px;">
                <a-input-password v-model:value="verificationState.password" />
              </a-form-item>
              <a-form-item label="验证码" name="verification" style="display: flex;" :rules="rules.verification">
                <a-input v-model:value="verificationState.verification" style="width: 110px;" />
                <a-button :disabled="!isCountdown" style="margin-left: 10px;width: 110px;padding-left: 8px;"
                  @click="handleVerification">{{ isCountdown ? '获取验证码' : countdown + 's后重新获取' }}</a-button>
              </a-form-item>
              <div
                style="width: 100%;display: flex; justify-content: center;flex-direction: column; align-items: center;">
                <span style="margin-top: 10px;color: #939fb0;">提示：若登录失败，请使用二维码登录</span>
                <a-button class="phonelogin" @click="phoneloginHandle">登录</a-button>
              </div>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </template>
      <img :src="headerStore.isLogin ? Useravatarurl : avatarurl" alt="" width="40" height="40"
        style="border-radius: 50%;margin-right: 7px;cursor: pointer;">
    </a-popover>

    <div class="login">{{ headerStore.isLogin ? nickname : '点击头像登录' }}</div>
  </div>
  <Modal ref="modal" />
</template>
  
<script setup lang="ts">
import avatarurl from "@/assets/img/test.jpg"
import Modal from "./Modal/Modal.vue";
import { qr, captcha } from "@/request/Login/index"
import { userInfo } from "@/request/UserInfo/index"
import { musicInfo } from "@/request/Music/index"
import { SearchOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue";
import { ref, reactive, onMounted } from 'vue';
import { useHeaderStore } from "@/store/header"
import { useRouter } from "vue-router"
const searchList = ref<any>([])
const isopen = ref(false)
const openSearch = ref(false)
const input = ref("")
const nickname = ref("")
const Useravatarurl = ref('')
const router = useRouter()
const headerStore = useHeaderStore()
const activeKey = ref('1');
let Imgbase64 = ref('')
let key = ref('')
let timer = ref<any>(null)
const modal = ref<InstanceType<typeof Modal>>()
const verificationRef = ref()
let isCountdown = ref(true)
const visible = ref(false)
let countdown = ref(60)
const rules = reactive({
  phoneNumber: [
    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号格式不正确', trigger: "onsubmit" },
    { required: true, message: "请输入手机号", trigger: "onsubmit" }
  ],
  verification: [
    { required: true, message: "请输入验证码" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "onsubmit" },
    { pattern: /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{8,20}$/, message: "密码格式不正确", trigger: "onsubmit" }
  ]
})
interface verificationState {
  phoneNumber: string,
  password: string,
  verification: string
}
const verificationState = reactive<verificationState>({
  phoneNumber: '',
  password: "",
  verification: ''
})
const init = async () => {
  await getQrCodeKey();
  await getQrCode();
  await checkQrCode();
}
onMounted(async () => {
  const info = await userInfo.getAccountInfo(true)
  if (info.profile !== null) {
    Useravatarurl.value = info.profile.avatarUrl
    nickname.value = info.profile.nickname
  } else {
    headerStore.isLogin = false
    headerStore.id = ''
    init()
  }
  handleSerchList()
}
)

// 输入框聚焦触发
const handleFocus = async () => {
  openSearch.value = true
  isopen.value = true
}
// 
const handleOutSide = () => {
  if (isopen.value) {
    isopen.value = false
  } else {
    openSearch.value = false
  }

}

const handleSerchList = async () => {
  const res = await musicInfo.getSearchList()
  searchList.value = res.data
  console.log(searchList.value);
}

const getQrCodeKey = async () => {
  key.value = await qr.generateKey();
}
const getQrCode = async () => {
  Imgbase64.value = await qr.generateBaseUrl(key.value)
}
const checkQrCode = async () => {
  timer.value = setInterval(async () => {
    if (!timer.value || headerStore.isLogin) return
    const status = await qr.generateStatus(key.value)
    if (status === 800) {
      // 二维码过期
      clearInterval(timer.value)
      timer.value = null
      init()
    } else if (status === 803) {
      clearInterval(timer.value)
      timer.value = null
      const res = await userInfo.getAccountInfo(true)
      if (res.code === 200) {
        headerStore.id = res.profile.userId
        message.success("登录成功！")
        headerStore.isLogin = true
        Useravatarurl.value = res.profile.avatarUrl

      }
    }
  }, 2000)
}

const handleVerification = () => {
  verificationRef.value.validateFields(['phoneNumber']).then(async () => {
    if (!isCountdown.value) {
      return
    }
    isCountdown.value = false
    const timer1 = setInterval(() => {
      if (countdown.value === 0) {
        isCountdown.value = true
        clearInterval(timer1)
        countdown.value = 60
      }
      countdown.value--
    }, 1000)
    await captcha.sendCaptcha(verificationState.phoneNumber)
  })
    .catch((error: Error) => {
      console.log(error);
    })
}

const SignInHandle = () => {
  modal.value!.open = true
}

const phoneloginHandle = () => {
  verificationRef.value.validate().then(async () => {
    if (await captcha.verifyCaptcha(verificationState.phoneNumber, verificationState.verification)) {
      const res = await captcha.loginCaptcha(verificationState.phoneNumber, verificationState.password, verificationState.verification)
      console.log(res);
    }
    else {
      message.warning("验证码错误")
    }
  })
    .catch(() => {

    })
}

const handleLeft = () => {
  router.back()
}
const handleRight = () => {
  router.forward()
}
const hide = () => {
  // 暂时修改
  // const id = JSON.parse(localStorage.getItem("headerLogin") as any)
  // if (id?.id) {
  if (headerStore.id) {
    router.push(`/personal/${headerStore.id}`)
  } else {
    visible.value = !visible.value
  }
}

</script>
  
<style scoped lang="scss">
.header_center {
  display: flex;
  height: 30px;

  .div_button {
    margin-left: 5px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(235, 235, 235);

    i {
      border-radius: 50%;
      display: flex;
      height: 100%;
      align-items: center;
      width: 22px;
      height: 22px;
      background-color: #e13e3e;
      justify-content: center;
    }
  }

  .div_search {
    margin-left: 15px;
    width: 170px;
    background-color: #e13e3e;
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 10px;
    position: relative;

    .hotHeader {
      color: #828181;
      font-size: 16px;
      padding: 0 15px;
    }
  }
}

.header_right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 100px;
}

.logo {
  width: 150px;
  margin: 0 50px 0 10px;
  height: 40px;
  display: flex;
  align-items: center;

  img {
    width: 150px;
  }
}

.login {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 900;
}

.ant-tabs {
  width: 300px;

  :deep(.ant-tabs-nav-wrap) {
    width: 300px !important;

    .ant-tabs-nav-list {
      width: 300px;
      justify-content: space-around;

      .ant-tabs-tab-btn {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: black;
      }
    }
  }

  :deep(.ant-tabs-ink-bar) {
    background-color: #e13e3e;
  }
}

.active {
  font-weight: 900;
}

.ant-tabs-tabpane {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Tips {
  font-size: 12px;
  margin-top: 10px;
  color: #909399;
}

.phonelogin {
  width: 80%;
  margin-top: 10px;
  align-self: center;
}

.el-input {
  height: 30px;

  :deep(.el-input__wrapper) {
    background-color: #e13e3e;
    border: none !important;
    box-shadow: none;
  }
}

.model {
  width: 300px;
  height: 500px;
  background-color: #ffffff;
  position: absolute;
  top: 35px;
  left: -5px;
  border-radius: 10px;
  overflow: auto;
}

.item_list {
  display: flex;
  cursor: pointer;

  &.mouse {
    height: 40px;
  }

  &.large {
    height: 64px;
  }

  &.active {
    span {
      color: #e13e3e;
    }
  }

  &:hover {
    background-color: #f2f2f2;
  }

  span {
    font-size: 18px;
    color: #8d8f91;
    display: flex;
    width: 20px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item_right {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 252px;
    justify-content: center;

    div.serchWords {
      height: 40%;
      margin-bottom: -10px;
    }

    div.serchWord {
      height: 100%;
    }

    div {
      display: flex;
      align-items: center;
      padding: 0 5px;
    }
  }

  .content {
    display: inline-block !important;
    width: 252px;
    color: #8d8f91;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    font-weight: 100;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 5px;
  }
}</style>
