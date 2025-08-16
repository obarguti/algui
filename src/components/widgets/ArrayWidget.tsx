import React from 'react';
import './ArrayWidget.scss';


export interface ArrayWidgetConfig {
  boxWidth?: number;
  boxHeight?: number;
  showIndices?: boolean;
  colors?: string[];
}

export interface ArrayWidgetProps {
  data: number[];
  className?: string;
  config?: ArrayWidgetConfig;
}


export const ArrayWidget: React.FC<ArrayWidgetProps> = ({
  data,
  className = '',
  config = {},
}) => {
  const {
    boxWidth = 48,
    boxHeight = 48,
    showIndices = true,
    colors = [],
  } = config;

  return (
    <div className={`array-widget ${className}`}>
      <div className="array-row">
        {data.map((value, idx) => (
          <div
            className="array-box"
            style={{
              width: boxWidth,
              height: boxHeight,
              backgroundColor: colors[idx] || undefined,
            }}
            key={idx}
          >
            <span className="array-value">{value}</span>
          </div>
        ))}
      </div>
      {showIndices && (
        <div className="array-indices">
          {data.map((_, idx) => (
            <span className="array-index" key={idx}>{idx}</span>
          ))}
        </div>
      )}
    </div>
  );
};
