##前端MVC手脚架##

__1.构建工具__

- [x] webpack
- [x] babel-loader
- [x] babel-preset-es2015
- [x] babel-preset-react

__2.基础库__

_react+redux+fetch_

- [x] react
- [x] react-dom
- [x] react-redux
- [x] redux
- [x] redux-thunk
- [x] isomorphic-fetch

_angular_

- [x] angular 

_backbone+jquery_

- [x] backbone
- [x] underscore
- [x] jquery

_react+jquery+bacon_

- [x] react
- [x] react-dom
- [x] jquery
- [x] bacon

这个项目类似[todomvc][1]，主要是用于记录，以及考察现在比较流行的前端库在实际开发当中的开发体验。

其中，构建都是基于wepback+babel，支持es6语法（但在demo中，只用到es6的模块管理与析构语法）。

而基础库则分为四个不同实验组，其中前三个，分别是：

1. 代表_mvvm_模式的angular（类似的库还有knockout，vue，avalon）
2. 代表_virtual-dom_模式的react（加上了redux作为store管理）
3. 代表传统_mvc_模式的backbone（类似的库还有ember）

而第四个实验组，是我在项目中使用react+redux的组合在开发中小型项目时，发现其学习成本和维护成本远大于其带来的开发体验上的提升，直白的说，就是把简单的项目复杂化了。

虽说jquery已经是上个时代的产物，不过说句公道话，在中小型项目中，jquery还是王道，其通用性和灵活性都是得到充分的验证的。

既然react+redux在中小型项目中优势不出来（主要是redux造成的），那不如把react和jquery结合，而我采用的结合方式则是，大家耳熟能详的jquery插件模式。举个简单的例子：

```javascript
$.fn.pagination = function (options) {
	return this.each(function () {
		page(this, options);
	});
};

function page(elem, options) {
	ReactDOM.render(<Pagination { ...options } />, elem);
}
```

而在业务则使用时，就像正常使用jquery插件就可以了：

```javascript
$('#page').pagination({
	page: 0,
	size: 15,
	total: 30
});
```

这样对于不熟悉react的小伙伴，就正常的写jquery式的代码就好，而有react经验的，则可以使用react作为底层的dom操作工具。

而且这样编写代码，还带来另外一个好处，就是不用整个页面都使用react来生成，只在关键部件使用react。这是我在项目中一个很重要的经验所得。在页面元素中，其实有很大部分是和数据无关，可以直接渲染的，例如一些表单、导航、confirm、alert、toast等。如果整页都使用react来渲染，就会使得js文件异常的复杂，对于中小项目而言，这是不可接受的。

可能有些小伙伴觉得redux带来的函数式编程，可以梳理页面的数据流。单向数据流正是fb提出来的一个非常好的概念，我个人也很喜欢这样函数式的开发模式，所以最后我选择性的引入了bacon这个著名的frp库，来代替redux处理数据流，不过由于把react隐藏在jquery插件后，函数式开发似乎已经没有必然存在的理由的，这里引入只是作为一个demo，方便之后翻查。

[1]: http://todomvc.com



