const initialState = {
    commentsData: { id: 1, items: [] },
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INSERT_NODE':
        return {
          ...state,
          commentsData: insertNodeReducer(state.commentsData, action.payload),
        };
      default:
        return state;
    }
  };
  
  const insertNodeReducer = (tree, { folderId, item }) => {
    if (tree.id === folderId) {
      return {
        ...tree,
        items: [
          ...tree.items,
          {
            id: new Date().getTime(),
            name: item,
            items: [],
          },
        ],
      };
    }
  
    const updatedItems = tree.items.map((ob) => insertNodeReducer(ob, { folderId, item }));
  
    return { ...tree, items: updatedItems };
  };
  
  export default rootReducer;