# ✅ Extenda Webhook Integration Ready

## 🎯 Status: Ready to Receive Data

Your Anton's Décor shop is now configured to receive product data from Extenda via webhooks!

## 📍 Webhook Endpoints Created

### 1. Products Webhook
**URL**: `https://your-domain.com/api/webhooks/extenda/products`
- **Method**: POST
- **Purpose**: Receives full product catalog or product updates
- **Authentication**: Required (Bearer token + X-Client-Secret)

### 2. Stock Updates Webhook  
**URL**: `https://your-domain.com/api/webhooks/extenda/stock`
- **Method**: POST
- **Purpose**: Receives real-time stock level changes
- **Authentication**: Required (Bearer token + X-Client-Secret)

## 🔐 Authentication

All webhooks require these headers:
```
Authorization: Bearer 847710e7a12754ad0c47856b
X-Client-Secret: ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594
```

## 📊 How It Works

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Extenda   │ ──POST─→│   Webhook    │ ──Save─→│    Neon     │
│   System    │         │   Endpoint   │         │  Database   │
└─────────────┘         └──────────────┘         └─────────────┘
                                                         │
                                                         ↓
                                                  ┌─────────────┐
                                                  │    Shop     │
                                                  │   Display   │
                                                  └─────────────┘
```

## 🧪 Testing Webhooks

### Test Products Webhook
```bash
curl -X POST http://localhost:3000/api/webhooks/extenda/products \
  -H "Authorization: Bearer 847710e7a12754ad0c47856b" \
  -H "X-Client-Secret: ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "id": "test-product-1",
      "name": "Test Product",
      "description": "Test Description",
      "price": 99.99,
      "inStock": true,
      "image": "https://example.com/image.jpg"
    }
  ]'
```

### Test Stock Webhook
```bash
curl -X POST http://localhost:3000/api/webhooks/extenda/stock \
  -H "Authorization: Bearer 847710e7a12754ad0c47856b" \
  -H "X-Client-Secret: ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "productId": "test-product-1",
      "quantity": 10,
      "inStock": true
    }
  ]'
```

## 📞 Provide to Extenda Dealer

Send this information to your Extenda dealer:

### Webhook Configuration

**Products Webhook:**
- URL: `https://antonsdecor-com.stackstaging.com/api/webhooks/extenda/products`
- Method: POST
- Content-Type: application/json
- Auth Header: `Authorization: Bearer 847710e7a12754ad0c47856b`
- Custom Header: `X-Client-Secret: ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594`

**Stock Updates Webhook:**
- URL: `https://antonsdecor-com.stackstaging.com/api/webhooks/extenda/stock`
- Method: POST
- Content-Type: application/json
- Auth Header: `Authorization: Bearer 847710e7a12754ad0c47856b`
- Custom Header: `X-Client-Secret: ca7fc94030db0702ec7f8832a7fc6629454123ccd7fae6ad29935b71e509a466f4fef192fa556b9a70695f5999056f6376e33772af9ff7128b86eb9cab025594`

## 📋 Expected Data Format

### Products Payload
```json
[
  {
    "id": "product-sku-123",
    "name": "Product Name",
    "slug": "product-name",
    "description": "Product description",
    "price": 299.99,
    "inStock": true,
    "image": "https://cdn.example.com/image.jpg",
    "featured": false,
    "rating": 5
  }
]
```

### Stock Updates Payload
```json
[
  {
    "productId": "product-sku-123",
    "sku": "product-sku-123",
    "quantity": 15,
    "inStock": true
  }
]
```

## ✅ What Happens When Data Arrives

1. **Webhook receives data** from Extenda
2. **Authentication verified** (API key + secret)
3. **Data validated** and transformed
4. **Database updated** (insert new or update existing)
5. **Shop automatically shows** updated products
6. **No manual intervention** needed

## 🔍 Monitoring

Check webhook activity in your terminal:
```bash
# You'll see logs like:
Received Extenda products webhook: {...}
Processed 10 products
```

## 🚨 Troubleshooting

### Webhook Returns 401 Unauthorized
- Check API key and client secret are correct
- Verify headers are being sent properly

### Webhook Returns 500 Error
- Check server logs for details
- Verify data format matches expected structure

### Products Not Appearing
- Check database: `npm run db:studio`
- Verify webhook was called successfully
- Check product data format

## 🎯 Current Status

✅ **Webhooks Created** - Ready to receive data
✅ **Authentication Configured** - Secure endpoints
✅ **Database Integration** - Auto-save to Neon
✅ **Shop Integration** - Auto-display new products
⏳ **Waiting for Extenda** - Need them to configure webhooks

## 📝 Next Steps

1. **Contact Extenda Dealer**
   - Provide webhook URLs above
   - Request they configure webhooks
   - Ask for test webhook to verify

2. **Test Integration**
   - They send test data
   - Verify it appears in database
   - Check shop displays correctly

3. **Go Live**
   - Enable automatic product sync
   - Monitor for issues
   - Enjoy real-time updates!

## 💡 Alternative: Manual Testing

While waiting for Extenda, test with curl commands above to verify webhooks work.

---

**Status**: ✅ **READY FOR EXTENDA INTEGRATION**

**Action Required**: 📞 **Contact Extenda dealer with webhook URLs**
