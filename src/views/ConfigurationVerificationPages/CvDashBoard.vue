<template>
    <v-container fluid fill-height class='d-flex align-start pt-0 ma-0'>
        <v-row align="start" justify="start" class="grey lighten-5" style="height: 320px;box-sizing:border-box;">
            <v-col style="" cols="9" class="ma-0 pa-1 pr-2">
                <v-container class="rounded justify-start ma-1 elevation-3">
                    <v-row>
                        <v-subheader class="grey--text text--darken-4">配置核查任务(Top5)</v-subheader>
                        <v-spacer></v-spacer>
                        <v-btn text exact :ripple="false" to="/configuration/tasks" class="mr-2">更多</v-btn>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <!--任务栏 -->
                        <!--因为table但数据没有时高度会变小，其他控件位置会变，很难看，所以设置个最小高度，数据切换时其他控件也可以固定-->
                        <v-col style="min-height:280px;">
                            <template>
                                <v-data-table dense class="ma-0 pa-0" :headers="headers" :items="tasksArray"
                                    :items-per-page="5" item-key="index"></v-data-table>
                            </template>
                        </v-col>
                    </v-row>
                </v-container>
                <v-row>
                    <v-col>
                        <!--设备栏 -->
                        <v-container class="rounded justify-start ma-1 elevation-3">
                            <v-subheader class="grey--text text--darken-4">设备列表</v-subheader>
                            <v-divider></v-divider>
                            <v-list subheader>
                                <v-list-item v-for="(item) in devices" :key="item.name" link dense>
                                    <v-list-item-avatar dense>
                                        <v-icon class="blue white--text" >mdi-alert-circle-check-outline</v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                        <v-list-item-subtitle v-text="item.desc"></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-btn icon>
                                            <v-icon color="grey lighten-1">mdi-information</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-container>
                    </v-col>

                    <v-col>
                        <!-- 动态 -->
                        <v-container class="rounded justify-start ma-1 elevation-3">
                            <v-subheader class="grey--text text--darken-4">任务动态</v-subheader>
                            <v-divider></v-divider>
                            <v-list subheader>
                                <v-list-item v-for="item in items" :key="item.title" link dense>
                                    <v-list-item-avatar dense>
                                        <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                        <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-btn icon>
                                            <v-icon color="grey lighten-1">mdi-information</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-container>
                    </v-col>

                </v-row>
            </v-col>

            <!--操作栏 -->
            <v-col style="height:500px; min-width:32px" class="ma-0 pt-2 pr-2">
                <v-container style="height:200px;" class="mt-1 pa-1 elevation-3">
                    <v-subheader class="grey--text text--darken-4">便捷按钮 / 快速操作</v-subheader>
                    <v-divider></v-divider>
                    <v-container class="d-flex flex-wrap align-start justify-start pa-0">
                        <v-col v-for="(tool,index) in tools" :key=index cols=6>
                            <v-card>
                                <v-btn block color="primary" v-on:click=onOptClicked(tool.opt)>
                                    <v-icon dark left>mdi-wrench</v-icon>{{tool.name}}
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-container>
                </v-container>
                <v-container style="height:300px;" class="d-flex align-center ma-0 mt-3 pa-1 elevation-3">
                    <Echarts></Echarts>
                </v-container>
            </v-col>
        </v-row>

        <!--添加任务对话框浮动按钮 -->
        <v-btn bottom color="primary" dark fab fixed right @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <!--添加任务对话框 -->
        <v-dialog v-model="dialog" loading width="680px">
            <v-card>
                <v-card-title>
                    <span class="headline">创建任务</span>
                </v-card-title>
                <v-container>
                    <v-row class="ma-0">
                        <v-col cols="12">
                            <v-text-field v-model="taskDto.name" hide-details label="任务名称"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="devices" label="选择设备" multiple chips v-model="taskDto.devices"
                                 item-text="name" item-value="id" key="id" persistent-hint></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="taskDto.desc" hide-details label="描述"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div style="width:160px" class="d-flex justify-space-around ma-3">
                        <v-btn color="primary" @click="dialog = false">取消</v-btn>
                        <v-btn color="primary" @click="onCreateSubmit">创建</v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 消息条 -->
        <v-snackbar v-model="snackbar" top :color="snackbarColor" :timeout="timeout">
            {{ showText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                    关闭
                </v-btn>
            </template>
        </v-snackbar>

        <!-- 遮罩 -->
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
    import Echarts from '../../components/ECharts.vue'
    import {
        carete_task,
        get_tasks,
        get_devices,
    } from '@/apis/configureVerification'

    export default {
        components: {
            Echarts
        },

        data: () => ({
            title: "工作台",
            dialog: false,
            loading: false,
            snackbar: false,
            snackbarColor: "info",
            showText: "成功",
            timeout: 2000,
            overlay: false,
            devices: [
            ],
            tasksArray: [],
            tools: [{
                    name: "新增任务",
                    opt: "add",
                    icon: "mdi-wrench",
                },
                {
                    name: "新增设备",
                    opt: "add",
                    icon: "mdi-wrench",
                },
                {
                    name: "其他",
                    opt: "add",
                    icon: "mdi-wrench",
                },
            ],
            items: [{
                    icon: 'mdi-alert-circle-outline',
                    iconClass: 'red white--text',
                    title: 'Photos',
                    subtitle: 'Jan 9, 2014'
                },
                {
                    icon: 'mdi-alert-circle-check-outline',
                    iconClass: 'blue white--text',
                    title: 'Recipes',
                    subtitle: 'Jan 17, 2014'
                },
                {
                    icon: 'mdi-check-circle-outline',
                    iconClass: 'amber white--text',
                    title: 'Work',
                    subtitle: 'Jan 28, 2014'
                }
            ],

            taskDto: {
                name: '',
                desc: '',
                type: 0,
                level: 0,
                devices: [],
            },

            headers: [{
                    text: '任务名称',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                    width: 200,
                },
                {
                    text: '任务描述',
                    value: 'desc',
                    width: 300,
                },
                {
                    text: '配置不符合',
                    value: 'dgr'
                },
                {
                    text: '配置项总数',
                    value: 'tt'
                },
                {
                    text: '状态',
                    value: 'status'
                },
            ],
        }),

        computed: {
            tasks() {
                return Array.from({
                    length: this.length
                }, (k, v) => v + 1)
            },
            length() {
                return 5
            },
        },

        methods: {
            onOptClicked: function (opt) {
                if (opt === "add") {
                    this.dialog = true;
                }
            },
            onCreateSubmit: async function () {
                /*阴影遮罩*/
                this.overlay = true;
                this.dialog = false;
                await carete_task(this.taskDto).then(() => {
                    this.snackbarColor = "success";
                    this.showText = "添加任务成功";
                    /*显示消息条*/
                    this.snackbar = true;
                    /*更新任务列表*/
                    this.updateTaskList();
                }).catch(() => {
                    this.snackbarColor = "error";
                    this.showText = "添加任务失败";
                    this.snackbar = true;
                })
                this.dialog = false;
                this.loading = false;
                this.overlay = false;
            },

            updateTaskList: async function () {
                await get_tasks().then(response => {
                    this.tasksArray = response.data;
                }).catch(error => {
                    console.log(error);
                });
            },

            updateDeviceList: async function () {
                await get_devices().then(response => {
                    this.devices = response.data;
                }).catch(error => {
                    console.log(error);
                });
            },

        },

        mounted() {
            this.updateTaskList();
            this.updateDeviceList();
        },
        /*
        watch: {
            'taskDto.name': function (n, o) {
                console.log('watch');
            }
        }
        */
       watch:{
           'taskDto.devices': function(n, o){

               console.log(n)
               console.log(o)
               console.log(this.taskDto.devices)
           }
       }
    }
</script>
