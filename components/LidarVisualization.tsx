
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Point } from '../types';

const SCENES = {
  URBAN: 'Urban Street',
  FOREST: 'Forest Trail',
  OPEN: 'Open Field',
};

const generatePointsForScene = (scene: string, width: number, height: number): Point[] => {
  const points: Point[] = [];
  const centerX = width / 2;
  const centerY = height / 2;

  switch (scene) {
    case SCENES.URBAN:
      // Rectangular buildings
      for (let i = 0; i < 4; i++) {
        const buildingX = Math.random() * width * 0.4 + width * 0.1;
        const buildingY = Math.random() * height * 0.4 + height * 0.1;
        const buildingW = Math.random() * 80 + 50;
        const buildingH = Math.random() * 80 + 50;
        for (let j = 0; j < 100; j++) {
            if (Math.random() > 0.5) {
                points.push({ x: buildingX + Math.random() * buildingW, y: buildingY });
            } else {
                points.push({ x: buildingX, y: buildingY + Math.random() * buildingH });
            }
        }
      }
      break;
    case SCENES.FOREST:
      // Scattered clusters for trees
      for (let i = 0; i < 20; i++) {
        const clusterX = Math.random() * width;
        const clusterY = Math.random() * height;
        const clusterRadius = Math.random() * 30 + 10;
        for (let j = 0; j < 30; j++) {
          const angle = Math.random() * 2 * Math.PI;
          const radius = Math.random() * clusterRadius;
          points.push({ x: clusterX + Math.cos(angle) * radius, y: clusterY + Math.sin(angle) * radius });
        }
      }
      break;
    case SCENES.OPEN:
      // Few random points
      for (let i = 0; i < 50; i++) {
        points.push({ x: Math.random() * width, y: Math.random() * height });
      }
      break;
  }
  return points.filter(p => Math.sqrt((p.x - centerX)**2 + (p.y - centerY)**2) < Math.min(width, height) / 2.2);
};

const LidarVisualization: React.FC = () => {
  const [scene, setScene] = useState<string>(SCENES.URBAN);
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
        if (entries[0]) {
            const { width } = entries[0].contentRect;
            setDimensions({ width, height: width }); // maintain aspect ratio 1:1
        }
    });
    const parent = d3Container.current?.parentElement;
    if (parent) {
        resizeObserver.observe(parent);
    }
    return () => {
        if (parent) {
            resizeObserver.unobserve(parent);
        }
    };
  }, []);

  useEffect(() => {
    if (!d3Container.current) return;

    const { width, height } = dimensions;
    const svg = d3.select(d3Container.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'rgba(17, 24, 39, 0.8)') // bg-gray-900 with opacity
      .style('border-radius', '0.5rem');

    svg.selectAll("*").remove(); // Clear previous render

    const points = generatePointsForScene(scene, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    const g = svg.append('g');

    // Draw points
    g.selectAll('circle.point')
      .data(points)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 1.5)
      .style('fill', '#22d3ee') // cyan-400
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay((_, i) => i * 2)
      .style('opacity', 0.8);

    // Draw scanner (car)
    g.append('rect')
      .attr('x', centerX - 8)
      .attr('y', centerY - 15)
      .attr('width', 16)
      .attr('height', 30)
      .attr('fill', '#f0f9ff') // slate-50
      .attr('rx', 4)
      .attr('ry', 4);

    // Rotating scan line
    const scanLine = g.append('line')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', centerX)
        .attr('y2', 0)
        .attr('stroke', 'rgba(34, 211, 238, 0.5)')
        .attr('stroke-width', 2);

    const rotateScan = () => {
        scanLine.transition()
            .ease(d3.easeLinear)
            .duration(3000)
            .attrTween('transform', () => d3.interpolateString(`rotate(0, ${centerX}, ${centerY})`, `rotate(360, ${centerX}, ${centerY})`))
            .on('end', rotateScan);
    };
    rotateScan();

  }, [scene, dimensions]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
      <div className="flex justify-center mb-4 space-x-2">
        {Object.values(SCENES).map(s => (
          <button
            key={s}
            onClick={() => setScene(s)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              scene === s ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <svg ref={d3Container} className="w-full h-auto" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} />
      </div>
    </div>
  );
};

export default LidarVisualization;
