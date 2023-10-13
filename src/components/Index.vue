<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <Header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="siderStyle">
        <SiderList />
      </a-layout-sider>
      <a-layout-content :style="contentStyle">
        <router-view />
      </a-layout-content>
    </a-layout>
    <a-layout-footer :style="footerStyle">
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>
  
<script setup lang="ts">
import Footer from "../components/Footer/Footer.vue"
import Header from "../components/Header/Header.vue"
import type { CSSProperties } from 'vue';
import SiderList from "../components/SiderList/SiderList.vue"
const headerStyle: CSSProperties = {
  height: "60px",
  "background-color": "#ec4141",
  display: "flex",
  alignItems: "center",
  "z-index": 1000,
  padding: 0,
  minWidth:"1000px",
  position:"relative"
};
const contentStyle: CSSProperties = {
  height: 'calc(100vh - 125px)',
  backgroundColor: 'white',
  minWidth: "640px",
  boxSizing: "border-box",
  overflow: "auto",
};
const siderStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#fff',
  height:"calc(100vh - 124px)",
  flexShrink:0,
  borderRight: "1px solid #ccc",
  width: "199px",
};
const footerStyle: CSSProperties = {
  borderTop: "1px solid #ddd",
  width: "100%",
  height: "65px",
  position: "fixed",
  bottom: 0,
  left: 0,
  display: "flex",
  "justify-content": "space-between",
  padding: "6px 10px",
  zIndex: 10000,
  backgroundColor: "#fff",
  boxSizing:"border-box",
  minWidth:"800px"
};




</script>
  
<style scoped lang="scss"></style>
