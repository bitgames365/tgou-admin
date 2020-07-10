<!--Example  滚动固定，当滚动条滚动到顶部视窗外面时，固定在顶部，吸顶-->
<template>
    <div ref="menu">
        <div class="menu" :class="{'is_top' : isTop}">xxx</div>
        <!--此行代码为占位元素，用于在固定在顶部后不会因为缺失一个元素导致页面突然跳动-->
        <div :class="{'placeholder' : placeholder}"></div>
    </div>
</template>

<script>
    export default {
        name: "ScrollFixBar",
        data() {
            return {
                isTop: false,
                placeholder: false
            };
        },
        methods: {
            topMenu() {
                var menu = this.$refs.menu;
                window.addEventListener("scroll", () => {
                    // 由于使用递归offsetTop,parentElement,offsetParent等方法都会遇到准确定位父元素的问题，所以使用如下方法
                    console.log("aaa")
                    if (menu.getBoundingClientRect().top <= 0) {
                        console.log("isTop")
                        this.isTop = true;
                        this.placeholder = true;
                    } else {
                        console.log("notTop")
                        this.isTop = false;
                        this.placeholder = false;
                    }
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.topMenu();
            });
        },
        activated() {
            this.$nextTick(() => {
                var menu = this.$refs.menu;
                if (menu.getBoundingClientRect().top <= 0) {
                    this.isTop = true;
                    this.placeholder = true;
                } else {
                    this.isTop = false;
                    this.placeholder = false;
                }
            });
        }
    };
</script>

<style scoped>
    .menu {
        width: 100%;
        height: 50px;
        text-align: center;
        background-color: #fafafa;
        display: flex;
    }
</style>

<style>
    .is_top {
        position: fixed;
        top: 0;
        z-index: 999;
    }

    .placeholder {
        height: 50px;
    }
</style>