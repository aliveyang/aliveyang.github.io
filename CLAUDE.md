# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site blog using the `yelee` theme. The site is deployed to GitHub Pages at https://aliveyang.github.io/. The repository uses a split-branch workflow where the `dev` branch contains source files and the `main` branch contains built static files.

## Build Commands

### Local Development
```bash
# Using convenience script (Windows)
dev.bat

# Or directly with Hugo
hugo server -w -D
```
Access the site at http://localhost:1313

### Build for Production
```bash
# Using convenience script (Windows)
build.bat

# Or directly with Hugo
hugo --minify
```
Generated files are output to `./public/`

## Content Management

### Creating New Posts
```bash
# Create a new post
hugo new post/my-post-name.md
```

New posts are created in `content/post/` using the archetype template at `themes/yelee/archetypes/default.md`.

### Post Front Matter Template
```toml
+++
title = "Post Title"
date = 2025-12-13
tags = ["tag1", "tag2"]
+++
**Brief description**
<!--more-->
# Content starts here
```

The `<!--more-->` marker separates the summary from the full content.

### Ignored Files
Files matching these patterns are not processed by Hugo (see config.toml):
- `draft.md`
- `private.md`
- `我的模板.md`

## Repository Structure

- **content/post/** - Blog post markdown files
- **themes/yelee/** - Hugo theme files (override with project-level layouts)
- **layouts/** - Custom layout overrides
- **archetypes/** - Custom post templates
- **config.toml** - Hugo site configuration
- **hugo.exe** - Local Hugo binary (Windows, not tracked by git in future)
- **public/** - Generated static site (not committed, created by build)
- **.github/workflows/action.yml** - GitHub Actions deployment workflow
- **dev.bat / build.bat** - Convenience scripts for development and building

## Deployment

The site uses GitHub Actions for automatic deployment:

1. Push to `dev` branch triggers the workflow
2. Hugo builds the site with `hugo --minify`
3. Generated files from `./public/` are pushed to the `main` branch of the `aliveyang.github.io` repository
4. GitHub Pages serves the site from the `main` branch

The workflow requires a `MY_BLOG_ACTION_PAGE` personal access token secret configured in GitHub repository settings.

## Theme Shortcodes

The yelee theme provides custom shortcodes for embedding media:

```markdown
{{< music "music.163.com/outchain/player?type=2&id=1387564796&auto=1&height=66" right >}}
{{< youtube VIDEO_ID >}}
{{< video "www.youtube.com/embed/VIDEO_ID" >}}
{{< bilibili VIDEO_ID >}}
```

## Hugo Configuration

Key configuration in `config.toml`:
- **baseURL**: `https://aliveyang.github.io/`
- **title**: "alive yang"
- **theme**: "yelee"
- **use_cdn**: `true` (enables CDN for jQuery and Font Awesome)
- **lazy_load_images**: `true` (enables image lazy loading)

### Comment System

The site uses **Giscus** (GitHub Discussions-based) for comments. See `GISCUS_SETUP.md` for setup instructions.

Configuration in `config.toml`:
```toml
[params.giscus]
  enable = true
  repo = "aliveyang/aliveyang.github.io"
  repoId = "..."  # Get from https://giscus.app/zh-CN
  category = "Announcements"
  categoryId = "..."  # Get from https://giscus.app/zh-CN
```

To disable comments globally, set `enable = false`. To disable for a specific post, add `comments = false` to the post's front matter.

## Performance Optimizations

The site has been optimized for performance. See `PERFORMANCE.md` for details.

Key optimizations:
- JavaScript deferred loading (non-blocking)
- CDN support for libraries (jsDelivr)
- Resource preloading and DNS prefetch
- HTML/CSS/JS minification
- Image optimization with lazy loading
- Aggressive caching strategy

**Using optimized images in posts:**
```markdown
{{< img src="/images/photo.jpg" alt="Description" caption="Optional caption" >}}
```

**Performance testing:**
```bash
npx lighthouse https://aliveyang.github.io --view
```
