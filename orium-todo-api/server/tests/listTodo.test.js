const crypto = require('crypto');
const axios = require('axios/dist/node/axios.cjs');
const listTodoService = require('../services/listTodoService');
const userService = require('../services/usersService');

test('Should create a todo list', async () => {
    const { resPostTodoList, authenticateUser } = await createTodoList();
    expect(authenticateUser.token).toBeDefined();

    expect(resPostTodoList.data.result.length).toBe(2);

    for (const list of resPostTodoList.data.result) {
        expect(list.id).toBeDefined();
    }

    clearDatasTest(resPostTodoList, authenticateUser);
});

test('Should get todo list by user', async () => {
    const { resPostTodoList, authenticateUser } = await createTodoList();

    const resGetTodoList = await requestApi(`list-todo/${authenticateUser.user.id}`, 'get', undefined, { 'Authorization': `Bearer ${authenticateUser.token}` });

    expect(resGetTodoList.data.result.length).toBe(resPostTodoList.data.result.length);
    for (let index = 0; index < resPostTodoList.length; inde++) {
        expect(resPostTodoList.data.result[index].list_id).toBe(resPostTodoList.data.result[index].id);
    }

    clearDatasTest(resPostTodoList, authenticateUser);
});

test('Should update a todo list', async () => {
    const nameListUpdate = 'Test Update';
    const newItem = 'Item test update';
    const { resPostTodoList, authenticateUser } = await createTodoList();

    const todoListModel = toModelList(resPostTodoList, authenticateUser);
    todoListModel[0].items.push({ item: newItem });
    todoListModel[0].name = nameListUpdate;

    const resUpdateList = await requestApi(`list-todo/${authenticateUser.user.id}`, 'put', todoListModel, { 'Authorization': `Bearer ${authenticateUser.token}` });

    const { result } = resUpdateList.data;
    const indexLastItem = result[0].items.length - 1;
    expect(result[0].name).toBe(nameListUpdate);
    expect(result[0].items[indexLastItem].item).toBe(newItem);
    expect(result[0].items[indexLastItem].id).toBeDefined();

    clearDatasTest(resUpdateList, authenticateUser);
});



const generateString = (lengthString) => {
    return crypto.randomBytes(lengthString).toString('hex');
};

const requestApi = async (path, method, data, headers) => {
    return await axios({ url: `http://localhost:3001/api/${path}`, method, data, headers });
};

const createAuthenticateUser = async () => {
    const email = generateString(10);
    const password = generateString(4)
    await userService.saveUser({ email, password });

    const { data } = await requestApi('users/authenticate', 'post', { email, password });

    return data;
};

const createTodoList = async () => {
    const authenticateUser = await createAuthenticateUser();

    const newTodoList = [
        {
            "name": generateString(12),
            "userId": {
                "id": authenticateUser.user.id,
                "email": authenticateUser.user.email
            },
            "items": [
                {
                    "item": generateString(14)
                },
                {
                    "item": generateString(12)
                }
            ]
        },
        {
            "name": generateString(10),
            "userId": {
                "id": authenticateUser.user.id,
                "email": authenticateUser.user.email
            },
            "items": [
                {
                    "item": generateString(8)
                },
                {
                    "item": generateString(18)
                }
            ]
        }
    ];

    const resPostTodoList = await requestApi('list-todo', 'post', newTodoList, { 'Authorization': `Bearer ${authenticateUser.token}` });

    return { resPostTodoList, authenticateUser };
};

const clearDatasTest = async (resPostTodoList, authenticateUser) => {
    for (const list of resPostTodoList.data.result) {
        await listTodoService.deleteTodoListItems(list.id);
    }
    await listTodoService.deleteTodoListByUser(authenticateUser.user.id);
    await userService.deleteUserById(authenticateUser.user.id);
}

const toModelList = (list, authenticateUser) => {
    const { data } = list;
    const listModel = [];
    for (const itemList of data.result) {
        const { id, name, users_id, items } = itemList
        listModel.push({
            id,
            name,
            userId: authenticateUser.user,
            items: toModelListItem(items)
        })
    }
    return listModel;
};

const toModelListItem = (listItem) => {
    const itemsList = [];
    for (const itemObj of listItem) {
        const { id, list_id, item } = itemObj;
        itemsList.push({
            id,
            item,
            listId: list_id
        });
    }
    return itemsList;
};