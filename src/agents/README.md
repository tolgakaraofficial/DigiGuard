# DigiGuard Agent System

The agent system is an autonomous project center management system that automates monitoring, reporting, analysis, and routine tasks across the DigiGuard platform.

## Architecture

The agent system consists of four specialized agents working in coordination:

### 1. Monitoring Agent
- Runs every 30 minutes
- Monitors system health, user activity, and tracking data
- Detects and alerts on anomalies
- Maintains real-time system status

### 2. Reporting Agent
- Runs daily at 09:00 UTC
- Generates comprehensive system reports
- Aggregates agent metrics and statistics
- Provides insights for decision-making

### 3. Automation Agent
- Runs hourly
- Automates routine data synchronization tasks
- Processes batch operations
- Maintains data consistency

### 4. Analysis Agent
- Runs weekly (Sunday 02:00 UTC)
- Performs deep security and performance analysis
- Generates recommendations
- Identifies optimization opportunities

## Components

### Core Files

- **types.ts** - TypeScript interfaces for agent system
- **config.ts** - Agent configurations and schedules
- **agentManager.ts** - Core agent execution and management
- **index.ts** - Main entry point and initialization

### Database Integration

The agent system uses three main tables:

- `agent_tasks` - Logs all task executions with results and errors
- `agent_alerts` - Stores monitoring alerts triggered by agents
- `agent_metrics` - Stores performance metrics for each agent

### Edge Functions

- **agent-executor** - Serverless function that executes agents
  - Endpoint: `{SUPABASE_URL}/functions/v1/agent-executor`
  - Query params: `?agent=monitoring|reporting|automation|analysis|all`
  - Returns: Task execution results

### GitHub Actions Workflows

- **agent-daily-report.yml** - Schedules daily reporting agent
- **agent-monitoring.yml** - Schedules monitoring every 30 minutes

## Usage

### Initialize Agents

```typescript
import { initializeAgents, agentManager } from '@/agents';

const { agents, manager } = await initializeAgents();
```

### Manual Agent Execution

```typescript
import { agentManager } from '@/agents';

// Run specific agent
await agentManager.runMonitoringAgent();
await agentManager.runReportingAgent();
await agentManager.runAutomationAgent();
await agentManager.runAnalysisAgent();
```

### Get Agent Metrics

```typescript
const metrics = await agentManager.getAgentMetrics('monitoring-agent');
console.log(metrics);
// {
//   agentId: 'monitoring-agent',
//   tasksCompleted: 42,
//   tasksFailed: 2,
//   averageExecutionTime: 5230,
//   lastExecution: '2026-05-24T15:30:45Z',
//   status: 'healthy'
// }
```

### Get Project Status

```typescript
const status = await agentManager.getProjectStatus();
console.log(status);
// {
//   totalTrackedItems: 1250,
//   activeUsers: 450,
//   systemHealth: 98,
//   lastUpdated: '2026-05-24T15:35:22Z',
//   alerts: [...]
// }
```

### Create Alerts

```typescript
await agentManager.createAlert(
  'monitoring-agent',
  'warning',
  'High CPU usage detected',
  { cpu: 85, threshold: 80 }
);
```

## Monitoring Dashboard

The `AgentDashboard` component displays real-time agent status:

```typescript
import { AgentDashboard } from '@/components/AgentDashboard';

export function MonitoringPage() {
  return <AgentDashboard />;
}
```

Features:
- Real-time agent status (healthy, degraded, failed)
- Task completion counts
- Active alerts
- Last execution time

## Database Schema

### agent_tasks
```sql
- id (uuid, primary key)
- agent_id (text) - References the agent that executed the task
- type (text) - Task type: monitoring, automation, reporting, analysis
- status (text) - Task status: pending, running, completed, failed
- result (jsonb) - Task execution result
- error (text) - Error message if task failed
- created_at (timestamptz)
- updated_at (timestamptz)
```

### agent_alerts
```sql
- id (uuid, primary key)
- agent_id (text) - Agent that triggered the alert
- severity (text) - Alert severity: info, warning, error, critical
- message (text) - Alert message
- data (jsonb) - Additional alert data
- resolved (boolean) - Whether alert has been resolved
- created_at (timestamptz)
- resolved_at (timestamptz)
```

## Troubleshooting

### Agent Not Running

1. Check agent is enabled in `config.ts`
2. Verify Supabase connection in Edge Function
3. Check GitHub Actions secrets are configured
4. Review agent task logs in `agent_tasks` table

### High Error Rate

1. Check `agent_tasks` table for error messages
2. Review Edge Function logs
3. Verify Supabase database connectivity
4. Check for RLS policy issues

### Missed Schedules

1. Verify GitHub Actions is enabled
2. Check workflow YAML syntax
3. Confirm Supabase credentials in secrets
4. Review GitHub Actions logs

## Security

- All agent operations are logged in `agent_tasks`
- Row Level Security (RLS) is enabled on all agent tables
- Edge Functions use service role key for database access
- All data access is logged and auditable

## Performance

- Agents use indexed queries for efficiency
- Agent tasks are limited to 100 records per query
- Monitoring runs every 30 minutes (configurable)
- Weekly analysis prevents performance degradation

## Future Enhancements

- Real-time agent communication protocol
- Advanced machine learning analysis
- Predictive alerting system
- Custom agent plugins
- Multi-region agent coordination
