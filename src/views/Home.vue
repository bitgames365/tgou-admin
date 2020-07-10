<template>
  <div>
    <v-container fill-height class="d-flex align-start justify-start ">
      <v-card width="120" height="120" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" class="ma-3"
        v-for="tool in tools" :key=tool.page :to="tool.page">
        <v-img :src="tool.url" class="white--text ma-auto mt-2 mb-2 rounded" height="60%" width="70">
        </v-img>
        <div height=30px class="ma-1 text-center rounded">{{tool.name}}</div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import url1 from '../assets/tools/pluginclean_1.png'
  import url2 from '../assets/tools/pcspeedup_1.png'
  import url3 from '../assets/tools/trojanscan_1.png'
  import url4 from '../assets/tools/garbageclean_1.png'

  export default {
    name: 'Home',
    components: {
      //ScrollFixBar
    },

    data: () => {
      return {
        tools: [{
            page: "configuration",
            name: "配置核查",
            router: "/configuration",
            url: url1
          },
          {
            page: "baseline",
            name: "基线检测",
            router: "/baseline",
            url: url2
          },
          {
            page: "webscan",
            name: "网站漏扫",
            router: "/webscan",
            url: url3
          },
          {
            page: "sysscan",
            name: "主机漏扫",
            router: "/sysscan",
            url: url4
          },
        ]
      }
    },
  }
</script>

<!-- 在这个页面隐藏滚动条 -->
<style>
  html {
    overflow-y: auto
  }
</style>