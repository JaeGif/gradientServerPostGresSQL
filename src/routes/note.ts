import express from 'express';
const router = express.Router();
import * as noteController from '../controllers/note';
router.get('/notes', noteController.notes_get);
router.get('/notes/:id', noteController.note_get);
router.post('/notes', noteController.note_post);
router.delete('/notes/:id', noteController.note_delete);

router.put('/notes/:id', noteController.note_put);

export default router;
