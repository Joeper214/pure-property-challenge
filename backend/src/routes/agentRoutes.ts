import { Router } from 'express';
import * as agentController from '../controllers/agentController';

const router = Router();

router.get('/', agentController.getAllAgents);
router.get('/:id', agentController.getAgentById);
router.post('/', agentController.upsertAgent);
router.put('/:id', agentController.updateAgent);
router.delete('/:id', agentController.deleteAgent);

export default router;
