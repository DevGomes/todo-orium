const listData = require('../datas/listTodoData');
const _ = require('lodash');

exports.saveList = async (list) => {
    const listSave = [];

    for (const itemList of list) {
        const { name, userId: { id }, items } = itemList;
        const newList = {
            name,
            userId: id
        }

        const listCreadted = await listData.saveList(newList);

        for (const item of items) {
            const result = await this.saveListItem(listCreadted, item);
            item['id'] = result.id;
        };

        listCreadted['items'] = items;
        listSave.push(listCreadted);
    }

    return listSave;
};

exports.saveListItem = (list, listItem) => {
    return listData.saveListItems(list, listItem);
};

exports.getTodoListByUser = async (userId) => {
    const result = await listData.getListTodoByUser(userId)
    return _.chain(result)
        .groupBy("list_id")
        .map((value, key) => ({ list_id: key, list_item: value }))
        .value();
};

exports.updateList = async (userId, listTodo) => {

    const userList = await this.getTodoListByUser(userId);

    for (const list of userList) {
        const { list_id } = list;
        await this.deleteTodoListItems(list_id);
    }

    await this.deleteTodoListByUser(userId);

    return await this.saveList(listTodo);
};

exports.deleteTodoListItems = async (listId) => {
    return await listData.deleteItemsList(listId);
};

exports.deleteTodoListByUser = async (userId) => {
    return await listData.deleteTodoList(userId);
};

