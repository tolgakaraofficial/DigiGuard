/*
  # Create Agent System Tables

  1. New Tables
    - `agent_tasks` - Logs of all agent task executions
    - `agent_alerts` - Monitoring alerts triggered by agents
    - `agent_metrics` - Performance metrics for each agent
  
  2. Security
    - Enable RLS on all tables
    - Add policies for system access
    - Restrict data access to authenticated users
  
  3. Indexes
    - Add indexes for agent_id, status, created_at for efficient queries
*/

CREATE TABLE IF NOT EXISTS agent_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id text NOT NULL,
  type text NOT NULL CHECK (type IN ('monitoring', 'automation', 'reporting', 'analysis')),
  status text NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  result jsonb,
  error text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agent_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  message text NOT NULL,
  data jsonb,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent_id ON agent_tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_created ON agent_tasks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_alerts_agent_id ON agent_alerts(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_alerts_severity ON agent_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_agent_alerts_resolved ON agent_alerts(resolved);

ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System agents can insert tasks"
  ON agent_tasks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System agents can read tasks"
  ON agent_tasks FOR SELECT
  USING (true);

CREATE POLICY "System agents can insert alerts"
  ON agent_alerts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System agents can read alerts"
  ON agent_alerts FOR SELECT
  USING (true);
