const database = require('../infra/database');

exports.saveList = (list) => {
    return database.one('insert into todo.list (name, users_id) values ($1, $2) returning *', [list.name, list.userId]);
};

exports.saveListItems = (list, listItem) => {
    return database.one('insert into todo.list_item (item, list_id) values($1, $2)  returning *', [listItem.item, list.id]);
};

exports.getListTodoByUser = (userId) => {
    return database.query(`
        select name, l.date_created list_dt, l.id list_id, item, li.id item_id
        from todo.list l 
        inner join todo.list_item li on l.id = li.list_id
        where users_id = $1`, [userId]
    );
};

exports.deleteItemsList = (listId) => {
    return database.none('delete from todo.list_item where list_id = $1', [listId]);
};

exports.deleteListItemById = (id) => {
    return database.none('delete from todo.list_item where id = $1', [id]);
}

exports.updateListName = (newName, listId) => {
    return database.none('update todo.list set name = $1 where id = $2', [newName, listId]);
}

exports.deleteListById = (id) => {
    return database.none('delete from todo.list where id = $1', [id]);
}

exports.deleteTodoList = (userId) => {
    return database.none('delete from todo.list where users_id = $1', [userId]);
}
