import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Agent } from '../types/agent';
import * as agentStore from '../store/agentStore';

export const getAllAgents = (req: Request, res: Response) => {
  res.json(agentStore.getAllAgents());
};

export const getAgentById = (req: Request, res: Response) => {
  const agent = agentStore.getAgentById(req.params.id);
  if (!agent) {
    return res.status(404).json({ message: 'Agent not found' });
  }
  res.json(agent);
};

export const createAgent = (req: Request, res: Response) => {
  const { firstName, lastName, email, mobileNumber } = req.body;

  if (!firstName || !lastName || !email || !mobileNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  if (agentStore.findAgentByEmail(email)) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const now = Date.now();
  const newAgent: Agent = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    mobileNumber,
    createdAt: now,
    updatedAt: now,
  };

  agentStore.addAgent(newAgent);
  res.status(201).json(newAgent);
};

export const upsertAgent = (req: Request, res: Response) => {
    const { id, firstName, lastName, email, mobileNumber } = req.body;

    if (!firstName || !lastName || !email || !mobileNumber) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (id) {
        const existingAgent = agentStore.getAgentById(id);
        if (existingAgent) {
            if (agentStore.findAgentByEmail(email) && agentStore.findAgentByEmail(email)?.id !== id) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            const updatedAgent = agentStore.updateAgent(id, { firstName, lastName, email, mobileNumber });
            return res.json(updatedAgent);
        }
    }
    
    if (agentStore.findAgentByEmail(email)) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    const now = Date.now();
    const newAgent: Agent = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        mobileNumber,
        createdAt: now,
        updatedAt: now,
    };

    agentStore.addAgent(newAgent);
    res.status(201).json(newAgent);
};

export const updateAgent = (req: Request, res: Response) => {
  const { firstName, lastName, email, mobileNumber } = req.body;
  
  if (!firstName || !lastName || !email || !mobileNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const existingAgent = agentStore.getAgentById(req.params.id);
  if (!existingAgent) {
    return res.status(404).json({ message: 'Agent not found' });
  }

  if (agentStore.findAgentByEmail(email) && agentStore.findAgentByEmail(email)?.id !== req.params.id) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const updatedAgent = agentStore.updateAgent(req.params.id, { firstName, lastName, email, mobileNumber });
  res.json(updatedAgent);
};

export const deleteAgent = (req: Request, res: Response) => {
  const deleted = agentStore.deleteAgent(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Agent not found' });
  }
  res.status(204).send();
};
