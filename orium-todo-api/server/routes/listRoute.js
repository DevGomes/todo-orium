const express = require('express');
const router = express.Router();
const listTodoService = require('../services/listTodoService');
const auth = require('../middlewares/authentication')

router.get('/list-todo/:userId', auth, async (req, res) => {
    const {userId} = req.params;
    const listTodo = await listTodoService.getTodoListByUser(userId);
    res.status(200).send({result: listTodo});
});

router.post('/list-todo', auth, async (req, res) => {
    const listTodo = req.body;
    const newListTodo = await listTodoService.saveList(listTodo);
    res.status(200).send({result: newListTodo}); 
});

router.put('/list-todo/:userId', auth, async (req, res) => {
    const { userId } = req.params;
    const listTodo = req.body;

    const updateListTodo = await listTodoService.updateList(userId, listTodo);
    res.status(200).send({result: updateListTodo});
});

module.exports = router;
