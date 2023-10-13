<template>
  <a-modal v-model:open="open" :bodyStyle="bodyStyle" footer="">
    <img src="@/assets/img/registered.png" alt="" width="180" height="52">
    <a-form ref="formRef" :model="formState" name="basic" autocomplete="off">
      <a-form-item name="phoneNumber"
        :rules="[{ required: true, pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '' }]">
        <a-input v-model:value="formState.phoneNumber" placeholder="请输入手机号">
          <template #prefix>
            <MobileOutlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" :rules="[{ required: true, pattern: /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{8,20}$/, message: '' }
      ]">
        <a-input v-model:value="formState.password" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input>
      </a-form-item>
      <div style="color: #bbbbbb;">密码8~20位，至少包含字母/数字/字符2种组合</div>
      <a-button type="primary" html-type="submit" @click="handlesubmit">注册</a-button>
    </a-form>
  </a-modal>
</template>
  
<script setup lang="ts">
import { MobileOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ref, reactive, CSSProperties, defineExpose } from 'vue';
import { message } from "ant-design-vue"
const formRef = ref()
const open = ref<boolean>(false)
const bodyStyle = reactive<CSSProperties>({
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
})
interface formState {
  phoneNumber: string,
  password: string
}
const formState = reactive<formState>({
  phoneNumber: '',
  password: ''
})

const handlesubmit = () => {
  console.log(formState);
  formRef.value
    .validate()
    .then(() => {
      console.log(111);

    })
    .catch((error: Error) => {
      console.log(error);
      message.warning({
        content: () => "手机号或密码格式错误!",
        style: {
          padding: "30px",
          color: "#edab3c",
        }
      })
    })
}


defineExpose({
  open
})
</script>
  
<style scoped lang="scss">
.ant-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .ant-btn {
    width: 100%;
    background-color: #f02e2e;
    margin-top: 10px;
  }
}

.ant-form-item {
  margin: 5px;

  :deep(.ant-form-item-control-input) {
    width: 300px;
    padding: 10px;

    span {
      border-radius: 16px;
    }
  }
}
</style>
