import { useEffect, useState } from "react";
import { ItemType } from "./common/types";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { ItemsList } from "./components/ItemsList";

const preparedData: ItemType[] = [
  {
    id: 1,
    status: 'ACTIVE',
    content: 'Learn'
  }, 
  {
    id: 2,
    status: 'COMPLETE',
    content: 'Work'
  },
  {
    id: 3,
    status: 'COMPLETE',
    content: 'Sleep'
  }
]

const App = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {

    const cacheItems = window.localStorage.getItem('cache-items');

    if (!loaded) {

      if (cacheItems) {
        const jsonItems = JSON.parse(cacheItems);

        if (jsonItems) setItems(jsonItems)

        else setItems(preparedData);
      } else {
        setItems(preparedData);
        window.localStorage.setItem('cache-items', JSON.stringify(preparedData));
      }

      setLoaded(true);
    } else {

      if (cacheItems !== JSON.stringify(items))
        window.localStorage.setItem('cache-items', JSON.stringify(items));
    }
  }, [loaded, items])

  const handleCompleteAllItems = () => {
    setItems(items.map((item) => {
      if (item.status !== 'COMPLETE')
        return { ...item, status: 'COMPLETE' };

      return item;
    }))
  }

  const handleChangeItemInList = (id: number, newItem: ItemType) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        return newItem;
      }

      return item;
    }))
  }

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item, key) => item.id !== id));
  }

  const handleCreate = (text: string) => {

    if (items.length > 0) {
      const lastId = items.sort((a, b) => a.id - b.id)[items.length - 1].id;

      setItems([...items, { id: lastId + 1, content: text, status: 'ACTIVE' }]);
    } else {
      setItems([{ id: 1, content: text, status: 'ACTIVE' }]);
    }
  }

  return (
    <>
      <div id="centered">
        
        <Header />

        <Form
          handleSaveTask={handleCreate}
        />

        <ItemsList
          items={items}
          handleCompleteAll={handleCompleteAllItems}
          handleChangeItem={handleChangeItemInList}
          handleDeleteItem={handleDeleteItem}
        />

      </div>
    </>
  )
}

export default App;