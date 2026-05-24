export * from './types';
export * from './config';
export { agentManager } from './agentManager';

export const initializeAgents = async () => {
  console.log('Initializing project agents...');

  const { agentManager } = await import('./agentManager');
  const { getEnabledAgents } = await import('./config');

  const agents = getEnabledAgents();
  console.log(`Found ${agents.length} enabled agents`);

  return {
    agents,
    manager: agentManager,
  };
};
