<template>
  <div class="goTop" @click="goTop" :class="isshow ? 'show' : 'unshow'">
    <i class="iconfont icon-arrow-up-bold"></i>
  </div>
</template>
  
<script setup lang="ts">
import { defineProps, onMounted,ref } from "vue"
const Props = defineProps<{
  scrollobj?: string,
  button?: string,
  right?: string
}>()
const isshow = ref(false)
let el: HTMLElement;
onMounted(() => {
  if (Props.scrollobj === '') {
    el = document.documentElement
  }
  else {
    el = document.querySelector(Props.scrollobj!)!
  }
  el.onscroll = ()=>{
    if(el.scrollTop > 500){
      isshow.value = true
    }else{
      isshow.value = false
    }  
  }
})
const goTop = () => {
  el.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

</script>
  
<style scoped lang="scss">
.goTop {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: v-bind(button);
  right: v-bind(right);
  background-color: #fff;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  cursor: pointer;
  z-index: 5;
  &:hover {
    background-color: #f2f6fc;
  }
}
.unshow{
  // display: none;
  animation: hideBtn 0.3s ease-in;
  animation-fill-mode: forwards;
  @keyframes hideBtn {
  from {
    bottom: 85px;
  }
  to {
    bottom: -50px;
  }
}
}
.show{
  display: flex;
  animation: showBtn 0.7s ease;
  animation-fill-mode: forwards;
  @keyframes showBtn {
  0% {
    bottom: -50px;
  }
  50% {
    bottom: 110px;
  }
  100% {
    bottom: 85px;
  }
}
}
</style>
