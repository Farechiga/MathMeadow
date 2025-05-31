# Step 1: Add changes
git add .

# Step 2: Commit with timestamped message
git commit -m "Auto update on $(date '+%Y-%m-%d %H:%M:%S')"

# Step 3: Push to GitHub
git push origin main

# Step 4: Deploy to Netlify (production)
netlify deploy --prod --dir=.