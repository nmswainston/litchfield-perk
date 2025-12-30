# Script to update PR branch with latest main
# Usage: .\update-pr-branch.ps1 <branch-name>
# Example: .\update-pr-branch.ps1 update-package-lock

param(
    [Parameter(Mandatory=$true)]
    [string]$BranchName
)

Write-Host "Updating PR branch: $BranchName" -ForegroundColor Cyan

# Fetch latest changes
Write-Host "`nFetching latest changes..." -ForegroundColor Yellow
git fetch origin

# Checkout the PR branch
Write-Host "`nChecking out branch: $BranchName" -ForegroundColor Yellow
git checkout $BranchName

if ($LASTEXITCODE -ne 0) {
    Write-Host "Branch not found locally. Fetching from remote..." -ForegroundColor Yellow
    git fetch origin $BranchName:$BranchName
    git checkout $BranchName
}

# Make sure we're up to date with remote
Write-Host "`nPulling latest changes from remote..." -ForegroundColor Yellow
git pull origin $BranchName

# Merge main into the PR branch
Write-Host "`nMerging main into $BranchName..." -ForegroundColor Yellow
git merge origin/main --no-edit

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nMerge successful! Pushing to remote..." -ForegroundColor Green
    git push origin $BranchName
    Write-Host "`n✅ PR branch updated successfully!" -ForegroundColor Green
    Write-Host "The workflow should now run with the updated configuration." -ForegroundColor Green
} else {
    Write-Host "`n❌ Merge conflicts detected. Please resolve them manually." -ForegroundColor Red
    Write-Host "After resolving conflicts, run: git push origin $BranchName" -ForegroundColor Yellow
}

# Switch back to main
git checkout main

