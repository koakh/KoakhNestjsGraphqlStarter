// { nodes: [{ id: 0, label: 'genesis', nodeVal: randomWidth(), group: 'GENESIS' }], links: [] }

// TODO arrow with metadata
// https://colorswall.com/palette/102/
//    red #ff0000	rgb(255, 0, 0)
// orange #ffa500	rgb(255, 165, 0)
// yellow #ffff00	rgb(255, 255, 0)
//  green #008000	rgb(0, 128, 0)
//   blue #0000ff	rgb(0, 0, 255)
// purple #4b0082	rgb(75, 0, 130)
//   pink #ee82ee	rgb(238, 130, 238)

import { IState, NodeColor, NodeType, TransactionType } from "../../components/force-graph";

const genesisNodeValue = 1;
const participantsNodeValue = 5;
const personNodeValue = 10;
const causeNodeValue = 15;
const assetNodeValue = 20;
const transactionNodeValue = 25;

export const graphData: IState = {
  nodes: [
    { id: 0, group: NodeType.GENESIS, nodeVal: genesisNodeValue, color: NodeColor.WHITE, label: 'Genesis Node' },
    // connected directly to genesis
    { id: 1, group: NodeType.PARTICIPANT, nodeVal: participantsNodeValue, color: NodeColor.BLUE, label: 'Genesis Node' },
    { id: 2, group: NodeType.PERSON, nodeVal: personNodeValue, color: NodeColor.PINK, label: 'John Doe' },
    { id: 3, group: NodeType.PERSON, nodeVal: personNodeValue, color: NodeColor.PINK, label: 'jane Dow' },
    // connected to entities person and participants
    { id: 4, group: NodeType.CAUSE, nodeVal: causeNodeValue, label: 'World food program: starving' },
    { id: 5, group: NodeType.ASSET, nodeVal: assetNodeValue, label: 'Wheel chair' },
    // transaction
    { id: 6, group: NodeType.TRANSACTION, nodeVal: transactionNodeValue, label: 'Transaction' },
    { id: 7, group: NodeType.TRANSACTION, nodeVal: transactionNodeValue, label: 'Transaction' },
  ],
  links: [
    { source: 0, target: 1, label: 'NO LABEL', group: TransactionType.FUNDS },
    { source: 0, target: 2, label: 'NO LABEL', group: TransactionType.FUNDS },
    { source: 0, target: 3, label: 'NO LABEL', group: TransactionType.FUNDS },
    // cause
    { source: 1, target: 4, label: 'NO LABEL' },
    // input person transactions to
    { source: 2, target: 6, label: 'John Doe Transaction to Cause' },
    { source: 3, target: 7, label: 'jane Doe Transaction to Cause' },
    // output transactions to
    { source: 6, target: 4, label: 'John Doe Transaction to Cause' },
    { source: 7, target: 4, label: 'jane Doe Transaction to Cause' },
  ],
};
