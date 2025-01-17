# 🌑⭐ Dream Team 🔥🏕

Welcome to the Team Project repository! This document outlines the workflow, branch structure, and best practices for collaborating effectively on this project.

## 📂 Branch Structure

- main: The stable, production-ready branch. Only thoroughly reviewed and tested code is merged here.
- dev: The development branch where new features are integrated and tested before merging into main.
- feature/<feature-name>: Short-lived branches created for specific tasks, bug fixes, or features. These branches are always based on dev.

## 🔄 Workflow Overview

### 1. Using this repo for the first time:

Developers should first clone the repository, cd into the correct directory, install depenencies, and then switch to the dev branch for development,

```
git clone https://github.com/MGough22/dream-team.git
cd dream-team
cd front-end
npm install
git checkout dev
git pull
```

To run the code locally:

```
npm run dev
```

### 2. Creating a Feature Branch

When developing new code, create a new branch from dev for your feature or task:

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

To avoid conflicts, regularly merge the latest changes from dev into your feature branch, do so this way:

1. Checkout to dev:

```
git checkout dev
```

2. Pull the latest changes from remote:

```
git pull
```

3. Checkout back into your feature branch:

```
git checkout feature/<feature-name>
```

4. Merge the changes into your local feature branch:

```
git merge dev
```

### 5. Pushing Your Feature Branch

When the code on your branch is good to go, and having made sure to merge with dev, commit your changes, and push your local branch to it's remote repository:

```
git push -u origin feature/<feature-name>
```

Altenrtaively, if you have already pushed to remote, simply push your latest changes from within your feature branch as normal:

```
git push
```

### 6. Opening a Pull Request (PR)

Then next step is to create a PR to merge your code into the dev branch:

• Open a PR on GitHub to merge your feature branch into dev.

• Make sure the incoming branch is set to dev rather than main

• Ensure your PR includes a clear description of the feature or fix.

### 7. Merging Into dev

• After review and approval, your feature branch will be merged into dev.

# Secondary information:

## 🚀 Releasing to Production

### 1. When dev is stable and ready for production: 1. Switch to the main branch:

```
git checkout main
```

### 2. Pull potnetial changes from main:

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

## 🔄 Syncing dev with main

After merging into main, update the dev branch:

### 1. Switch to dev:

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
