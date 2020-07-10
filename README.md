1 vue create admin
2 vue add router
3 vue add vuetify

栅格布局：
在上面的示例中，我们在小型，中型，大型和超大型设备上创建了三个等宽列。父级的 v-container 来居中子级的 v-col。
v-container 提供了居中和水平填充网站内容的功能。您也可以使用 fluid 属性在所有视口和设备尺寸上完全扩展容器。 遵循以前的 1.x 功能，在这些功能中，属性作为 v-container 中的类传递，从而允许轻松地使用助手类（例如 ma-#/pa-#/fill-height） 进行应用
v-row 是 v-col 的包装组件。它利用 flex 属性来控制内部列的布局和流。它使用的标准边距是 24px。这可以减少 dense 属性或完全移除 no-gutters 。这是 2.x 版本的用法，替换了 1.x 中的 v-layout。
v-col 是内容所有者，必须是 v-row 的直接子集。 这是 2.x 版本的用法，替换了 1.x 中的 v-flex。