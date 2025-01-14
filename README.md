# dream-team

Team Project: Workflow and Guidelines

Welcome to the Team Project repository! This document outlines the workflow, branch structure, and best practices for collaborating effectively on this project.

# 📂 Branch Structure

- main: The stable, production-ready branch. Only thoroughly reviewed and tested code is merged here.
- dev: The development branch where new features are integrated and tested before merging into main.
- feature/<feature-name>: Short-lived branches created for specific tasks, bug fixes, or features. These branches are always based on dev.

# 🔄 Workflow Overview

### 1. Cloning the Repository

Developers should clone the repository and switch to the dev branch for development:

```
git clone https://github.com/MGough22/dream-team.git
cd dream-team
git checkout dev
```

### 2. Creating a Feature Branch

Create a new branch from dev for your feature or task:

```
git checkout -b feature/<feature-name>
```

Examples:
• feature/add-user-auth
• feature/create-profile-page

### 3. Making Changes

Make your changes and commit them with meaningful commit messages:

```
git add .
git commit -m "Implemented feature: user authentication"
```

### 4. Syncing with dev

To avoid conflicts, regularly pull the latest changes from dev into your feature branch:

```
git pull origin dev
```

### 5. Pushing Your Feature Branch

Push your feature branch to the remote repository:

```
git push -u origin feature/<feature-name>
```

### 6. Opening a Pull Request (PR)

• Open a PR on GitHub to merge your feature branch into dev.
• Ensure your PR includes:
• A clear description of the feature or fix.
• Screenshots or test logs if applicable.
• Assign reviewers to your PR.

### 7. Merging Into dev

• After review and approval, your feature branch will be merged into dev.

# 🚀 Releasing to Production

### 1. When dev is stable and ready for production: 1. Switch to the main branch:

```
git checkout main
```

### 2. Pull the latest changes from main:

```
git pull origin main
```

### 3. Merge dev into main:

```
git merge dev
```

### 4. Push the updated main branch:

```
git push origin main
```

# 🔄 Syncing dev with main

After merging into main, update the dev branch: 1. Switch to dev:

```
git checkout dev
```

### 2. Pull the latest changes from main into dev:

```
git pull origin main
```

### 3. Push the updated dev branch:

```
git push origin dev
```

test
