const listData = require('../datas/listTodoData');
const _ = require('lodash');

exports.saveList = async (list) => {
    const listSave = [];

    for (const itemList of list) {
        listSave.push(await this.saveUniqueListAndItems(itemList));
    }

    return listSave;
};

exports.saveUniqueListAndItems = async (listObject) => {
    const { name, userId: { id }, items } = listObject;
    const newList = {
        name,
        userId: id
    }

    const listCreadted = await listData.saveList(newList);

    for (const item of items) {
        const result = await this.saveListItem(listCreadted, item);
        item['id'] = result.id;
    }

    listCreadted['items'] = items;

    return listCreadted;
}

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

    for (const list of listTodo) {
        if (list.markAsDelete) {
            for (const item of list.items) {
                await this.deleteTodoListItemById(item.id);
            }
            await this.deleteTodoListById(list.id);
        } else {
            if (isNew(list)) {
                await this.saveUniqueListAndItems(list);
            } else {
                await this.updateListName(list.name, list.id);
                for (const item of list.items) {
                    if (item.markAsDelete) {
                        await this.deleteTodoListItemById(item.id);
                    } else {
                        if (isNew(item)) {
                            await this.saveListItem(list, item);
                        }
                    }
                }
            }
        }
    }

    function isNew(item) {
        return !item.id;
    }

    return await this.getTodoListByUser(userId);
};

exports.deleteTodoListById = async (listId) => {
    return await listData.deleteListById(listId);
}

exports.deleteTodoListItemById = async (itemId) => {
    return await listData.deleteListItemById(itemId);
}

exports.updateListName = async (newName, listId) => {
    return await listData.updateListName(newName, listId);
}


exports.deleteTodoListItems = async (listId) => {
    return await listData.deleteItemsList(listId);
};

exports.deleteTodoListByUser = async (userId) => {
    return await listData.deleteTodoList(userId);
};

