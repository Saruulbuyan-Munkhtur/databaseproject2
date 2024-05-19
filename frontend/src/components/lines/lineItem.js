import React from 'react';
import './lines.css';


const colorMap = {
  绿色: 'Green',
  暗橙色: 'Orange',
  天蓝色: 'Blue',
  红色: 'Red',
  紫色: 'Purple',
  薄荷绿: 'mediumaquamarine',
  靛青色: 'darkblue',
  湖绿色: 'Green',
  深蓝色: 'Blue',
  浅蓝色: 'lightskyblue',
  灰茶色: 'Gray',
  粉红色: 'Pink',
  紫红色: 'Indigo',
  淡紫色: 'plum',
  淡黄色: 'khaki',
};

const LineItem = ({ line, onSelect }) => {
  const translatedColor = colorMap[line.color] || line.color;
  console.log("line item lineName: ", line.line_name)
  return (
    <div className="line-item" onClick={() => onSelect(line)}>
      <div className="line-icon">
        <i className="fas fa-subway"></i>
      </div>
      <div className="line-details">
        <div className="line-name" style={{ backgroundColor: translatedColor }}>
          {line.line_name}
        </div>
        <div className="line-info">
          <div className="line-mileage">
            <i className="fas fa-route"></i> {line.mileage} miles
          </div>
          <div className="line-opening">
            <i className="fas fa-calendar-alt"></i> Opened: {line.first_opening}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineItem;