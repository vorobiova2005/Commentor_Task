import { useDispatch, useSelector } from 'react-redux';
import { insertNode } from './store/action';
import Comment from './components/Comment';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const commentsData = useSelector((state) => state.commentsData);

  const handleInsertNode = (folderId, item) => {
    dispatch(insertNode(folderId, item));
  };

  return (
    <div className="App">
      <Comment
        handleInsertNode={handleInsertNode}
        comment={commentsData}
      />
    </div>
  );
};

export default App;