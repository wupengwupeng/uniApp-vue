<!-- ##  cache
- /utils/minCache
	* 使用
	-'name'不是以下划线开头的表示会缓存到Map中，在程序生命周期内有并且在有效时间内有效
	-this.$cache.set('name', 'MinCache')

	- 过期时间设置为0表示不会过期
	- 注意：'test'不是以下划线命名表示在程序生命周期永久缓存
	-this.$cache.set('test', 'testdemo', 0)

	- 过期时间设置为0表示不会过期
	- 注意：'_imgURL'是以下划线命名表示永久缓存到Storage
	- this.$cache.set('_imgURL', 'data', 0)复制代码// 获取缓存的数据
	- this.imgURL = this.$cache.get('_imgURL')
	- this.name = this.$cache.get('name')
	- this.test = this.$cache.get('test') -->

<!-- ## 路由跳转及参数传递
+ 		跳到my的页面  query是传递的参数
		this.$openPage({
		  name: 'my',
		  query: {id: 123}
		})
		
		
	- 不带参数
	- this.$openPage('my') -->
# 运行
- install hbuilderX
- 浏览器运行
+ 在hbuilderx里面运行到浏览器 会与真机运行有微小差异。
- 真机运行
+ PC端，手机安装360助手，连接手机，提示安装hbuilderX基座，  hbuilderX点真机运行。




## 规范
- 文件名和路由小写，单词用中线-分开
- js用驼峰，组件文件名同上，Class类名首字母大写，
- css小写，_或者-分开
- 路由 小写_分开，路由跟文件名同名
- 方法需要写注释，如果太忙可以不写

## uni.request 封装
+  1.export default xxapi 
   xxapi{
     return request.post('',data)
     return request.get('',data)
   }
   request 需要登录权限
   nototkenRequest 免登陆
+  import {method} from 'api'
+  method(params).then()
+ 