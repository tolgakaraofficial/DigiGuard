export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  schedule?: string;
  timeout?: number;
}

export interface AgentTask {
  id: string;
  agentId: string;
  type: 'monitoring' | 'automation' | 'reporting' | 'analysis';
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  result?: any;
  error?: string;
}

export interface MonitoringAlert {
  id: string;
  agentId: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  data?: any;
  createdAt: string;
  resolved: boolean;
}

export interface AgentMetrics {
  agentId: string;
  tasksCompleted: number;
  tasksFailed: number;
  averageExecutionTime: number;
  lastExecution: string;
  status: 'healthy' | 'degraded' | 'failed';
}

export interface ProjectStatus {
  totalTrackedItems: number;
  activeUsers: number;
  systemHealth: number;
  lastUpdated: string;
  alerts: MonitoringAlert[];
}
