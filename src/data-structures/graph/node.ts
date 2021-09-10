export class UndirectedGraphNode {
  // As this is not a bidirectional graph we can expose the connections and make them mutable
  // in any way the user wants.
  // We don't need to let connected nodes know that we are connected to them
  connections: UndirectedGraphNode[];

  constructor(connections?: UndirectedGraphNode[]) {
    this.connections = connections || [];
  }

  isConnectedDFS = (
    otherNode: UndirectedGraphNode,
    queriedNodes?: UndirectedGraphNode[],
  ): boolean => {
    if (queriedNodes && queriedNodes.includes(this)) {
      return false;
    }
    if (otherNode === this) {
      return true;
    }
    return this.connections.some((node) =>
      node.isConnectedDFS(otherNode, [...(queriedNodes || []), this]),
    );
  };

  isConnectedBFS = (
    otherNode: UndirectedGraphNode,
    queriedNodes?: UndirectedGraphNode[],
  ): boolean => {
    if (queriedNodes && queriedNodes.includes(this)) {
      return false;
    }
    if (this.connections.includes(otherNode)) {
      return true;
    }
    return this.connections.some((node) =>
      node.isConnectedBFS(otherNode, [...(queriedNodes || []), this]),
    );
  };
}
