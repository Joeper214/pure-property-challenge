import { Agent } from '../types/agent';

let agents: Agent[] = [];

export const getAllAgents = (): Agent[] => {
  return agents;
};

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id);
};

export const addAgent = (agent: Agent): Agent => {
  agents.push(agent);
  return agent;
};

export const updateAgent = (id: string, updatedAgent: Partial<Agent>): Agent | undefined => {
  const agentIndex = agents.findIndex(agent => agent.id === id);
  if (agentIndex === -1) {
    return undefined;
  }
  agents[agentIndex] = { ...agents[agentIndex], ...updatedAgent, updatedAt: Date.now() };
  return agents[agentIndex];
};

export const deleteAgent = (id: string): boolean => {
  const initialLength = agents.length;
  agents = agents.filter(agent => agent.id !== id);
  return agents.length < initialLength;
};

export const findAgentByEmail = (email: string): Agent | undefined => {
    return agents.find(agent => agent.email === email);
};
