const router = require('express').Router();
import { postController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

/**
 * @route Post /api/post
 * @desc Create a new post
 * @access Private
 */
router.post('/', verifyToken, postController.createPost);

/**
 * @route Get /api/post
 * @desc Get all posts of Current User
 * @access Private
 */
router.get('/', verifyToken, postController.getPosts);

/**
 * @route Put /api/post/:id
 * @desc Update a post
 * @access Private
 */
router.put('/:id', verifyToken, postController.updatePost);

/**
 * @route Delete /api/post/:id
 * @desc Delete post
 * @access Private
 */
router.delete('/:id', verifyToken, postController.deletePost);

module.exports = router;
