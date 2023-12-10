import { useState } from "react";
import { ItemType } from "../../common/types"

interface IItemProps {
  item: ItemType;
  handleChangeItem: (id: number, item: ItemType) => void;
  handleDeleteItem: (id: number) => void;
}

const Item: React.FC<IItemProps> = (props) => {
  const { id, status, content } = props.item;
  const [editable, setEditable] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(content);
  
  return (
    <>
      <div className={`item ${status}`}>
        
        <div className="status">
          <button
            className={`status_btn ${status}`}
            onClick={() => {
              if (status === 'ACTIVE') {
                props.handleChangeItem(id, { ...props.item, status: 'COMPLETE' });
              } else {
                props.handleChangeItem(id, { ...props.item, status: 'ACTIVE' });
              }
            }}
          />
        </div>
        
        <div className="content">
          {editable ? (
            <input
              type='text'
              value={newContent}
              onChange={(evt) => setNewContent(evt.target.value)}
              onKeyDown={evt => {
                if ( evt.key === 'Enter') {
                  setEditable(false);
                  props.handleChangeItem(id, { ...props.item, content: newContent });
                }
              }}
            />
          ) : (
            <span>{content}</span>
          )}
        </div>

        {status === 'ACTIVE' && (
          <div className="edit">
            <button onClick={() => {
              if (editable) {
                setEditable(false);
                props.handleChangeItem(id, { ...props.item, content: newContent });
              } else {
                setEditable(true);
              }
            }}>
              {editable ? 'Save' : 'Edit'}
            </button>
          </div>
        )}

        <div className="delete">
          <button onClick={() => {
            
            if (editable)
              setEditable(false);

            props.handleDeleteItem(id)
          }}>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </>
  )
}

interface IListProps {
  items: ItemType[];
  handleChangeItem: (id: number, item: ItemType) => void;
  handleDeleteItem: (id: number) => void,
  handleCompleteAll: () => void;
}

export const ItemsList: React.FC<IListProps> = (props) => {
  const { items, handleChangeItem, handleDeleteItem, handleCompleteAll } = props;
  /** states */
  const [currentFilter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETE' >('ALL');

  const filteredItems = items.filter((item) => {
    if (currentFilter === 'ALL')
      return item;
    else if (item.status === currentFilter)
      return item;

    return false;
  })
  
  return (
    <>
      <div id="list" className="block">

        <div id="items">
          {filteredItems.map((item, key) => (
            <Item
              key={key}
              item={item}
              handleChangeItem={handleChangeItem}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </div>

        <div id="toolbar">

          <span id="items-left">{filteredItems.length} items left</span>

          <div id="filters">
            <button
              className={`btn ${currentFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              All
            </button>
            <button
              className={`btn ${currentFilter === 'ACTIVE' ? 'active' : ''}`}
              onClick={() => setFilter('ACTIVE')}
            >
              Active
            </button>
            <button
              className={`btn ${currentFilter === 'COMPLETE' ? 'active' : ''}`}
              onClick={() => setFilter('COMPLETE')}
            >
              Completed
            </button>
          </div>

          <div id="clear">
            <button onClick={handleCompleteAll}>Clear Completed</button>
          </div>

        </div>
      </div>
    </>
  )
}