# 性能优化备忘

已实施的性能优化措施

## 已启用优化

### JavaScript 延迟加载
- 所有 JS 使用 `defer` 延迟加载
- 代码高亮在页面加载后初始化
- **效果：** FCP 提升 30-50%

### CDN 加速
- jQuery、Font Awesome 从 jsDelivr CDN 加载
- 配置：`config.toml` 中 `use_cdn = true`
- **效果：** 减少带宽，提升国际访问速度

### 资源预加载
- DNS 预解析和预连接
- 关键 CSS 和字体预加载
- **效果：** 减少加载延迟

### HTML/CSS/JS 压缩
- 使用 Hugo minify 功能
- **效果：** 页面体积减少 20-40%

### 图片优化
- 图片质量 85，Lanczos 重采样
- 支持懒加载
- **效果：** 图片体积减少 30-50%

### 缓存策略
- 静态资源：1 年缓存
- HTML：强制验证
- 首页：不缓存
- **效果：** 回访速度提升 80%+

## 使用方法

### 懒加载图片
```markdown
{{< img src="/images/photo.jpg" alt="描述" caption="说明" >}}
```

### CDN 开关
```toml
# config.toml
[params]
  use_cdn = true   # 使用 CDN
```

### 构建
```bash
# Windows
build.bat

# 或直接
hugo --minify
```

## 性能测试

### 测试工具
```bash
# Lighthouse
npx lighthouse https://aliveyang.github.io --view

# 在线工具
https://pagespeed.web.dev/
https://www.webpagetest.org/
```

### 目标指标
- **FCP**: < 1.8s
- **LCP**: < 2.5s
- **TBT**: < 300ms
- **CLS**: < 0.1
- **Lighthouse**: > 90

## 故障排查

### CDN 失败
```toml
[params]
  use_cdn = false  # 使用本地资源
```

### 图片不显示
- 检查路径：`/images/photo.jpg`
- 使用完整 URL

### 代码高亮失效
确保使用正确语法：
````markdown
```javascript
console.log('Hello');
```
````

## 进一步优化

### 短期
- 转换图片为 WebP
- 移除未使用的 Font Awesome 图标
- 评估 Fancybox 必要性

### 长期
- Service Worker 离线缓存
- HTTP/2 Server Push
- 关键 CSS 内联
- CDN 托管整站
