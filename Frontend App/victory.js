import React, { useState } from 'react';
import { VictoryChart, VictoryScatter, VictoryZoomContainer } from 'victory';

const CustomChart = ({ data, maxPoints }) => {
  const [zoomedXDomain, setZoomedXDomain] = useState([data[0].x, data[data.length - 1].x]);

  const entireDomain = {
    x: [data[0].x, data[data.length - 1].x],
    y: [Math.min(...data.map(d => d.y)), Math.max(...data.map(d => d.y))]
  };

  const onDomainChange = domain => {
    setZoomedXDomain(domain.x);
  };

  const getData = () => {
    const filteredData = data.filter(d => d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]);

    if (filteredData.length > maxPoints) {
      const k = Math.ceil(filteredData.length / maxPoints);
      return filteredData.filter((d, i) => i % k === 0);
    }

    return filteredData;
  };

  const getZoomFactor = () => {
    const { zoomedXDomain } = state;
    const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
    return Math.round(factor, factor < 3 ? 1 : 0);
  };
  

  const renderedData = getData();

  return (
    <div>
      <VictoryChart domain={entireDomain} containerComponent={
        <VictoryZoomContainer
          zoomDimension="x"
          onZoomDomainChange={onDomainChange}
          minimumZoom={{ x: 1 / 10000 }}
        />
      }>
        <VictoryScatter data={renderedData} />
      </VictoryChart>
      <div>
        {getZoomFactor()}x zoom;
        rendering {renderedData.length} of {data.length}
      </div>
    </div>
  );
};

export default CustomChart;