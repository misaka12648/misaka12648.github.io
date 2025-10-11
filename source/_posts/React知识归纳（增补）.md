---
title: React知识归纳（增补）
date: 2022-09-08 21:34:40
tags:
- React
categories: 前端开发
---
# 场景题

## 1. 前端如何实现截图？

前端实现截图需要使⽤ HTML5 的 Canvas 和相关 API，具体步骤如下：

1. ⾸先在⻚⾯中创建⼀个 Canvas 元素，并设置其宽⾼和样式。

2. 使⽤ Canvas API 在 Canvas 上绘制需要截图的内容，⽐如⻚⾯的某个区域、某个元素、图⽚等。

3. 调⽤ Canvas API 中的 toDataURL() ⽅法将 Canvas 转化为 base64 编码的图⽚数据。

4. 将 base64 编码的图⽚数据传递给后端进⾏处理或者直接在前端进⾏显⽰。

以下是⼀个简单的例⼦，实现了对整个⻚⾯的截图：

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>截图示例</title>
  <style>
    #canvas {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9999;
    }
  </style>
</head>
<body>
  <h1>截图示例</h1>
  <p>这是一个简单的截图示例。</p>
  <button id="btn">截图</button>
  <canvas id="canvas"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('btn');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    btn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(document.documentElement, 0, 0);
      const imgData = canvas.toDataURL();
      console.log(imgData);
    });
  </script>
</body>
</html>
```

这个例⼦中，在⻚⾯中创建了⼀个 canvas 元素，并设置其宽⾼和样式，将其放在⻚⾯最上⽅。在

点击“截图”按钮时，通过 toDataURL() ⽅法将整个⻚⾯的截图转换为 base64 编码的图⽚数据，

并打印到控制台上。

## 2. 当QPS达到峰值时, 该如何处理？

当QPS达到峰值时，可以从以下⼏个⽅⾯来进⾏优化：

1. 数据库优化：数据库的优化包括优化SQL语句、使⽤索引、避免全表扫描、分表分库等措施，以提

⾼数据库的读写性能。

2. 缓存优化：缓存可以降低对数据库的访问频率，提⾼响应速度。可以使⽤Redis、Memcached等缓

存技术，减轻服务器负载。

3. 代码优化：优化代码可以提⾼代码的执⾏效率，减少不必要的开销。可以通过⼀些优化⼿段，如减

少不必要的代码执⾏、避免循环嵌套、避免不必要的递归调⽤等来提⾼代码的性能。

4. 负载均衡：负载均衡可以将请求分发到多个服务器上，减少单个服务器的负载，提⾼整个系统的性

能和可⽤性。

5. 异步处理：将⼀些计算量⼤、耗时⻓的操作异步处理，减少对主线程的阻塞，提⾼响应速度。

6. CDN加速：使⽤CDN技术可以将静态资源缓存到CDN节点上，提⾼资源的加载速度，减少服务器的

负载。

7. 硬件升级：可以通过升级服务器硬件，增加带宽等⽅式来提⾼系统的处理能⼒。

以上是⼀些常⻅的优化⼿段，需要根据具体情况进⾏选择和实施。



## 3. js 超过 Number 最⼤值的数怎么处理？

js 超过 Number 最⼤值的数怎么处理

在 JavaScript 中，超过 Number.MAX_VALUE 的数值被认为是 Infinity （正⽆穷⼤）。如果要

处理超过 Number.MAX_VALUE 的数值，可以使⽤第三⽅的 JavaScript 库，如 big.js 或

bignumber.js ，这些库可以处理任意精度的数值。

例如，使⽤ big.js 库可以将两个超过 Number.MAX_VALUE 的数相加：

```
const big = require('big.js');
const x = new big('9007199254740993');
const y = new big('100000000000000000');
const result = x.plus(y);
console.log(result.toString()); // 输出：100009007194925474093
```

这⾥创建了两个 big.js 对象 x 和 y ，分别存储超过 Number.MAX_VALUE 的数值。通过

plus ⽅法将它们相加，得到了正确的结果。最后，通过 toString ⽅法将结果转换为字符串。

**如果不依赖外部库，咋处理**

JavaScript 中，数值超过了 Number 最⼤值时，可以使⽤ BigInt 类型来处理，它可以表⽰任意精度的

整数。

使⽤ BigInt 类型时，需要在数值后⾯添加⼀个 `n` 后缀来表⽰ BigInt 类型。例如：

```
const bigNum = 9007199254740993n; // 注意：数字后⾯添加了 'n' 后缀
```

注意，BigInt 类型是 ECMAScript 2020 新增的特性，因此在某些浏览器中可能不被⽀持。如果需要在

不⽀持 BigInt 的环境中使⽤ BigInt，可以使⽤ polyfill 或者第三⽅库来实现。



## 4. 使⽤同⼀个链接， 如何实现 PC 打开是 web 应⽤、⼿机打开是⼀个 H5 应⽤？

可以通过根据请求来源（User-Agent）来判断访问设备的类型，然后在服务器端进⾏适配。

例如，可以在服务器端使⽤ Node.js 的 Express 框架，在路由中对不同的 User-Agent 进⾏判断，返回不同的⻚
⾯或数据。

具体实现可以参考以下步骤：

1. 根据 User-Agent 判断访问设备的类型，例如判断是否为移动设备

   可以使⽤第三⽅库如 ua-parser-js 进⾏ User-Agent 的解析。 进⾏ User-Agent 的解析。

2. 如果是移动设备，可以返回⼀个 H5 ⻚⾯或接⼝数据。

3. 如果是 PC 设备，可以返回⼀个 web 应⽤⻚⾯或接⼝数据。


具体实现⽅式还取决于应⽤的具体场景和需求，以上只是⼀个⼤致的思路。



## 5. 前端如何保证用户的使⽤体验


在前端开发中，保证用户体验需要从性能、交互、视觉、兼容性、反馈机制等多维度综合优化。以下是核心策略和具体方法：


### **一、性能优化：快速响应是基础**
1. **加载速度优化**  
   - **减少资源体积**：压缩代码（Webpack/Babel）、图片懒加载（`Intersection Observer`）、使用WebP/AVIF格式图片、字体图标替代位图。  
   - **异步加载与缓存**：非关键资源（如首屏外内容、第三方脚本）异步加载；利用浏览器缓存（`Cache-Control`）、Service Worker实现离线缓存。  
   - **路由懒加载**：单页应用（SPA）中按需加载页面组件，避免一次性加载所有代码。  

2. **渲染优化**  
   - **减少重排/重绘**：避免频繁操作DOM，使用CSS动画替代JavaScript直接修改样式，合理使用`requestAnimationFrame`。  
   - **SSR/SSG**：服务端渲染（Next.js）或静态生成（Nuxt.js）提升首屏加载速度，改善SEO和用户等待体验。  


### **二、交互体验：操作流畅且符合直觉**
1. **响应式设计与适配**  
   - **跨设备兼容**：使用弹性布局（Flexbox/Grid）、媒体查询（`@media`）、百分比单位，确保在PC、平板、手机上自适应。  
   - **触控友好**：按钮最小尺寸≥44x44px（移动端），避免悬停依赖（考虑移动端无hover），优化长按/滑动等手势交互。  

2. **清晰的导航与信息层级**  
   - **简化流程**：减少用户操作步骤（如表单分步提交），提供面包屑导航、固定顶部菜单等便捷返回路径。  
   - **视觉引导**：通过颜色对比（CTA按钮突出）、留白、字体大小差异，引导用户关注核心功能。  

3. **实时反馈与状态提示**  
   - **加载状态**：按钮加载时禁用并显示loading动画，长列表滚动时显示骨架屏（Skeleton）。  
   - **操作反馈**：成功/失败提示（Toast、Snackbar）、表单实时验证（输入错误即时高亮）、鼠标悬停/点击状态可视化。  


### **三、视觉与内容：美观且易读**
1. **一致性与简洁性**  
   - **设计规范**：遵循UI组件库（Ant Design、Material-UI）统一风格，按钮/图标/字体样式保持一致。  
   - **信息降噪**：避免堆砌内容，使用卡片式布局、分栏排版，重要信息优先展示（F型阅读法则）。  

2. **可访问性（A11Y）**  
   - **语义化标签**：使用`header`、`nav`、`article`等语义化元素，方便屏幕阅读器解析。  
   - **色彩与对比度**：确保文字与背景对比度≥4.5:1（WCAG标准），避免仅靠颜色传递信息（如红色报错需配合图标/文字）。  
   - **键盘导航**：所有交互元素（按钮、链接）支持Tab键聚焦，焦点状态可视化（如边框高亮）。  


### **四、错误处理与容错能力**
1. **友好的错误提示**  
   - **明确的错误信息**：避免技术术语（如“404 Not Found”改为“页面未找到，可能已被删除或移动”），提供重试按钮或引导用户返回首页。  
   - **网络异常处理**：检测网络状态（`navigator.onLine`），显示网络错误提示并提供重新连接功能。  

2. **数据容错**  
   - **输入校验**：表单提交前客户端校验（如邮箱格式、密码强度），防止无效数据传递给后端。  
   - **优雅降级**：当功能不支持时（如浏览器不支持WebGL），提供替代方案（如静态图片展示）。  


### **五、兼容性与稳定性**
1. **浏览器兼容**  
   - **渐进增强与优雅降级**：优先支持现代浏览器，旧版浏览器（如IE11）通过polyfill（Babel/Pinia）补充缺失功能。  
   - **自动化测试**：使用BrowserStack等工具测试不同浏览器和设备上的显示与交互效果。  

2. **代码健壮性**  
   - **异常捕获**：使用`try/catch`处理可能的JavaScript错误，避免页面崩溃；监控线上错误（Sentry）并及时修复。  
   - **内存管理**：避免内存泄漏（如及时清除定时器、解绑事件监听），长时间运行的应用（如富文本编辑器）需定期释放资源。  


### **六、用户调研与持续优化**
1. **数据驱动优化**  
   - **行为分析**：通过埋点（Google Analytics、Mixpanel）追踪用户点击热区、流失页面，针对性优化高频操作路径。  
   - **A/B测试**：对关键功能（如按钮位置、配色）进行多版本测试，选择转化率更高的方案。  

2. **用户反馈收集**  
   - 提供反馈入口（浮动按钮、表单），定期整理用户建议（如“操作步骤太复杂”“加载速度慢”），纳入迭代计划。  


### **总结**  
用户体验是技术与设计的结合，核心在于“以用户为中心”：  
- **性能**：确保快速加载和流畅交互，减少等待焦虑；  
- **易用性**：操作符合直觉，反馈清晰，容错能力强；  
- **包容性**：兼顾不同设备、浏览器和用户群体（如残障用户）；  
- **迭代优化**：通过数据和反馈持续改进，让产品更贴合用户需求。  

通过以上策略，前端可以构建高效、美观且可靠的用户界面，提升用户满意度和留存率。



## 6. 如何解决⻚⾯请求接⼝⼤规模并发问题

如何解决⻚⾯请求接⼝⼤规模并发问题， 不仅仅是包含了接⼝并发， 还有前端资源下载的请求并发。

应该说这是⼀个话题讨论了；

个⼈认为可以从以下⼏个⽅⾯来考虑如何解决这个并发问题:

1. **后端优化**：可以对接⼝进⾏优化，采⽤缓存技术，对数据进⾏预处理，减少数据库操作等。使⽤集群技术，将请求分散到不同的服务器上，提⾼并发量。另外可以使⽤反向代理、负载均衡等技术，分担服务器压⼒。
2. **做 BFF 聚合**：把所有⾸屏需要依赖的接⼝， 利⽤服务中间层给聚合为⼀个接⼝。
3. **CDN加速**：使⽤CDN缓存技术可以有效减少服务器请求压⼒，提⾼⽹站访问速度。CDN缓存可以将接⼝的数据存储在缓存服务器中，减少对原始服务器的访问，加速数据传输速度。
4. **使⽤ WebSocket**：使⽤ WebSocket 可以建⽴⼀个持久的连接，避免反复连接请求。WebSocket 可以实现双向通信，⼤幅降低服务器响应时间。
5. **使⽤ HTTP2 及其以上版本， 使⽤多路复⽤**。
6. **使⽤浏览器缓存技术**：强缓存、协商缓存、离线缓存、Service Worker 缓存 等⽅向。
7. **聚合⼀定量的静态资源**： ⽐如提取⻚⾯公⽤复⽤部分代码打包到⼀个⽂件⾥⾯、对图⽚进⾏雪碧图处理， 多个图⽚只下载⼀个图⽚。
8. **采⽤微前端⼯程架构**： 只是对当前访问⻚⾯的静态资源进⾏下载， ⽽不是下载整站静态资源
9. **使⽤服务端渲染技术**： 从服务端把⻚⾯⾸屏直接渲染好返回， 就可以避免掉⾸屏需要的数据再做额外加载和执⾏。

## 7. 设计⼀套全站请求耗时统计⼯具

首先我们要知道有哪些方式可以统计前端请求耗时
从代码层面上统计全站所有请求的耗时方式主要有以下几种:
1.Performance APl:Performance APl是浏览器提供的一组 API，可以用于测量网页性能。

   通过Performance APl，可以获取页面各个阶段的时间、资源加载时间等。

   其中，PerformanceTiming APl可以获取到每个资源的加载时间，从而计算出所有请求的耗时。

2.XMLHttpRequest的 load 事件:在发送XMLHttpRequest 请求时，可以为其添加 load 事件，在请求完成时执行回调函数，从而记录请求的耗时。

3.fetch 的 Performance APl:类似XMLHttpRequest,fetch 也提供了 Performance APl，可以通过Performance APl获取请求耗时。
4.自定义封装的请求函数:可以自己封装一个请求函数，在请求开始和结束时记录时间，从而计算请求耗时。



设计⼀套前端全站请求耗时统计⼯具

可以遵循以下步骤：

1. 实现⼀个性能监控模块，⽤于记录每个请求的开始时间和结束时间，并计算耗时。

2. 在应⽤⼊⼝处引⼊该模块，将每个请求的开始时间记录下来。

3. 在每个请求的响应拦截器中，记录响应结束时间，并计算请求耗时。

4. 将每个请求的耗时信息发送到服务端，以便进⾏进⼀步的统计和分析。

5. 在服务端实现数据存储和展⽰，可以使⽤图表等⽅式展⽰请求耗时情况。

6. 对于请求耗时较⻓的接⼝，可以进⾏优化和分析，如使⽤缓存、使⽤异步加载、优化查询语句等。
7. 在前端应⽤中可以提供开关，允许⽤⼾⾃主开启和关闭全站请求耗时统计功能。

以下是⼀个简单的实现⽰例：

```
const performance = {
  timings: {},
  config: { reportUrl: '/report' },
  
  init() {
    window.addEventListener('fetchStart', event => {
      this.timings[event.detail.id] = { startTime: Date.now() };
    });

    window.addEventListener('fetchEnd', event => {
      const entry = this.timings[event.detail.id];
      if (!entry) return;
      
      entry.endTime = Date.now();
      entry.duration = entry.endTime - entry.startTime;
      
      this.report({
        url: event.detail.url,
        method: event.detail.method,
        duration: entry.duration
      });
    });
  },

  report(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.config.reportUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  }
};

export default performance;
```

在应⽤⼊⼝处引⼊该模块：

```
// main.js
import performance from './performance';
performance.init();
```

在每个请求的响应拦截器中触发 fetchEnd 事件：

```
// fetch.js
import EventBus from './EventBus';

const fetch = (url, options = {}) => {
    const id = Math.random().toString(36).slice(2);
    const method = options.method || 'GET';

    EventBus.dispatchEvent(
    	new CustomEvent('fetchStart', {
        	detail: { id, url, method }
    	})
    );

    return window.fetch(url, options)
        .then(response => {
            EventBus.dispatchEvent(
            	new CustomEvent('fetchEnd', {
                	detail: { id, url, method }
            	})
            );
            return response;
        })
        .catch(error => {
            EventBus.dispatchEvent(
            	new CustomEvent('fetchError', {
                	detail: { id, url, method, error }
            	})
            );
            throw error;
        });
};

export default fetch;
```

在服务端实现数据存储和展⽰，可以使⽤图表等⽅式展⽰请求耗时

##　8. H5 如何解决移动端适配问题

移动端适配问题是指如何让⽹⻚在不同的移动设备上显⽰效果相同。下⾯是⼀些常⻅的 H5 移动端适配

**⽅案**：
**1.使⽤ viewport 标签**
通过设置 viewport 标签的 meta 属性，来控制⻚⾯的缩放⽐例和宽度，以适配不同的设备。例如：

```
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
其中 width=device-width 表⽰设置 viewport 的宽度为设备宽度， initial-scale=1.0 表
⽰初始缩放⽐例为 1。
**2.使⽤ CSS3 的媒体查询**

通过 CSS3 的媒体查询，根据不同的设备宽度设置不同的样式，以适配不同的设备。例如：

```
@media screen and (max-width: 640px) {/* 样式 */ }
```

其中 max-width 表⽰最⼤宽度，当屏幕宽度⼩于等于 640px 时，应⽤这些样式。

**3.使⽤ rem 单位**

通过将 px 转化为 rem 单位，根据不同的设备字体⼤⼩设置不同的样式，以适配不同的设备。例如：

```
html {
	font-size: 16px;
}
@media screen and (max-width: 640px) {
	html {font-size: 14px;}
}

div {
	width: 10rem;
}
```

其中 font-size: 16px 表⽰将⽹⻚的基准字体⼤⼩设置为 16px， font-size: 14px 表⽰在屏幕宽度⼩于等于 640px 时将基准字体⼤⼩设置为 14px， div 元素的 width: 10rem 表⽰该元素的宽度为 10 个基准字体⼤⼩。

**4.使⽤ flexible 布局⽅案**

通过使⽤ flexible 布局⽅案，将 px 转化为 rem 单位，并且动态计算根节点的字体⼤⼩，以适配不同的设备。

例如使⽤ lib-flexible 库：

```
// index.html
<script src="https://cdn.bootcdn.net/ajax/libs/lib-flexible/0.3.4/flexible.js"></script
// index.js
import 'lib-flexible/flexible.js'
```

其中 flexible.js 会在⻚⾯加载时动态计算根节点的字体⼤⼩，并将 px 转化为 rem 单位。在样

式中可以直接使⽤ px 单位，例如：

```
 div {width: 100px;height: 100px;}
```

这个 div 元素的⼤⼩会根据设备屏幕的宽度进⾏适配。

## 9. 站点一键换肤的实现方式有哪些？

⽹站⼀键换肤实现⽅式有以下⼏种

1.**使⽤ CSS 变量**：通过定义⼀些变量来控制颜⾊、字体等，然后在切换主题时动态修改这些变量的值。

2.**使⽤ class 切换**：在 HTML 的根元素上添加不同的 class 名称，每个 class 名称对应不同的主题样式，在切换主题时切换根元素的 class 名称即可。

3.**使⽤ JavaScript 切换**：使⽤ JavaScript 动态修改⻚⾯的样式，如修改元素的背景颜⾊、字体颜⾊等。

4.**使⽤ Less/Sass 等 CSS 预处理器**：通过预处理器提供的变量、函数等功能来实现主题切换。

需要注意的是，⽆论采⽤哪种⽅式实现，都需要在设计⻚⾯样式时尽量遵循⼀些规范，如不使⽤绝对的像素值，使⽤相对单位等，以便更好地适应不同的屏幕⼤⼩和分辨率。

以 less 举例， 详细讲述⼀下具体操作流程

通过 Less 实现⽹⻚换肤可以使⽤ CSS 变量和 Less 变量。CSS 变量的语法如下：

```
 :root {--primary-color: #007bff;}
 .btn {background-color: var(--primary-color);}
```

⽽ Less 变量则是通过 Less 预编译器提供的变量语法来实现的，如下所⽰：

```
@primary-color: #007bff;
.btn {background-color: @primary-color;}
```

通过 Less 变量来实现⽹⻚换肤的⽅式可以在运⾏时使⽤ JavaScript 来修改 Less 变量的值，从⽽实现

换肤效果。具体步骤如下：

1. 使⽤ Less 预编译器来编译 Less ⽂件为 CSS ⽂件。

2. 在 HTML ⽂件中引⼊编译后的 CSS ⽂件。

3. 在 JavaScript 中动态修改 Less 变量的值。

4. 使⽤ JavaScript 将新的 Less 变量值注⼊到编译后的 CSS ⽂件中。

5. 将注⼊后的 CSS 样式应⽤到⻚⾯上。

以下是⼀段实现通过 Less 变量来实现⽹⻚换肤的⽰例代码：

```less
// base.less 文件
@primary-color: #007bff;

.btn {
  background-color: @primary-color;
}
```

```less
// dark.less 文件
@primary-color: #343a40;
```

```html
<!-- index.html 文件 -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>⽹⻚换肤⽰例</title>
  <link rel="stylesheet/less" type="text/css" href="base.less">
  <link rel="stylesheet/less" type="text/css" href="dark.less">
</head>
<body>
  <button class="btn">按钮</button>

  <script src="less.min.js"></script>
  <script>
    function changeSkin() {
      // 修改 Less 变量的值
      less.modifyVars({
        '@primary-color': '#28a745'
      }).then(() => {
        console.log('换肤成功');
      }).catch(() => {
        console.error('换肤失败');
      });
    }
  </script>
</body>
</html>
```

在上⾯的⽰例代码中，我们引⼊了两个 Less ⽂件，⼀个是 base.less ，⼀个是 dark.less 。其中 base.less 定义了⼀些基础的样式，⽽ dark.less 则是定义了⼀个暗⿊⾊的主题样式。在JavaScript 中，我们使⽤ less.modifyVars ⽅法来修改 Less 变量的值，从⽽实现了换肤的效果。当然，这只是⼀个简单的⽰例代码，实际的换肤功能还需要根据实际需求来进⾏设计和实现。

## 10. 如何实现网页加载进度条？

监听静态资源加载情况

可以通过 window.performance 对象来监听⻚⾯资源加载进度。该对象提供了各种⽅法来获取资

源加载的详细信息。

可以使⽤ performance.getEntries() ⽅法获取⻚⾯上所有的资源加载信息。可以使⽤该⽅法

来监测每个资源的加载状态，计算加载时间，并据此来实现⼀个资源加载进度条。

下⾯是⼀个简单的实现⽅式：

```js
const resources = window.performance.getEntriesByType('resource');
const totalResources = resources.length;
let loadedResources = 0;
resources.forEach((resource) => {
    if (resource.initiatorType !=='xmlhttprequest') {// 排除 AJAX 请求
		resource.onload = () => {
			loadedResources++;
            const progress = Math.round((loadedResources / totalResources) * 100);
			updateProgress(progress);
		};
	}
});
// 更新进度条
function updateProgress(progress) {
}
```

该代码会遍历所有资源，并注册⼀个 onload 事件处理函数。当每个资源加载完成后，会更新loadedResources 变量，并计算当前的进度百分⽐，然后调⽤ updateProgress() 函数来更新进度条。需要注意的是，这⾥排除了 AJAX 请求，因为它们不属于⻚⾯资源。

当所有资源加载完成后，⻚⾯就会完全加载。

**实现进度条**

⽹⻚加载进度条可以通过前端技术实现，⼀般的实现思路是通过监听浏览器的⻚⾯加载事件和资源加

载事件，来实时更新进度条的状态。下⾯介绍两种实现⽅式。

**1.使⽤原⽣进度条**

在 HTML5 中提供了 progress 元素，可以通过它来实现⼀个原⽣的进度条。

```javascript
<progress id="progressBar" value="0" max="100"></progress>
```

然后在 JavaScript 中，监听⻚⾯加载事件和资源加载事件，实时更新 progress 元素的 value属性。

```
const progressBar = document.getElementById('progressBar');

window.addEventListener('load', () => {
	progressBar.value = 100;
});

document.addEventListener('readystatechange', () => {const progress =
	Math.floor((document.readyState / 4) * 100);
 	progressBar.value = progress;
});
```

**2.使⽤第三⽅库**

使⽤第三⽅库可以更加⽅便地实现⽹⻚加载进度条，下⾯以 nprogress 库为例：

1. 安装 nprogress 库

```
npm install nprogress --save
```

​	2.在⻚⾯中引⼊ nprogress.css 和 nprogress.js

```
<link rel="stylesheet" href="/node_modules/nprogress/nprogress.css" />
<script src="/node_modules/nprogress/nprogress.js"</script>
```

在 JavaScript 中初始化 nprogress 并监听⻚⾯加载事件和资源加载事件

```
// 初始化 nprogress
NProgress.configure({ showSpinner: false });

 // 监听⻚⾯加载事件
 window.addEventListener('load', () => {
 	NProgress.done();
 });

 // 监听资源加载事件
 document.addEventListener('readystatechange', () => {
 	if(document.readyState === 'interactive') {
  		NProgress.start();
 	} else if (document.readyState === 'complete') {
 		NProgress.done();
 	}
 });
```

使⽤ nprogress 可以⾃定义进度条的样式，同时也提供了更多的 API 供我们使⽤，⽐如说⼿动控制进度条的显⽰和隐藏，以及⽀持 Promise 和 Ajax 请求的进度条等等。



## 11. 深度 SEO 优化的⽅式有哪些

深度 SEO 优化涉及到⼀些技术层⾯的优化策略，以下是⼀些常⻅的⽅式：

1. **⽹站结构优化**：优化⽹站的结构，确保每个⻚⾯都可以被搜索引擎爬取和索引。使⽤合适的 HTML

标签和语义化的内容结构，使搜索引擎能够更好地理解⻚⾯的内容。

2. **⽹站速度优化**：提升⽹站的加载速度对 SEO 很重要。通过压缩和合并 CSS 和 JavaScript ⽂件、优

化图像、使⽤浏览器缓存、使⽤ CDN（内容分发⽹络）等技术⼿段来减少⻚⾯加载时间。

3. **⻚⾯渲染优化**：确保搜索引擎可以正常渲染和索引使⽤ JavaScript 技术构建的单⻚⾯应⽤（SPA）

或动态⽣成的内容。使⽤服务端渲染（SSR）或预渲染技术，确保搜索引擎能够获取到完整的⻚⾯

内容。

4. **URL 优化**：使⽤短、描述性的 URL，并使⽤关键词来优化 URL 结构。避免使⽤动态参数或过⻓的

URL。

5. **链接优化**：内部链接和外部链接都对 SEO 有影响。在⽹站内部设置相关性强的链接，使⻚⾯之间相

互连接。外部链接是获取更多外部⽹站链接指向⾃⼰⽹站的重要⼿段，可以通过内容创作和社交媒

体推⼴来获得更多⾼质量的外部链接。

6. **Schema 标记**：使⽤结构化数据标记（Schema Markup）来标识⽹⻚内容，帮助搜索引擎更好地

理解和展⽰⽹⻚信息。可以使⽤ JSON-LD、Microdata 或 RDFa 等标记格式。

7. **XML ⽹站地图**：创建和提交 XML ⽹站地图，提供⽹站的结构和⻚⾯信息，帮助搜索引擎更好地索

引⽹站内容。

8. **Robots.txt ⽂件**：通过 Robots.txt ⽂件来指⽰搜索引擎哪些⻚⾯可以被爬取和索引，哪些⻚⾯不可

访问。

9. **HTTPS 加密**：使⽤ HTTPS 协议来加密⽹站通信，确保数据安全和⽤⼾隐私，同时搜索引擎更倾向

于收录和排名使⽤ HTTPS 的⽹站。

10. **移动友好性**：优化⽹站在移动设备上的显⽰和用户体验，确保⽹站具备响应式设计或移动版⽹站，以及快速加载和友好的操作性。

这些是深度 SEO 优化的⼀些常⻅技术层⾯的策略，通过综合运⽤这些策略，可以提升⽹站的搜索引擎可⻅性和排名。



## 12 . web 应⽤中如何对静态资源加载失败的场景做降级处理

在 Web 应⽤中，可以使⽤以下⽅法对静态资源加载进⾏降级处理，即

**在某个资源加载失败时使⽤备⽤的静态资源链接**：

1. 使⽤多个 CDN 链接：在 HTML 中使⽤多个静态资源链接，按照优先级顺序加载，如果其中⼀个链

接加载失败，则尝试加载下⼀个链接。

```
<script src="https://cdn1.example.com/script.js"</script>
<script src="https://cdn2.example.com/script.js"</script>
<script src="https://cdn3.example.com/script.js"></script>
```

在加载 JavaScript 脚本时，浏览器会按照给定的顺序尝试加载各个链接，如果某个链接加载失败，浏

览器会⾃动尝试加载下⼀个链接。

1. 使⽤备⽤资源路径：在 JavaScript 中使⽤备⽤的资源路径，当主要的资源路径加载失败时，切换到

备⽤路径。

```
 var script = document.createElement('script');
 script.src = 'https://cdn.example.com/script.js';
 script.onerror = function() {// 主要资源加载失败，切换到备⽤资源路径
 	script.src = 'https://backup.example.com/script.js';
 };
 document.head.appendChild(script);
```

在加载 JavaScript 脚本时，可以通过监听 onerror 事件，在主要资源加载失败时切换到备⽤资源

路径，保证资源的可靠加载。

1. 使⽤动态加载和错误处理：使⽤ JavaScript 动态加载静态资源，并处理加载失败的情况。• 

```
function loadScript(src, backupSrc) {return new Promise(function(resolve, reject) {var

script = document.createElement('script');

script.src = src;

script.onload = resolve;

script.onerror = function() {if (backupSrc) {// 主要资源加载失败，切换到备⽤资源路径

script.src = backupSrc;

} else {

reject(new Error('Failed to load script: 'src));

}

};document.head.appendChild(script);

});

}

// 使⽤⽰例

loadScript('https://cdn.example.com/script.js', 'https://backup.example.com/script.js')

.then(function() {// 资源加载成功

})

.catch(function(error) {// 资源加载失败console.error(error);

});

```



通过动态加载脚本的⽅式，可以在资源加载失败时切换到备⽤资源路径或处理加载错误。

除了前⾯提到的⽅法外，还有以下⼀些降级处理的⽅法：

1. **本地备份资源**：在 Web 应⽤的服务器上存储备份的静态资源⽂件，并在主要资源加载失败时，从

本地服务器上加载备份资源。这种⽅法需要在服务器上维护备份资源的更新和⼀致性。

2. **使⽤浏览器缓存**：如果静态资源被浏览器缓存，则在资源加载失败时，浏览器可以使⽤缓存中的资

源。可以通过设置合适的缓存策略，例如设置资源的 Cache-Control 头字段，让浏览器缓存资源并

在需要时从缓存中加载。

3. **使⽤ Service Worker**：使⽤ Service Worker 技术可以在浏览器中拦截⽹络请求，从⽽实现更⾼级

的降级处理。当主要资源加载失败时，可以使⽤ Service Worker 拦截请求并返回备⽤资源，或者

动态⽣成代替资源。

4. **使⽤资源加载管理⼯具**：使⽤像 Webpack 这样的资源加载管理⼯具，可以通过配置多个资源⼊⼝

点和插件来实现资源加载的灵活控制。在资源加载失败时，可以通过配置⾃动切换到备⽤资源或通

过插件实现⾃定义的降级逻辑。

这些⽅法可以根据具体的需求和场景选择适合的降级处理策略。降级处理的⽬的是确保⽹⻚应⽤的正

常运⾏，提⾼用户体验，并减少对单⼀资源的依赖性。