import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const formattedData = data.map(item => ({
        id: item.id.toString(),
        content: item.title,
      }));
      setItems(formattedData);
    };

    fetchItems();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyleType: 'none', padding: 0 }}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      padding: '16px',
                      margin: '8px 0',
                      backgroundColor: 'lightgray',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxShadow: provided.isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                    }}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
