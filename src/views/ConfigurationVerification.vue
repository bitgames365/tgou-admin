<template>
    <v-container fluid fill-height class="d-flex ma-0 pa-0">
        <v-navigation-drawer permanent left>
            <template v-slot:prepend>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <img :src="url">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>配置核查</v-list-item-title>
                        <v-list-item-subtitle>主机的配置合规检查</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
                    <v-list-item-icon>
                        <v-icon color="blue darken-1">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium text-subtitle-2">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main class="fill-height ma-0 pa-0">
            <router-view></router-view>
        </v-main>
    </v-container>
</template>

<script>
    import url1 from '../assets/tools/pluginclean_1.png'
    export default {
        name: 'ConfigurationVerification',
        data() {
            return {
                url: url1,
                items: [{
                        title: '工作面板',
                        icon: 'mdi-home-city',
                        path: '/configuration/dashbord'
                    },
                    {
                        title: '核查任务',
                        icon: 'mdi-apps',
                        path: '/configuration/tasks'
                    },
                    {
                        title: '设备列表',
                        icon: 'mdi-devices',
                        path: '/configuration/devices'
                    },
                    {
                        title: '结果统计',
                        icon: 'mdi-finance',
                        path: '/configuration/reports'
                    },
                ],
            }
        },
        computed: {},
    }
</script>