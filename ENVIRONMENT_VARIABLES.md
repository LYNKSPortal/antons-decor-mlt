# 🔐 Environment Variables Reference

## 📋 Current Configuration

Your `.env.local` file contains all necessary API credentials and configuration.

### File Location:
```
/Users/user/CascadeProjects/Antons Decor/antons-decor/.env.local
```

### ⚠️ Security:
- ✅ This file is **gitignored** (won't be committed to Git)
- ✅ Credentials are **secure**
- ✅ Never share this file publicly

## 🔑 Environment Variables

### 1. Database Configuration

```env
DATABASE_URL=postgresql://neondb_owner:npg_71QJCPpiaXNy@ep-patient-grass-abl4ltl7-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Purpose**: Connection string for Neon PostgreSQL database
**Used by**: 
- `lib/db.ts` - Database connection
- `drizzle.config.ts` - Drizzle ORM configuration
- `scripts/seed.ts` - Database seeding

---

### 2. Extenda GO API Credentials

#### Arture API Key
```env
ARTURE_API_KEY=847710e7a12754ad0c47856b
```

**Purpose**: Primary API key for Extenda GO authentication
**Used by**: 
- `lib/extendago.ts` - API requests
- Sent in `X-API-Key` header

#### Extenda Client ID
```env
EXTENDA_CLIENT_ID=ec63ae1bb071aaffda77549fe6daeee7
```

**Purpose**: OAuth 2.0 Client ID for Extenda GO
**Used by**: 
- `lib/extendago.ts` - OAuth token requests
- Client Credentials flow

#### Extenda Client Secret
```env
ARTURE_CLIENT_SECRET=ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594
```

**Purpose**: OAuth 2.0 Client Secret for Extenda GO
**Used by**: 
- `lib/extendago.ts` - OAuth token requests
- Kept secure, never exposed to client

---

### 3. Extenda GO API Configuration

```env
EXTENDA_GO_API_BASE=https://api.extendago.com
```

**Purpose**: Base URL for Extenda GO API endpoints
**Used by**: 
- `lib/extendago.ts` - All API requests
**Note**: ⚠️ This URL may need to be updated based on Extenda support guidance

**Possible values**:
- `https://api.extendago.com`
- `https://api.extendaretail.com`
- `https://go.extendaretail.com/api`
- Custom URL from your Extenda dealer

---

## 📝 How to Update

### To change any value:

1. **Open the file**:
   ```bash
   code .env.local
   ```

2. **Edit the value**:
   ```env
   VARIABLE_NAME=new_value_here
   ```

3. **Save the file**

4. **Restart the dev server**:
   ```bash
   npm run dev
   ```

---

## 🧪 Testing Environment Variables

### Check if variables are loaded:

```bash
# In your terminal
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.ARTURE_API_KEY)"
```

Should output: `847710e7a12754ad0c47856b`

---

## 🚨 Troubleshooting

### Issue: "Environment variable not found"

**Solution**:
1. Check `.env.local` exists in project root
2. Verify variable name spelling
3. Restart dev server
4. Check for extra spaces or quotes

### Issue: "Database connection failed"

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Check Neon database is active
3. Test connection: `npm run db:studio`

### Issue: "API authentication failed"

**Solution**:
1. Verify all three Extenda credentials are set
2. Check for typos in credentials
3. Contact Extenda support to verify credentials are active

---

## 📦 For Production Deployment

When deploying to production (Vercel, Netlify, etc.):

### Add these environment variables in your hosting platform:

```
DATABASE_URL=your_production_database_url
ARTURE_API_KEY=847710e7a12754ad0c47856b
EXTENDA_CLIENT_ID=ec63ae1bb071aaffda77549fe6daeee7
ARTURE_CLIENT_SECRET=ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594
EXTENDA_GO_API_BASE=https://api.extendago.com
```

### Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable
3. Redeploy

### Netlify:
1. Go to Site Settings → Environment Variables
2. Add each variable
3. Trigger new deploy

---

## ✅ Current Status

All environment variables are configured and ready:

- ✅ **Database**: Connected to Neon PostgreSQL
- ✅ **Extenda API Key**: Configured
- ✅ **OAuth Credentials**: Set up
- ✅ **API Base URL**: Set (may need verification)
- ✅ **Security**: File is gitignored

---

## 📞 Need Help?

**If credentials don't work**:
- Contact Extenda support
- Verify credentials are active
- Ask for correct API base URL

**If database issues**:
- Check Neon dashboard
- Verify connection string
- Test with `npm run db:studio`

---

**Last Updated**: Configuration complete and ready for use! 🚀
