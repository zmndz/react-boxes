import React from 'react';
import './boxes.css';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";

function Boxes() {
  interface itemsType {
    id: number;
    name: string;
  }

  const [items, setItems] = React.useState<Array<itemsType>>([]);

  function addBox() {
    if (items.length >= 12) {
      return false;
    }

    let lastId: number = 1;
    let largestId: number = lastId;

    if (items.length) {
      items.map((item) => {
        return largestId =  item.id > largestId ? item.id : largestId;
      })
      lastId = largestId + 1;
    }

    let result = [
      ...items,
      {id: lastId, name: 'User ' + lastId}
    ]

    return setItems(result);
  }

  function removeBox(boxId:number) {
    let updateList = items.filter((item) => {
      return item.id !== boxId
    })

    return setItems([...updateList]);
  }

  function onChange(sourceId:string, sourceIndex:number, targetIndex:number) {
    const result = swap(items, sourceIndex, targetIndex);
    return setItems(result);
  }

  function getBoxPerRow() {
    let length = items.length;
    if (length <= 12 && length >= 10) {
      return 4;
    } else if (length <= 9 && length >= 5) {
      return 3;
    } else if (length <= 4 && length >= 2) {
      return 2;
    } else {
      return 1;
    }
  }

  function getRowHeight() {
    let length = items.length;
    if (length <= 12 && length >= 7) {
      return 240;
    } else if (length <= 6 && length >= 5) {
      return 360;
    } else if (length <= 4 && length >= 2) {
      return 360;
    } else {
      return 720;
    }
  }
    
  return (
    <div>
      <div className="title">
        UniClient
      </div>
       {
         items.length 
         ? <GridContextProvider onChange={onChange}>
            <div className="container">
              <GridDropZone
                className="dropzone"
                id="dropzone"
                boxesPerRow={getBoxPerRow()}
                rowHeight={getRowHeight()}
              >
                {items.map(item => (
                  <GridItem key={item.name}>
                    <div className="grid-item">
                      <div className="grid-item-content">
                        <div className="grid-item-remove" onClick={() => removeBox(item.id)}>
                          x
                        </div>
                        <div className="grid-item-name">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </GridItem>
                ))}
              </GridDropZone>
            </div>
          </GridContextProvider>
          : <div className="empty">Click on + button to add new box</div>
       }
      <div className="add-box__wrapper">
          <div className="add-box" onClick={addBox}>
            +
          </div>
      </div>
    </div>
  );
}

export default Boxes;
