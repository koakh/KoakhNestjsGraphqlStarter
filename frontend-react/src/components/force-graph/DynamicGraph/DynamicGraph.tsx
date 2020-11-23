import React, { useCallback, useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { graphData } from '../../../app/config';
import { useStateValue } from '../../../app/state';
import SpriteText from 'three-spritetext';

type Props = {};
// TODO: move to types
export type Node = { id: number, label: string, nodeVal?: number, desc?: string, color?: NodeColor | string, autoColorBy?: string, group?: NodeType | string };
export type Link = { source: number, target: number, label?: string, desc?: string, color?: string, autoColorBy?: string, width?: number, group?: TransactionType };
export interface IState { nodes: Node[], links: Link[] };
export enum NodeType { GENESIS, PARTICIPANT, PERSON, CAUSE, ASSET, TRANSACTION };
export enum TransactionType { FUNDS, GOODS, VOLUNTARY_HOURS, SERVICE };
export enum NodeColor { WHITE = '#ffffff', RED = '#ff0000', ORANGE = '#ffa500', YELLOW = '#ffff00', GREEN = '#008000', BLUE = '#0000ff', PURPLE = '#4b0082', PINK = '#ee82ee' }
const randomWidth = () => Math.round(30);

export const DynamicGraph: React.FC<Props> = (props) => {
  const [data, setData] = useState<IState>(graphData);
  // required to get shell width from state
  const [state, dispatch] = useStateValue();
  const fgRef = useRef();
  useEffect(() => {
    setInterval(() => {
      // Add a new connected node every x second
      addNode()
    }, 10000);
  }, []);

  // old handler when press remove node
  // const handleClick = useCallback(node => {
  //   const { nodes, links } = data;
  //   // Remove node on click
  //   const newLinks = links.filter((l) => l.source !== node && l.target !== node);
  //   // Remove links attached to node
  //   const newNodes = nodes.slice();
  //   // Remove node
  //   newNodes.splice(node.id, 1);
  //   // Reset node ids to array index
  //   newNodes.forEach((n, idx) => { n.id = idx; });
  //   setData({ nodes: newNodes, links: newLinks });
  // }, [data, setData]);

  // click to focus: https://github.com/vasturiano/react-force-graph/blob/master/example/click-to-focus/index.html
  const handleClick = useCallback(node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    (fgRef as any).current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }, [fgRef]);

  const handleButton1Click = () => addNode();
  const addNode = () => {
    // Add a new connected node every second
    setData(({ nodes, links }) => {
      const id = nodes.length;
      const target = Math.round(Math.random() * (id - 1));
      const group = Math.round(Math.random() * (Object.keys(TransactionType).length - 1));
      // const color = Math.round(Math.random() * (Object.keys(Color).length - 1));
      return {
        nodes: [...nodes, { id, label: `id${id}`, nodeVal: randomWidth(), group }],
        links: [...links, { source: id, target, label: `${id}>${target}`, group }]
      };
    });
  }

  // const handleButton2Click = () => fetch();
  // const fetch = () => {
  //   props.client
  //     .query({
  //       query: gql`
  //       query GetRates {
  //         rates(currency: "USD") {
  //           currency
  //         }
  //       }
  //     `
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return <div>
    {/* <button children={<span>Add</span>} onClick={handleButton1Click} />
    <button children={<span>Fetch</span>} onClick={handleButton2Click} /> */}
    <ForceGraph3D
      ref={fgRef}
      graphData={data}
      nodeLabel='label'
      linkLabel='label'
      linkWidth={1}
      showNavInfo={true}
      nodeAutoColorBy="group"
      linkAutoColorBy="group"
      nodeRelSize={5}
      enableNodeDrag={false}
      // #fafafa
      backgroundColor={'#282828'}
      linkThreeObjectExtend={true}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      // linkCurvature={0.25}      
      nodeVal={node => 100 / ((node as any).nodeVal + 1)}
      linkDirectionalParticles="value"
      linkDirectionalParticleSpeed={node => (node as any).nodeVal * 0.001}
      width={state.shellWidth}
      height={state.shellWidth}
      // events
      onNodeClick={handleClick}
    // https://github.com/vasturiano/react-force-graph/blob/master/example/text-links/index-3d.html
    // linkThreeObject={link => {
    //   // extend link with text sprite
    //   const sprite = new SpriteText(`${link.source} > ${link.target}`);
    //   sprite.color = 'lightgrey';
    //   sprite.textHeight = 1.5;
    //   return sprite;
    // }}
    // linkPositionUpdate={(sprite, { start, end }: { start: any, end: any }): any => {
    //   const middlePos = Object.assign({
    //     ...['x', 'y', 'z'].map(c => ({
    //       // calc middle point
    //       [c]: start[c] + (end[c] - start[c]) / 2
    //     }))
    //   });
    //   // Position sprite
    //   Object.assign(sprite.position, middlePos);
    // }}
    />
  </div>;
};
