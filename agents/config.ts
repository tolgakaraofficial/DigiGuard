/**
 * DigiGuard Project Center Agent - Configuration
 */

export const AgentConfig = {
  github: {
    owner: 'tolgakaraofficial',
    repo: 'DigiGuard',
    token: process.env.GITHUB_TOKEN || '',
  },

  schedules: {
    projectManager: '0 9 * * *',
    cicd: '*/15 * * * *',
    codeReview: '*/30 * * * *',
    monitoring: '*/5 * * * *',
  },

  thresholds: {
    codeQualityMin: 80,
    deploymentHealthMin: 95,
    uptimeMin: 99.5,
    responseTimeMax: 1000,
  },

  notifications: {
    slack: {
      enabled: false,
      webhook: process.env.SLACK_WEBHOOK || '',
    },
    email: {
      enabled: false,
      recipients: process.env.EMAIL_RECIPIENTS?.split(',') || [],
    },
  },

  logging: {
    level: 'info',
    path: './logs',
    retentionDays: 30,
  },

  features: {
    autoMerge: false,
    autoDeploy: false,
    autoReview: true,
    monitoring: true,
  },
};

export default AgentConfig;
