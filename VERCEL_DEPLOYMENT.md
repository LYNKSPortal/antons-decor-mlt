# 🚀 Vercel Deployment Guide

## ⚠️ Current Issue

**Error**: `No database connection string was provided to neon()`

**Cause**: Environment variables are not set in Vercel

## ✅ Solution: Add Environment Variables

### Step 1: Go to Project Settings

1. In Vercel, click on your project: **antons-decor-mlt**
2. Click **"Settings"** tab at the top
3. Click **"Environment Variables"** in the left sidebar

### Step 2: Add Each Variable

Add these **5 environment variables** one by one:

---

#### Variable 1: DATABASE_URL

**Key**: `DATABASE_URL`

**Value**:
```
postgresql://neondb_owner:npg_71QJCPpiaXNy@ep-patient-grass-abl4ltl7-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Environment**: Select all (Production, Preview, Development)

---

#### Variable 2: ARTURE_API_KEY

**Key**: `ARTURE_API_KEY`

**Value**:
```
847710e7a12754ad0c47856b
```

**Environment**: Select all (Production, Preview, Development)

---

#### Variable 3: EXTENDA_CLIENT_ID

**Key**: `EXTENDA_CLIENT_ID`

**Value**:
```
ec63ae1bb071aaffda77549fe6daeee7
```

**Environment**: Select all (Production, Preview, Development)

---

#### Variable 4: ARTURE_CLIENT_SECRET

**Key**: `ARTURE_CLIENT_SECRET`

**Value**:
```
ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594
```

**Environment**: Select all (Production, Preview, Development)

---

#### Variable 5: EXTENDA_GO_API_BASE

**Key**: `EXTENDA_GO_API_BASE`

**Value**:
```
https://api.extendago.com
```

**Environment**: Select all (Production, Preview, Development)

---

### Step 3: Redeploy

After adding all variables:

1. Go back to **"Deployments"** tab
2. Click the **"..."** menu on the failed deployment
3. Click **"Redeploy"**

OR

1. Go to the main project page
2. Click **"Redeploy"** button

---

## 📸 Visual Guide

### Where to Find Environment Variables:

```
Project → Settings → Environment Variables → Add New
```

### Form Fields:

```
┌─────────────────────────────────────────┐
│ Key                                     │
│ ┌─────────────────────────────────────┐ │
│ │ DATABASE_URL                        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Value                                   │
│ ┌─────────────────────────────────────┐ │
│ │ postgresql://neondb_owner:npg...   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Environment                             │
│ ☑ Production                           │
│ ☑ Preview                              │
│ ☑ Development                          │
│                                         │
│ [Add]                                   │
└─────────────────────────────────────────┘
```

---

## ✅ Expected Result

After adding variables and redeploying:

```
✓ Compiled successfully
✓ Running TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Build Completed!
```

Your site will be live at:
- `https://antons-decor-mlt.vercel.app`
- `https://antons-decor-mlt-git-main-lynks-portal-projects.vercel.app`

---

## 🔍 Verify Deployment

Once deployed successfully:

1. **Visit your site**: Click the domain link in Vercel
2. **Check shop page**: Go to `/shop`
3. **Verify products**: Should show 20 products from database
4. **Check console**: Look for "Extenda GO API failed, falling back to local database"

---

## 🎯 What Happens Next

### Current Behavior:
1. Site tries to connect to Extenda GO API
2. API fails (wrong URL)
3. Falls back to Neon database
4. Shows 20 products

### Once Extenda GO URL is Correct:
1. Site connects to Extenda GO API
2. Pulls real products from POS
3. Displays live inventory
4. Updates automatically

---

## 🚨 Troubleshooting

### Build Still Fails?

**Check**:
1. All 5 variables are added
2. No typos in variable names
3. Values are complete (no truncation)
4. All environments are selected

### Database Connection Error?

**Check**:
1. `DATABASE_URL` is exactly as shown above
2. No extra spaces or line breaks
3. Entire connection string is included

### Still Not Working?

**Contact Support**:
- Vercel support chat
- Or check Vercel logs for specific error

---

## 📋 Quick Checklist

Before redeploying, verify:

- [ ] `DATABASE_URL` added
- [ ] `ARTURE_API_KEY` added
- [ ] `EXTENDA_CLIENT_ID` added
- [ ] `ARTURE_CLIENT_SECRET` added
- [ ] `EXTENDA_GO_API_BASE` added
- [ ] All set to Production, Preview, Development
- [ ] No typos in keys or values
- [ ] Ready to redeploy

---

**Once all variables are added, click Redeploy and your site will be live!** 🚀
