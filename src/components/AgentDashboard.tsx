import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertCircle, Zap, BarChart3 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import type { AgentMetrics, MonitoringAlert } from '../agents/types';

interface AgentStatus {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'failed';
  lastRun: string;
  metrics: AgentMetrics;
}

export const AgentDashboard: React.FC = () => {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [alerts, setAlerts] = useState<MonitoringAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentStatus();
    const interval = setInterval(fetchAgentStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAgentStatus = async () => {
    try {
      const agentIds = ['monitoring-agent', 'reporting-agent', 'automation-agent', 'analysis-agent'];
      const agentNames: Record<string, string> = {
        'monitoring-agent': 'Monitoring',
        'reporting-agent': 'Reporting',
        'automation-agent': 'Automation',
        'analysis-agent': 'Analysis',
      };

      const statuses: AgentStatus[] = [];

      for (const agentId of agentIds) {
        const { data: tasks } = await supabase
          .from('agent_tasks')
          .select('*')
          .eq('agent_id', agentId)
          .order('created_at', { ascending: false })
          .limit(50);

        const completed = tasks?.filter((t) => t.status === 'completed').length || 0;
        const failed = tasks?.filter((t) => t.status === 'failed').length || 0;
        const lastTask = tasks?.[0];

        statuses.push({
          id: agentId,
          name: agentNames[agentId],
          status: failed === 0 && completed > 0 ? 'healthy' : failed > 0 ? 'degraded' : 'failed',
          lastRun: lastTask?.updated_at || 'Never',
          metrics: {
            agentId,
            tasksCompleted: completed,
            tasksFailed: failed,
            averageExecutionTime: 0,
            lastExecution: lastTask?.updated_at || '',
            status: failed === 0 ? 'healthy' : 'degraded',
          },
        });
      }

      const { data: alertsData } = await supabase
        .from('agent_alerts')
        .select('*')
        .eq('resolved', false)
        .order('created_at', { ascending: false })
        .limit(10);

      setAgents(statuses);
      setAlerts((alertsData as MonitoringAlert[]) || []);
    } catch (error) {
      console.error('Failed to fetch agent status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Activity className="h-8 w-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-cyan-400" />
        <h2 className="text-lg font-semibold text-white">Agent System Status</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(agent.status)}
                <div>
                  <p className="font-semibold text-white">{agent.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{agent.status}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <p className="text-xs text-slate-400">Completed</p>
                <p className="text-lg font-bold text-green-400">{agent.metrics.tasksCompleted}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Failed</p>
                <p className="text-lg font-bold text-red-400">{agent.metrics.tasksFailed}</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Last: {new Date(agent.lastRun).toLocaleString('tr-TR')}
            </p>
          </div>
        ))}
      </div>

      {alerts.length > 0 && (
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <h3 className="font-semibold text-white">Active Alerts</h3>
          </div>

          <div className="space-y-2">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="bg-slate-700/30 rounded p-2">
                <p className="text-sm text-slate-200">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(alert.created_at).toLocaleString('tr-TR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
