import React, { useCallback, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { useStateValue } from '../../../app/state';

type Props = {  };
interface IState { nodes: Node[], links: Link[] };
type Node = { id: number, label: string, nodeVal?: number, desc?: string, color?: string, autoColorBy?: string, group?: TransactionType | string };
type Link = { source: number, target: number, label?: string, desc?: string, color?: string, autoColorBy?: string, width?: number, group?: TransactionType };
enum TransactionType { FUNDS, GOODS, VOLUNTARY_HOURS, SERVICE };
// enum Color { RED = '#ff0000', GREEN = '#00ff00', BLUE = '#0000ff' }
const randomWidth = () => Math.round(30);

export const DynamicGraph: React.FC<Props> = (props) => {
  const [data, setData] = useState<IState>({ nodes: [{ id: 0, label: 'genesis', nodeVal: randomWidth(), group: 'GENESIS' }], links: [] });
  // required to get shell width from state
  const [state, dispatch] = useStateValue();
  // const fgRef = useRef();
  // const UnrealBloomPass = useImportScript("//unpkg.com/three/examples/jsm/postprocessing/UnrealBloomPass.js");

  // UnrealBloomPass
  // 4 Ways to Add External JavaScript Files in React: https://medium.com/better-programming/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668  
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "//unpkg.com/three/examples/jsm/postprocessing/UnrealBloomPass.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);
  useEffect(() => {
    setInterval(() => {
      // Add a new connected node every x second
      addNode()
    }, 10000);
  }, []);

  // useEffect(() => {
  //   const bloomPass = new UnrealBloomPass();
  //   bloomPass.strength = 3;
  //   bloomPass.radius = 1;
  //   bloomPass.threshold = 0.1;
  //   fgRef.current.postProcessingComposer().addPass(bloomPass);
  // }, []);

  const handleClick = useCallback(node => {
    const { nodes, links } = data;
    // Remove node on click
    const newLinks = links.filter((l) => l.source !== node && l.target !== node);
    // Remove links attached to node
    const newNodes = nodes.slice();
    // Remove node
    newNodes.splice(node.id, 1);
    // Reset node ids to array index
    newNodes.forEach((n, idx) => { n.id = idx; });
    setData({ nodes: newNodes, links: newLinks });
  }, [data, setData]);

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
      graphData={data}
      nodeLabel='label'
      linkLabel='label'
      linkWidth={2}
      nodeAutoColorBy="group"
      linkAutoColorBy="group"
      enableNodeDrag={false}
      onNodeClick={handleClick}
      backgroundColor={'#121212'}
      linkThreeObjectExtend={true}
      width={state.shellWidth}
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
