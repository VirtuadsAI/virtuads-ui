# n8n Setup Guide for VirtuAdsAI

This guide will walk you through setting up n8n locally to integrate with the VirtuAdsAI dashboard.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (for AI agent functionality)

## Installation Steps

### 1. Install n8n Globally

```powershell
npm install n8n -g
```

### 2. Start n8n

```powershell
n8n start
```

This will start n8n on `http://localhost:5678`. The first time you run it, you'll need to create an account.

### 3. Access n8n UI

Open your browser and navigate to:

```
http://localhost:5678
```

Create your account credentials (these are stored locally).

### 4. Import the VirtuAds Workflow

1. In the n8n UI, click on **Workflows** in the sidebar
2. Click **Add Workflow** → **Import from File**
3. Select the file: `c:\Users\wilfr\OneDrive\Documentos\GitHub\virtuads-ui\n8n_virtuads_workflow.json`
4. Click **Import**

### 5. Configure OpenAI Credentials

The workflow uses OpenAI's GPT-4 to generate campaign optimizations. You need to add your API key:

1. In the imported workflow, click on the **AI Agent: Optimizer** node
2. Click on **Credentials** → **Create New**
3. Enter your OpenAI API key
4. **Organization ID** is optional
5. Save the credential

### 6. Activate the Workflow

1. Click the **Inactive** toggle in the top right to activate the workflow
2. The workflow is now listening for webhooks at:

   ```
   http://localhost:5678/webhook/virtuads-campaign
   ```

## Testing the Integration

### Option 1: Test from Dashboard

1. Start the VirtuAdsAI frontend:

   ```powershell
   cd c:\Users\wilfr\OneDrive\Documentos\GitHub\virtuads-ui
   npm run dev
   ```

2. Open the dashboard at `http://localhost:5173/dashboard` (or the port Vite shows)

3. Click **Nueva Campaña** button

4. Fill out the campaign form and submit

5. Watch the AI processing stages in the wizard

### Option 2: Test with cURL

```powershell
curl -X POST http://localhost:5678/webhook/virtuads-campaign `
  -H "Content-Type: application/json" `
  -d '{
    "campaign": {
      "name": "Test Campaign",
      "budget": "100",
      "objective": "traffic"
    },
    "timestamp": "2025-12-30T21:00:00Z",
    "source": "virtuads-dashboard"
  }'
```

### Option 3: Test from n8n UI

1. In the n8n workflow editor, click the **Test Workflow** button
2. Click on the **Webhook** node
3. Click **Execute Node**
4. The workflow will run with test data

## Workflow Overview

The VirtuAds workflow consists of 3 nodes:

1. **Webhook: Receive Campaign** - Receives POST requests from the dashboard
2. **AI Agent: Optimizer** - Sends campaign data to OpenAI GPT-4 for analysis
3. **Respond to Dashboard** - Returns AI recommendations back to the frontend

### Workflow Diagram

```
┌─────────────────────┐
│  Dashboard Form     │
│  (Campaign Data)    │
└──────────┬──────────┘
           │ POST
           v
┌─────────────────────┐
│  Webhook Node       │
│  :5678/virtuads...  │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│  OpenAI GPT-4       │
│  AI Optimization    │
└──────────┬──────────┘
           │
           v
┌─────────────────────┐
│  Response Node      │
│  JSON → Dashboard   │
└─────────────────────┘
```

## Environment Configuration

Create a `.env` file in the project root (if not exists):

```bash
# n8n Integration
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/virtuads-campaign
VITE_N8N_ENABLED=true
```

## Troubleshooting

### n8n not starting

**Error**: `Port 5678 already in use`

**Solution**: Kill the process using port 5678 or change n8n's port:

```powershell
n8n start --port 5679
```

Then update your `.env` file accordingly.

### Webhook not receiving requests

**Error**: Connection refused or timeout

**Checklist**:

- [ ] Is n8n running? Check `http://localhost:5678`
- [ ] Is the workflow activated? (toggle in top right)
- [ ] Is CORS blocking the request? (check browser console)
- [ ] Is the webhook URL correct in `.env`?

### OpenAI API errors

**Error**: `401 Unauthorized` or `Invalid API key`

**Solution**:

1. Verify your OpenAI API key is correct
2. Check your OpenAI account has available credits
3. Ensure the API key has proper permissions

**Error**: `Rate limit exceeded`

**Solution**:

- Wait a minute and try again
- Upgrade your OpenAI plan for higher limits

### Campaign wizard shows error

**Error**: "Error al conectar con el servidor n8n..."

**Checklist**:

- [ ] n8n is running on port 5678
- [ ] Workflow is activated
- [ ] No firewall blocking localhost connections
- [ ] Check browser DevTools → Network tab for failed requests

## Production Deployment

For production, you'll need to deploy n8n to a cloud service:

### Recommended Services

1. **Railway** - One-click n8n deployment
2. **Render** - Free tier available
3. **DigitalOcean** - Docker droplet with n8n
4. **Self-hosted** - VPS with Docker

### Steps for Cloud Deployment

1. Deploy n8n to your chosen service
2. Get the public webhook URL (e.g., `https://your-n8n.railway.app/webhook/virtuads-campaign`)
3. Update `.env` in your frontend:

   ```bash
   VITE_N8N_WEBHOOK_URL=https://your-n8n.railway.app/webhook/virtuads-campaign
   ```

4. Configure HTTPS/SSL for secure webhook communication
5. Add authentication to protect the webhook (see n8n docs)

## Advanced Configuration

### Custom AI Prompt

To modify the AI optimization logic, edit the **AI Agent: Optimizer** node:

1. Click on the node in the workflow editor
2. Find the **Messages** section
3. Edit the system message to change the AI's behavior
4. Save and reactivate the workflow

### Adding More AI Agents

You can extend the workflow with multiple agents:

- **Budget Optimizer** - Analyzes budget allocation
- **Audience Segmentation** - Suggests target audiences
- **Creative Generator** - Creates ad copy suggestions
- **Compliance Checker** - Validates regulatory requirements

Each agent would be a separate OpenAI node in the workflow.

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [VirtuAdsAI GitHub](https://github.com/virtuads-ai)

## Support

For issues or questions:

- Check the [n8n Community](https://community.n8n.io/)
- Review workflow execution logs in n8n UI
- Enable verbose logging: `N8N_LOG_LEVEL=debug n8n start`
