import Express from 'express';
import getHashedUrl from './getHashedUrl';
import postHashedUrl from './postHashedUrl';
import postCustomizedHashedUrl from './postCustomizedHashedUrl';
import type { Router } from 'express';

const router: Router = Express.Router();

router.get('/tinyurl/:hashed', getHashedUrl);
router.post('/tinyurl', postHashedUrl);
router.post('/customized-tinyurl', postCustomizedHashedUrl);

export default router;
