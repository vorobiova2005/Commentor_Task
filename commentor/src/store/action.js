export const insertNode = (folderId, item) => ({
    type: 'INSERT_NODE',
    payload: { folderId, item },
});