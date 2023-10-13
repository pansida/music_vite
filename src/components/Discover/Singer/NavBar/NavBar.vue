<template>
    <div class="navBar">
        <div v-for="(item, index) in SecondNavBarData" :key="item.name" @click="clickSecondBarItem(index)"
            :class="index === activeNum ? 'active' : ''" class="item">
            {{ item.name }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue"
defineProps<{
    SecondNavBarData: any
}>()
const emit = defineEmits<
    (e: 'clickSecondBarItem', index: number) => void
>()
const activeNum = ref(0)

const clickSecondBarItem = (index: number) => {
    if (activeNum.value === index) return
    activeNum.value = index
    emit('clickSecondBarItem', index)
}

</script>
  
<style scoped lang="scss">
.active {
    color: red;
    background-color: #fdf5f5;
    border-radius: 15px;
}
.navBar{
    width: calc(100% - 60px);
    display: flex;
    flex-wrap: wrap;
}
.item {
    margin: 4px -2px;
    padding: 6px 10px;
    font-size: 14px;
    width: 50px;
    text-align: center;
    box-sizing: content-box;
    cursor: pointer;
}
</style>
