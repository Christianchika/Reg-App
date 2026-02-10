# ⚡ Quick GitHub Commands - Cheat Sheet

Copy and paste these commands to quickly set up your repository.

---

## 🚀 Initial Setup (First Time Only)

```bash
# 1. Configure Git (replace with your info)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Navigate to your project
cd registration-app

# 3. Initialize Git repository
git init

# 4. Add all files
git add .

# 5. Make first commit
git commit -m "Initial commit: Complete registration app"

# 6. Add remote repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/registration-app.git

# 7. Push to GitHub
git branch -M main
git push -u origin main
```

**Done! ✅ Your code is now on GitHub**

---

## 🔄 Daily Workflow (Update Code)

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Describe what you changed"

# 4. Push to GitHub
git push
```

---

## 🌿 Working with Branches

```bash
# Create new branch
git checkout -b feature-name

# List all branches
git branch

# Switch to another branch
git checkout main

# Push new branch to GitHub
git push -u origin feature-name

# Merge branch into main
git checkout main
git merge feature-name
git push
```

---

## 📥 Pull Latest Changes

```bash
# Pull from GitHub
git pull

# Pull from specific branch
git pull origin main
```

---

## 🔍 View Information

```bash
# Check status
git status

# View commit history
git log

# View remote URLs
git remote -v

# View differences
git diff
```

---

## ❌ Undo Changes

```bash
# Discard changes in file
git checkout -- filename

# Unstage file
git reset HEAD filename

# Undo last commit (keep changes)
git reset --soft HEAD^

# Undo last commit (discard changes)
git reset --hard HEAD^

# Revert a commit
git revert commit-hash
```

---

## 🔧 Fix Common Issues

### Wrong commit message?
```bash
git commit --amend -m "New commit message"
git push --force
```

### Forgot to add a file?
```bash
git add forgotten-file.js
git commit --amend --no-edit
git push --force
```

### Remove file from Git (but keep locally)
```bash
git rm --cached filename
git commit -m "Remove filename from tracking"
git push
```

### Change remote URL
```bash
git remote set-url origin https://github.com/NEW-USERNAME/repository.git
```

---

## 🎯 One-Line Commands

```bash
# Quick commit all changes
git add . && git commit -m "Quick update" && git push

# Create and switch to new branch
git checkout -b new-branch

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Clone repository
git clone https://github.com/USERNAME/repository.git

# Update forked repository
git fetch upstream && git merge upstream/main
```

---

## 🔐 Setup SSH (One-Time Setup)

```bash
# 1. Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# 2. Start SSH agent
eval "$(ssh-agent -s)"

# 3. Add SSH key
ssh-add ~/.ssh/id_ed25519

# 4. Copy public key (Mac)
pbcopy < ~/.ssh/id_ed25519.pub

# 4. Copy public key (Linux)
cat ~/.ssh/id_ed25519.pub

# 5. Add to GitHub: Settings → SSH and GPG keys → New SSH key

# 6. Test connection
ssh -T git@github.com

# 7. Change remote to SSH
git remote set-url origin git@github.com:USERNAME/repository.git
```

---

## 📦 .gitignore Template

Create `.gitignore` file:

```
# Dependencies
node_modules/
package-lock.json

# Environment
.env
.env.local

# Logs
logs/
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# Build
dist/
build/
```

---

## 🏷️ Tagging Releases

```bash
# Create tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"

# Push tag to GitHub
git push origin v1.0.0

# Push all tags
git push --tags

# List tags
git tag

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

---

## 📝 Good Commit Message Examples

```
✅ GOOD:
- "Add user authentication with JWT"
- "Fix login bug on mobile devices"
- "Update README with installation steps"
- "Refactor database connection logic"

❌ BAD:
- "update"
- "fix"
- "changes"
- "asdf"
```

### Commit Message Format:
```
Type: Short description (50 chars max)

- Detailed explanation if needed
- What changed and why
- Related issue: #123

Types: feat, fix, docs, style, refactor, test, chore
```

---

## 🎨 Markdown Formatting

For README.md:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Code inline`

```code block```

- Bullet list
1. Numbered list

[Link text](https://url.com)
![Image](url.jpg)

> Quote

---

| Table | Header |
|-------|--------|
| Data  | Data   |
```

---

## 🚨 Emergency Commands

### Completely reset to remote
```bash
git fetch origin
git reset --hard origin/main
```

### Remove all untracked files
```bash
git clean -fd
```

### Fix "fatal: refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
```

---

## ✅ Pre-Push Checklist

```bash
# Run these before every push:

# 1. Check status
git status

# 2. Run tests (if you have them)
npm test

# 3. Check for sensitive data
grep -r "password" .
grep -r "api_key" .

# 4. Verify .env is in .gitignore
cat .gitignore | grep .env

# 5. Then push
git push
```

---

## 📚 Useful Aliases

Add to `~/.gitconfig`:

```bash
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --oneline --graph --decorate --all
```

Usage:
```bash
git st         # Instead of git status
git co main    # Instead of git checkout main
git visual     # See branch graph
```

---

## 🎯 Copy-Paste Quick Setup

**For first-time GitHub upload:**

```bash
cd registration-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/registration-app.git
git branch -M main
git push -u origin main
```

**For regular updates:**

```bash
git add .
git commit -m "Your message here"
git push
```

---

**Keep this handy! 📌**

Bookmark this page for quick reference whenever you need GitHub commands.

---

Made with ❤️ for developers