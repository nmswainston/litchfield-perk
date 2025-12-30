# How to Update PR #17 to Fix the Workflow Error

## The Problem
PR #17 is using an old workflow file that includes `npm test`, which fails because there's no test script. The `main` branch has the correct workflow (without the test step), but the PR branch hasn't been updated yet.

## Solution: Update the PR Branch

### Option 1: GitHub UI (Easiest - Recommended)

1. Go to PR #17: https://github.com/nmswainston/litchfield-perk/pull/17
2. Look for one of these buttons:
   - **"Update branch"** button (usually near the top)
   - Or click the **"..."** menu next to the merge button and select **"Update branch"**
3. Click it - this will merge the latest `main` into the PR branch
4. This will automatically trigger a new workflow run with the correct configuration

### Option 2: Command Line

If the UI button isn't available, you can update it via command line:

1. **Find the PR branch name** on GitHub (shown at the top of the PR page, e.g., `update-package-lock` or `patch-1`)

2. **Run these commands** (replace `BRANCH_NAME` with the actual branch name):

```powershell
# Fetch all branches
git fetch origin

# Checkout the PR branch (replace BRANCH_NAME with actual branch name)
git checkout BRANCH_NAME

# If branch doesn't exist locally, fetch it first:
# git fetch origin BRANCH_NAME:BRANCH_NAME
# git checkout BRANCH_NAME

# Merge the latest main into the PR branch
git merge origin/main

# Push the updated branch
git push origin BRANCH_NAME

# Switch back to main
git checkout main
```

Or use the helper script:
```powershell
.\update-pr-branch.ps1 BRANCH_NAME
```

## After Updating

Once the PR branch is updated:
- A new workflow run will automatically start
- The new run will use the correct workflow (without the test step)
- The workflow should pass successfully

## Verification

After updating, check the new workflow run - it should:
- ✅ Only have 2 steps: `npm ci` and `npm run build`
- ✅ No `npm test` step
- ✅ Pass successfully

