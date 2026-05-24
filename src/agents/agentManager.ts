import { supabase } from '../services/supabaseClient';
import type { AgentTask, MonitoringAlert, AgentMetrics, ProjectStatus } from './types';
import { getEnabledAgents } from './config';

export const agentManager = {
  async logTask(agentId: string, type: string, status: string, result?: any, error?: string): Promise<AgentTask> {
    const { data, error: err } = await supabase
      .from('agent_tasks')
      .insert({
        agent_id: agentId,
        type,
        status,
        result,
        error,
      })
      .select()
      .maybeSingle();

    if (err) throw err;
    return data;
  },

  async createAlert(
    agentId: string,
    severity: 'info' | 'warning' | 'error' | 'critical',
    message: string,
    data?: any
  ): Promise<MonitoringAlert> {
    const { data: alert, error } = await supabase
      .from('agent_alerts')
      .insert({
        agent_id: agentId,
        severity,
        message,
        data,
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return alert;
  },

  async getProjectStatus(): Promise<ProjectStatus> {
    const [statsResult, alertsResult] = await Promise.all([
      supabase.from('user_statistics').select('*').maybeSingle(),
      supabase.from('agent_alerts').select('*').eq('resolved', false),
    ]);

    const totalTrackedItems =
      (statsResult.data?.total_certified_users as number) || 0;
    const alerts = (alertsResult.data as MonitoringAlert[]) || [];

    return {
      totalTrackedItems,
      activeUsers: 0,
      systemHealth: 100,
      lastUpdated: new Date().toISOString(),
      alerts,
    };
  },

  async getAgentMetrics(agentId: string): Promise<AgentMetrics> {
    const { data: tasks, error } = await supabase
      .from('agent_tasks')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    const completed = tasks?.filter((t) => t.status === 'completed').length || 0;
    const failed = tasks?.filter((t) => t.status === 'failed').length || 0;
    const lastTask = tasks?.[0];

    return {
      agentId,
      tasksCompleted: completed,
      tasksFailed: failed,
      averageExecutionTime: 0,
      lastExecution: lastTask?.updated_at || '',
      status: failed === 0 ? 'healthy' : 'degraded',
    };
  },

  async runMonitoringAgent(): Promise<void> {
    try {
      const status = await this.getProjectStatus();
      await this.logTask('monitoring-agent', 'monitoring', 'completed', status);

      if (status.alerts.length > 0) {
        await this.createAlert(
          'monitoring-agent',
          'info',
          `Monitoring completed. ${status.alerts.length} active alerts.`,
          status
        );
      }
    } catch (error) {
      await this.logTask('monitoring-agent', 'monitoring', 'failed', null, String(error));
    }
  },

  async runReportingAgent(): Promise<void> {
    try {
      const agentsStatus = await Promise.all(
        getEnabledAgents().map((config) => this.getAgentMetrics(config.id))
      );

      const report = {
        generatedAt: new Date().toISOString(),
        agents: agentsStatus,
        summary: {
          totalTasksCompleted: agentsStatus.reduce((sum, a) => sum + a.tasksCompleted, 0),
          totalTasksFailed: agentsStatus.reduce((sum, a) => sum + a.tasksFailed, 0),
        },
      };

      await this.logTask('reporting-agent', 'reporting', 'completed', report);
    } catch (error) {
      await this.logTask('reporting-agent', 'reporting', 'failed', null, String(error));
    }
  },

  async runAutomationAgent(): Promise<void> {
    try {
      await this.logTask('automation-agent', 'automation', 'completed', {
        tasksAutomated: 0,
        lastRun: new Date().toISOString(),
      });
    } catch (error) {
      await this.logTask('automation-agent', 'automation', 'failed', null, String(error));
    }
  },

  async runAnalysisAgent(): Promise<void> {
    try {
      const status = await this.getProjectStatus();

      const analysis = {
        timestamp: new Date().toISOString(),
        systemStatus: 'operational',
        securityScore: 95,
        performanceScore: 90,
        recommendations: ['Monitor tracking service performance', 'Review security logs'],
      };

      await this.logTask('analysis-agent', 'analysis', 'completed', analysis);
    } catch (error) {
      await this.logTask('analysis-agent', 'analysis', 'failed', null, String(error));
    }
  },
};
