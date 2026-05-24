import type { AgentConfig } from './types';

export const agentConfigs: Record<string, AgentConfig> = {
  monitoring: {
    id: 'monitoring-agent',
    name: 'Monitoring Agent',
    description: 'Monitors system health, user activity, and tracking data',
    enabled: true,
    schedule: '*/5 * * * *',
    timeout: 60000,
  },
  reporting: {
    id: 'reporting-agent',
    name: 'Reporting Agent',
    description: 'Generates daily reports and analytics summaries',
    enabled: true,
    schedule: '0 9 * * *',
    timeout: 120000,
  },
  automation: {
    id: 'automation-agent',
    name: 'Automation Agent',
    description: 'Automates routine tasks and data synchronization',
    enabled: true,
    schedule: '0 * * * *',
    timeout: 90000,
  },
  analysis: {
    id: 'analysis-agent',
    name: 'Analysis Agent',
    description: 'Performs security and performance analysis',
    enabled: true,
    schedule: '0 2 * * 0',
    timeout: 300000,
  },
};

export const getAgentConfig = (agentId: string): AgentConfig | undefined => {
  return Object.values(agentConfigs).find((config) => config.id === agentId);
};

export const getEnabledAgents = (): AgentConfig[] => {
  return Object.values(agentConfigs).filter((config) => config.enabled);
};
