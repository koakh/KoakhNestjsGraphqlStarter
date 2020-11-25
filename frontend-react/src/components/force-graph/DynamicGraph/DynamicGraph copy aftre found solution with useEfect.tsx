import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { envVariables as e, RouteKey, routes } from '../../../app/config';
// import { graphData } from '../../../app/config';
import { useStateValue } from '../../../app/state';
import { ReactForceDataDocument, PersonProfileDocument, useAssetAddedSubscription, useCauseAddedSubscription, useParticipantAddedSubscription, usePersonAddedSubscription, useReactForceDataLazyQuery, useReactForceDataQuery, useTransactionAddedSubscription } from '../../../generated/graphql';
// import SpriteText from 'three-spritetext';
import { appConstants as c, getAccessToken } from '../../../app';
import { AlertMessage, AlertSeverityType } from '../../material-ui/alert-message';
import { Typography } from '@material-ui/core';
import { LinearIndeterminate } from '../../material-ui/feedback';
import { SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
import { linkSync } from 'fs';
import { useApolloClient } from '@apollo/client/react/hooks/useApolloClient';
import { gql } from '@apollo/client';

type Props = {};
// TODO: move to types
export type Node = { __typename: string, id: string, label: string, nodeVal?: number, desc?: string, color?: NodeColor | string, autoColorBy?: string, group?: NodeType | string };
export type Link = { __typename: string, source: string, target: string, label?: string, desc?: string, color?: string, autoColorBy?: string, linkWidth?: number, group?: TransactionType };
export interface IState { nodes: Node[], links: Link[] };
export enum NodeType { GENESIS, PARTICIPANT, PERSON, CAUSE, ASSET, TRANSACTION };
export enum TransactionType { FUNDS, GOODS, VOLUNTARY_HOURS, SERVICE };
export enum NodeColor { WHITE = '#ffffff', RED = '#ff0000', ORANGE = '#ffa500', YELLOW = '#ffff00', GREEN = '#008000', BLUE = '#0000ff', PURPLE = '#4b0082', PINK = '#ee82ee' }
// const randomWidth = () => Math.round(30);

export const DynamicGraph: React.FC<Props> = (props) => {
  // old data from setState
  const [data, setData] = useState<IState>({ nodes: [], links: [] });
  // required to get shell width from state
  const [state, dispatch] = useStateValue();
  const fgRef = useRef();
  // get apollo client instance `client` is now set to the `ApolloClient` instance being used by the
  const client = useApolloClient();
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
  // hooks
  const [reactForceDataQuery, { data: dataQuery, loading, error }] = useReactForceDataLazyQuery({
    // TODO
    fetchPolicy: e.apolloFetchPolicy,
    variables: {
      skip: 0,
      // UNLIMITED
      // take: 50
    }
  });
  // const { data: dataSub, loading: loadingSub, error: errorSub } = usePersonAddedSubscription();

  // old use memo stuff, before try apollo cache
  //   useMemo(() => {
  //     // require to check if dataQuery exists
  //     if (dataQuery) {
  //       const nodes = dataQuery.reactForceData.nodes.map((e) => {
  //         return {
  //           id: e.id,
  //           group: e.group,
  //           nodeVal: e.nodeVal,
  //           color: e.color,
  //           label: e.label
  //         }
  //       })
  //       const links = dataQuery.reactForceData.links.map((e) => {
  //         return {
  //           source: e.source,
  //           target: e.target,
  //           label: e.label,
  //           group: e.group,
  //         }
  //       })
  //       setData({ nodes, links });
  //     }
  //   }, [dataQuery])

  // const click = (setData: any, data: any) => {
  //   useEffect(() => {
  //     console.log("Click");
  //     setData(data);
  //   }, []);
  // }

  const changeProfile = () => {
    // Combining reads and writes
    // https://www.apollographql.com/docs/react/caching/cache-interaction/#combining-reads-and-writes
    // Get the current to-do list
    const data = client.readQuery({
      query: PersonProfileDocument,
      // query: ReactForceDataDocument,
    });
    // console.log(`data: '${JSON.stringify(data, undefined, 2)}'`);
    // write to cache
    client.writeQuery({
      // must use postfix Document type gql``
      query: PersonProfileDocument,
      data: {
        // must match personProfile with personLogin.user return objects
        personProfile: {
          // the trick is access personProfile from data, use the consoles
          ...data.personProfile,
          username: 'bob',
          email: 'bob@example.com',
        }
      }
    })
    const dataChanged = client.readQuery({
      query: PersonProfileDocument,
    });
    // console.log(`dataChanged: '${JSON.stringify(dataChanged, undefined, 2)}'`);
  };

  const addToGraph = (nodes: Node[] = [], links: Link[] = []) => {
    // Combining reads and writes
    // https://www.apollographql.com/docs/react/caching/cache-interaction/#combining-reads-and-writes
    // Get the current to-do list
    const data = client.readQuery({
      query: ReactForceDataDocument,
      // MissingFieldError {message: "Can't find field 'reactForceData' on ROOT_QUERY object"
      // TODO: notes must match query at 100% even the variables
      variables: { 'skip': 0 }
    });
    // write to cache
    client.writeQuery({
      // must use postfix Document type gql``
      query: ReactForceDataDocument,
      variables: { 'skip': 0 },
      data: {
        // must match reactForceData with personLogin.user return objects
        reactForceData: {
          // Cache data may be lost when replacing the reactForceData field of a Query object.
          // To address this problem (which is not a bug in Apollo Client), either ensure all objects of type GraphData have IDs, or define a custom merge function for the Query.reactForceData field, so InMemoryCache can safely merge these objects:
          __typename: 'GraphData',
          // the trick is access reactForceData from data, use the consoles
          nodes: [
            ...data.reactForceData.nodes,
            // ...dataQuery.reactForceData.nodes,
            ...nodes,
            // hard coded object that starts to work
            // {
            //   __typename: "GraphNode",
            //   id: "c8ca045c-9d1b-407f-b9ae-31711758f228",
            //   label: "Participant:28",
            //   desc: null,
            //   nodeVal: 1,
            //   color: "#ff0000",
            //   autoColorBy: null,
            //   group: 1
            // }
          ],
          links: [
            // TODO TRY TO USE THE CACHE IN GRAPH AND NOT THE dataQuery.reactForceData maybe it works
            ...data.reactForceData.links,
            // ...dataQuery.reactForceData.links,
            ...links,
          ],
        }
      }
    })
    // console.log(`data: '${JSON.stringify(data, undefined, 2)}'`);
    const dataChanged = client.readQuery({
      query: ReactForceDataDocument,
      variables: { 'skip': 0 },
    });
    // console.log(`dataChanged: '${JSON.stringify(dataChanged, undefined, 2)}'`);
  };

  // subscriptions
  const { data: participantDataSub, loading: participantLoadingSub, error: participantErrorSub } = useParticipantAddedSubscription();
  const { data: personDataSub, loading: personLoadingSub, error: personErrorSub } = usePersonAddedSubscription();
  const { data: causeDataSub, loading: causeLoadingSub, error: causeErrorSub } = useCauseAddedSubscription();
  const { data: assetDataSub, loading: assetLoadingSub, error: assetErrorSub } = useAssetAddedSubscription();
  const { data: transactionDataSub, loading: transactionLoadingSub, error: transactionErrorSub } = useTransactionAddedSubscription();

  // The solution at last, web 
  // UsersObserver component
  // https://medium.com/@cbartling/graphql-subscriptions-with-apollo-client-react-hooks-and-hasura-20f67d98be4c
  useEffect(() => {
    if (!causeLoadingSub && causeDataSub) {
      const message = "Received notification through GraphQL subscription.";
      console.info(message, causeDataSub);
      addToGraph(
        [{
          __typename: 'GraphNode',
          id: causeDataSub.causeAdded.id, label: causeDataSub.causeAdded.name, nodeVal: 1, group: 1,
          // required else MissingFieldError {message: "Can't find field 'color' on object
          desc: 'desc', color: '#FF0000', autoColorBy: null,
        }],
        [{
          __typename: 'GraphLink',
          source: causeDataSub.causeAdded.input.entity.id, target: causeDataSub.causeAdded.id, label: 'CREATED_CAUSE', group: 1,
          // required else MissingFieldError {message: "Can't find field 'color' on object
          desc: 'desc', color: '#FF0000', autoColorBy: null,
        }]
      )
    }
  }, [causeLoadingSub, causeDataSub]);



  // subscriptions: participant
  if (!participantLoadingSub && participantDataSub && participantDataSub.participantAdded) {
    console.log(participantDataSub);
  }
  if (participantErrorSub) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }
  // subscriptions: person
  if (!personLoadingSub && personDataSub && personDataSub.personAdded) {
    console.log(personDataSub);
  }
  if (personErrorSub) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }
  // subscriptions: cause
  // if (!causeLoadingSub && causeDataSub && causeDataSub.causeAdded) {
  //   console.log(causeDataSub);
  //   addToGraph(
  //     [{
  //       __typename: 'GraphNode',
  //       id: causeDataSub.causeAdded.id, label: causeDataSub.causeAdded.name, nodeVal: 1, group: 1,
  //       // required else MissingFieldError {message: "Can't find field 'color' on object
  //       desc: 'desc', color: '#FF0000', autoColorBy: null,
  //     }],
  //     [{
  //       __typename: 'GraphLink',
  //       source: causeDataSub.causeAdded.input.entity.id, target: causeDataSub.causeAdded.id, label: 'CREATED_CAUSE', group: 1,
  //       // required else MissingFieldError {message: "Can't find field 'color' on object
  //       desc: 'desc', color: '#FF0000', autoColorBy: null,
  //     }]
  //   )
  // }
  if (causeErrorSub) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }
  // subscriptions: asset
  if (!assetLoadingSub && assetDataSub && assetDataSub.assetAdded) {
    console.log(assetDataSub);
  }
  if (assetErrorSub) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }
  // subscriptions: transaction
  if (!transactionLoadingSub && transactionDataSub && transactionDataSub.transactionAdded) {
    console.log(transactionDataSub);
  }
  if (transactionErrorSub) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  // only fire query if has a valid accessToken to prevent after login delay problems
  if (!dataQuery && !loading && getAccessToken()) {
    reactForceDataQuery();
  }

  // catch error first
  if (error) {
    return <AlertMessage severity={AlertSeverityType.ERROR} message={error.message} />;
  }

  if (loading || !dataQuery) {
    return (
      <Fragment>
        <LinearIndeterminate />
      </Fragment>
    );
  }

  // map nodes and links, and ASSIGN its apollo hook's REFERENCES
  // const nodes = dataQuery.reactForceData.nodes.map((e) => {
  //   return {
  //     id: e.id,
  //     group: e.group,
  //     nodeVal: e.nodeVal,
  //     color: e.color,
  //     label: e.label
  //   }
  // })
  // const links = dataQuery.reactForceData.links.map((e) => {
  //   return {
  //     source: e.source,
  //     target: e.target,
  //     label: e.label,
  //     group: e.group,
  //   }
  // })

  // apollo cache
  // client.writeQuery({
  //   // must use postfix Document type gql``
  //   query: ReactForceDataDocument,
  //   data: {
  //     // must match personProfile with personLogin.user return objects
  //     personProfile: dataQuery.reactForceData
  //   }
  // });

  // random addNode
  // useEffect(() => {
  //   setInterval(() => {
  //     // Add a new connected node every x second
  //     addNode()
  //   }, 10000);
  // }, []);

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

  // const handleButton1Click = () => { };
  // Old handleButton1Click
  const handleButton1Click = () => changeProfile();
  const handleButton2Click = () => addToGraph();

  // below works
  // const addNode = () => {
  //   // Add a new connected
  //   setData(({ nodes, links }) => {
  //     const id = nodes.length;
  //     const target = Math.round(Math.random() * (id - 1));
  //     const group = Math.round(Math.random() * (Object.keys(TransactionType).length - 1));
  //     // const color = Math.round(Math.random() * (Object.keys(Color).length - 1));
  //     return {
  //       nodes: [...nodes, { id: id.toString(), label: `id${id}`, nodeVal: 1, group }],
  //       links: [...links, { source: id.toString(), target: target.toString(), label: `${id}>${target}`, group }]
  //     };
  //   });
  // }

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

  return (<Fragment>
    {/* <button children={<span>Fetch</span>} onClick={handleButton2Click} /> */}
    <button children={<span>changeProfile</span>} onClick={handleButton1Click} />
    <button children={<span>addToGraph</span>} onClick={handleButton2Click} />
    <ForceGraph3D
      ref={fgRef}
      graphData={{
        nodes: dataQuery.reactForceData.nodes.map((e) => {
          return {
            id: e.id,
            group: e.group,
            nodeVal: e.nodeVal,
            color: e.color,
            label: e.label
          }
        }),
        links: dataQuery.reactForceData.links.map((e) => {
          return {
            source: e.source,
            target: e.target,
            label: e.label,
            group: e.group,
          }
        })
      }}
      nodeLabel='label'
      linkLabel='label'
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
      linkWidth={node => (node as any).linkWidth ? (node as any).linkWidth : 1}
      // linkDirectionalParticleSpeed={node => (node as any).nodeVal * 0.001}
      // linkDirectionalParticles="value"
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
  </Fragment>)
};
