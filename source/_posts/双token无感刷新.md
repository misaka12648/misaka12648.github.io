---
title: 双token无感刷新
date: 2023-03-29 22:42:41
tags:
- 登录
- 双token
- 服务端
categories: 
- 前端开发
- 后端开发
---
## 双 Token 无感刷新
### **双 Token 无感刷新流程（含 HttpOnly Cookie 详细说明）**

#### **1. 首次登录**

- 用户提交账号密码 → 服务端验证通过后返回：
  - **`accessToken`**（短期有效，如2小时，存`sessionStorage`）
  - **`refreshToken`**（长期有效，如7天，通过`HttpOnly + Secure + SameSite`的Cookie返回，`refreshToken` **不会**出现在前端代码中，仅通过Cookie自动传输）

```http
Set-Cookie: 
  refreshToken=[加密令牌];
  Path=/; 
  HttpOnly; 
  Secure; 
  SameSite=Strict; 
  Max-Age=604800
```

#### **2. 正常请求**

- 每次请求自动携带 `accessToken`（通过`Authorization`头）
- **关键点**：`refreshToken` **不会**出现在前端代码中，仅通过Cookie自动传输

#### **3. Token 过期处理**

1. **检测过期**：请求返回 `401`（Token失效）

2. 自动刷新

   - 前端无需手动获取refreshToken，浏览器自动通过Cookie发送到刷新接口：

     ```javascript
     axios.post('/refresh', {}, { withCredentials: true }) // 自动携带HttpOnly Cookie
     ```

   - 服务端验证 refreshToken：

     - **有效**：返回新`accessToken` +**后端更新HttpOnly Cookie中的`refreshToken`**
     - **无效**：清除Cookie并返回401

#### **4. HttpOnly Cookie 安全机制**

| 安全措施            | 作用                                              |
| ------------------- | ------------------------------------------------- |
| **HttpOnly**        | 禁止JavaScript读取，防御XSS攻击                   |
| **Secure**          | 仅通过HTTPS传输，防止中间人窃取                   |
| **SameSite=Strict** | 禁止跨站发送Cookie，防御CSRF攻击                  |
| **服务端绑定设备**  | 校验Cookie中的`refreshToken`与当前设备指纹/IP匹配 |

#### **5. 并发请求处理**（注意用提前刷新机制，结合这种方式会更好）

1. **加锁刷新**：第一个401请求触发刷新，后续请求暂停 （**还有一种方式叫提前刷新机制效果会更好**）

2. 队列管理：

   ```javascript
   // 伪代码示例
   if (isRefreshing) {  
       return new Promise(resolve => {    
           queue.push(() => resolve(axios(originalRequest)))  
       })
   }
   ```
   

#### **6. 关键优势**

1. 绝对防御XSS：
   - 攻击者即使注入JS也无法窃取`refreshToken`（HttpOnly保护）
2. 自动安全传输：
   - Cookie自动携带，无需手动处理敏感令牌
3. 服务端完全控制：
   - 可随时使特定`refreshToken`失效（如检测到异常设备）

#### **7. 异常处理**

- 刷新失败（如refreshToken过期）：

  ```javascript
  document.cookie = 'refreshToken=; Max-Age=0; Path=/;' // 强制清除CookieredirectToLogin()
  ```

------

### **为什么这是最佳实践？**

1. 安全与体验的平衡：
   - 短期`accessToken`降低泄露风险
   - HttpOnly Cookie保证`refreshToken`绝对安全
3. 全场景覆盖：
   - 网页/App/API均可适配此方案



## 双token无感刷新优势

双 Token 无感刷新流程是一种提升安全性和用户体验的设计方案，尤其适用于Web应用程序。以下是其主要优势：

1. **安全性增强**：
   - **HttpOnly Cookie的使用**：通过将`refreshToken`存储在HttpOnly Cookie中，可以有效防止XSS攻击，因为JavaScript无法访问或读取这些Cookie。
   - **Secure和SameSite属性**：确保Cookie仅在HTTPS连接下传输（Secure），并且根据SameSite策略限制跨站请求时Cookie的发送（防御CSRF攻击）。
   
2. **用户体验优化**：
   - 用户在正常使用应用期间不会频繁遇到会话过期的情况，因为短期的`accessToken`失效后可以通过后台自动刷新机制获取新的令牌，整个过程对用户透明，无需用户再次输入凭证。
   
3. **服务端控制力强**：
   - 服务端可以随时使特定的`refreshToken`失效，例如检测到异常登录行为或设备指纹变化时，这增加了额外的安全层。
   
4. **适应多场景**：
   - 此方案不仅适用于传统的Web应用，也可以被调整用于移动应用、API服务等多种场景，具有良好的通用性。
   
5. **自动化程度高**：
   - 前端代码不需要手动处理`refreshToken`，浏览器会自动将其作为Cookie的一部分发送给服务器，简化了前端逻辑。

6. **并发请求管理**：
   - 针对并发请求可能导致的重复刷新问题，通过加锁和队列机制保证只进行一次刷新操作，其他请求等待新token生成后再执行，避免不必要的资源消耗和潜在错误。

综上所述，这种双 Token 无感刷新机制不仅提高了系统的安全性，同时也增强了用户体验，实现了两者之间的良好平衡，并且能够灵活应用于不同的应用场景中。

## 提前刷新机制（待优化）

除了在请求返回 **401（Token失效）** 后触发刷新流程外，还可以采用 **提前刷新机制**，

即在 `accessToken` 即将过期前的某个时间点（比如提前 5 分钟）主动触发刷新流程。这种方案可以进一步优化用户体验，避免用户因 `accessToken` 过期而短暂遭遇权限问题。

以下是关于 **提前刷新机制** 的详细说明及其优势：

---

### 提前刷新机制的工作原理

1. **记录 Token 的过期时间**
   
   - 在首次登录或每次刷新后，服务端返回 `accessToken` 的有效期（例如 2 小时），前端可以将其存储在内存中。
- 前端需要记录当前时间与 `accessToken` 的过期时间，计算剩余有效时间。
  
2. **提前刷新逻辑**
   
   - 当检测到 `accessToken` 的剩余有效时间小于某个阈值（如 5 分钟）时，前端主动调用 `/refresh` 接口刷新 `accessToken`。
- 刷新接口会返回新的 `accessToken` 和更新后的 `refreshToken`（通过 HttpOnly Cookie 会自动传输）。
  
3. **示例代码**
   
   ```javascript
   let isRefreshing = false; // 防止重复刷新
   const accessTokenExpiryTime = parseExpiryFromToken(accessToken); // 解析出过期时间
   const threshold = 5 * 60 * 1000; // 提前 5 分钟刷新
   
   function scheduleTokenRefresh() {
       const now = Date.now();
    const timeUntilExpiry = accessTokenExpiryTime - now;
   
       if (timeUntilExpiry <= threshold && !isRefreshing) {
           isRefreshing = true;
           axios.post('/refresh', {}, { withCredentials: true })
               .then(response => {
                   const newAccessToken = response.data.accessToken;
                   updateAccessToken(newAccessToken); // 更新全局 accessToken
               })
               .catch(error => {
                   redirectToLogin(); // 刷新失败，跳转到登录页面
               })
               .finally(() => {
                   isRefreshing = false;
               });
       }
   }
   
   // 定时检查是否需要刷新
   setInterval(scheduleTokenRefresh, 60 * 1000); // 每分钟检查一次
   ```

---

### 提前刷新机制的优势

1. **无缝体验**
   - 用户不会遇到 401 错误，因为 `accessToken` 在即将过期之前就已经被刷新，确保了用户的操作不会中断。

2. **减少 401 处理逻辑**
   - 无需为每个请求都处理 401 错误并触发刷新流程，简化了错误处理逻辑。

3. **降低并发问题风险**
   - 提前刷新避免了多个请求同时检测到 `accessToken` 过期而导致的并发刷新问题。

4. **更高效地利用资源**
   - 主动刷新比被动刷新更高效，减少了因 401 错误导致的额外网络请求和重试开销。

---

### 提前刷新机制的注意事项

1. **时间同步问题**
   - 确保客户端和服务端的时间同步（例如使用 NTP 协议），否则可能导致提前刷新逻辑不准确。

2. **刷新频率控制**
   - 如果 `accessToken` 的有效期很短（如 10 分钟），则需要合理设置提前刷新的时间阈值，避免频繁刷新对服务器造成压力。

3. **异常处理**
   - 如果刷新失败（如 `refreshToken` 已过期或无效），应立即清除所有认证信息并引导用户重新登录。

4. **多设备支持**
   - 如果用户在同一账户下使用多个设备登录，需考虑如何协调不同设备的 `accessToken` 刷新逻辑（例如通过服务端广播刷新事件）。

---

### 对比两种方案

| 特性           | **401 触发刷新**            | **提前刷新**                 |
| -------------- | --------------------------- | ---------------------------- |
| **触发时机**   | `accessToken` 已过期        | `accessToken` 即将过期       |
| **用户体验**   | 可能短暂中断（401 错误）    | 无缝体验                     |
| **实现复杂度** | 较低（只需处理 401 错误）   | 较高（需定时检查剩余有效期） |
| **并发问题**   | 需要加锁和队列管理          | 几乎无并发问题               |
| **网络效率**   | 可能因 401 错误增加额外请求 | 更高效                       |

---

### 结合两种方案的最佳实践

为了兼顾安全性和用户体验，可以将两种方案结合起来：
1. **优先采用提前刷新机制**：在 `accessToken` 即将过期前主动刷新，确保用户操作不中断。
2. **后备 401 处理逻辑**：如果提前刷新失败或未及时触发（例如用户长时间未操作），仍然可以通过 401 错误触发刷新流程作为兜底方案。

这种方式既能提供无缝的用户体验，又能应对极端情况下的 Token 失效问题，是一种更为全面的解决方案。

---

### 总结

提前刷新机制是一种更加主动、高效的双 Token 刷新策略，尤其适用于对用户体验要求较高的场景。结合 401 处理逻辑，可以进一步提升系统的鲁棒性和安全性，是现代 Web 应用中的最佳实践之一。

### 实现

实现提前5分钟刷新的策略。主要需要修改axios.config.js中的响应拦截器，添加Token过期时间的判断逻辑。

具体来说，每次发起请求时，先检查当前Token的过期时间，如果距离过期时间小于5分钟，就主动触发刷新Token的流程。

这样可以避免Token实际过期导致的请求中断，提供更好的用户体验。

在请求拦截器中添加了Token过期时间检查逻辑，当检测到Token将在5分钟内过期时，会自动触发刷新流程，获取新的Token。这样可以避免Token实际过期导致的请求中断，提供更流畅的用户体验。

具体改进包括：

 • 添加checkTokenExpiration函数用于检查Token的过期时间

 • 在请求拦截器中集成Token提前刷新逻辑

 • 保持原有的401响应处理机制作为后备方案  这种机制能够显著减少因Token过期导致的请求失败，提升了系统的可用性和用户体验。

```
import axios from 'axios'

// 用于存储等待中的请求队列
let refreshQueue = []
// 标记是否正在刷新token
let isRefreshing = false

// 创建axios实例
const instance = axios.create()

// 检查token是否需要刷新
const checkTokenExpiration = () => {
  const token = sessionStorage.getItem('accessToken')
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = payload.exp * 1000 // 转换为毫秒
    const currentTime = Date.now()
    const timeUntilExpiration = expirationTime - currentTime

    // 如果token将在5分钟内过期，返回true
    return timeUntilExpiration < 5 * 60 * 1000
  } catch (error) {
    return false
  }
}

// 请求拦截器
instance.interceptors.request.use(
  async config => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      // 检查token是否需要提前刷新
      if (checkTokenExpiration() && !config.url.includes('/refresh')) {
        try {
          const response = await axios.post('/api/refresh', {}, {
            withCredentials: true
          })
          const { accessToken } = response.data
          sessionStorage.setItem('accessToken', accessToken)
          config.headers.Authorization = `Bearer ${accessToken}`
        } catch (error) {
          console.error('Token refresh failed:', error)
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // 如果响应状态码是401（未授权）且不是刷新token的请求
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 如果已经在刷新token，将请求加入队列
      if (isRefreshing) {
        return new Promise(resolve => {
          refreshQueue.push(() => {
            originalRequest.headers.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`
            resolve(instance(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 请求刷新token
        const response = await axios.post('/api/refresh', {}, {
          withCredentials: true
        })

        const { accessToken } = response.data
        sessionStorage.setItem('accessToken', accessToken)

        // 更新原始请求的token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        // 执行队列中的请求
        refreshQueue.forEach(callback => callback())
        refreshQueue = []

        return instance(originalRequest)
      } catch (error) {
        // 刷新token失败，清除token和cookie
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('username')
        document.cookie = 'refreshToken=; Max-Age=0; Path=/;'
        window.location.href = '/login'
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// 替换全局的axios
axios.defaults.baseURL = '/api'
Object.assign(axios, instance)

export default instance
```



参考：[双token无感刷新机制 - huihuihero - 博客园](https://www.cnblogs.com/huihuihero/p/16984343.html)

代码：https://gitee.com/lhrlxllhr/token.git       master/refresh 分支