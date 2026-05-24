/**
 * DigiGuard Project Center Agent - Type Definitions
 * Tüm Agent'lerin tip tanımları
 */

export interface AgentConfig {
  name: string;
  version: string;
  enabled: boolean;
  schedule?: string;
  timeout: number;
}

export interface ProjectMetrics {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
  openPRs: number;
  mergedPRs: number;
  failedTests: number;
  codeQualityScore: number;
  deploymentHealth: number;
}

export interface TaskStatus {
  taskId: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  message: string;
  timestamp: Date;
  duration: number;
}

export interface IssueMetadata {
  id: string;
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: string[];
  assignees: string[];
  milestone?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
}

export interface PRMetadata {
  id: string;
  number: number;
  title: string;
  state: 'open' | 'closed' | 'merged';
  author: string;
  reviewers: string[];
  status: 'draft' | 'pending_review' | 'approved' | 'changes_requested' | 'merged';
  createdAt: Date;
  updatedAt: Date;
  mergedAt?: Date;
}

export interface CIStatus {
  workflowId: string;
  workflowName: string;
  status: 'pending' | 'in_progress' | 'success' | 'failure';
  conclusion?: string;
  runNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeQualityReport {
  totalFiles: number;
  filesAnalyzed: number;
  issues: CodeIssue[];
  score: number;
  timestamp: Date;
}

export interface CodeIssue {
  file: string;
  line: number;
  severity: 'info' | 'warning' | 'error';
  message: string;
  rule: string;
}

export interface DeploymentEvent {
  deploymentId: string;
  environment: string;
  status: 'pending' | 'success' | 'failure' | 'in_progress';
  version: string;
  timestamp: Date;
  duration: number;
}

export interface AgentReport {
  agentName: string;
  timestamp: Date;
  tasks: TaskStatus[];
  metrics: ProjectMetrics;
  recommendations: string[];
  errors: string[];
}
