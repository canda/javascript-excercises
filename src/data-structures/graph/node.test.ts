import { UndirectedGraphNode } from './node';

describe('Deep First Search', () => {
  test('should return true for 2 connected nodes graph', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();
    node1.connections.push(node2);

    expect(node1.isConnectedDFS(node2)).toBe(true);
  });

  test('should return false for 2 disconnected nodes graph', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();

    expect(node1.isConnectedDFS(node2)).toBe(false);
  });

  test('should return true for 2 indirectly connected nodes graph', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();
    const node3 = new UndirectedGraphNode();

    node1.connections.push(node2);
    node2.connections.push(node3);

    expect(node1.isConnectedDFS(node3)).toBe(true);
  });

  test('should contemplate graphs with loops', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();
    const node3 = new UndirectedGraphNode();
    const node4 = new UndirectedGraphNode();

    node1.connections.push(node2);
    node2.connections.push(node1);
    node1.connections.push(node4);

    expect(node1.isConnectedDFS(node3)).toBe(false);
    expect(node1.isConnectedDFS(node4)).toBe(true);
  });
});

describe('Breath First Search', () => {
  test('should return true for 2 connected nodes graph', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();
    node1.connections.push(node2);

    expect(node1.isConnectedBFS(node2)).toBe(true);
  });

  test('should return false for 2 disconnected nodes graph', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();

    expect(node1.isConnectedBFS(node2)).toBe(false);
  });

  test('should return true for 2 indirectly connected nodes graph', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();
    const node3 = new UndirectedGraphNode();

    node1.connections.push(node2);
    node2.connections.push(node3);

    expect(node1.isConnectedBFS(node3)).toBe(true);
  });

  test('should contemplate graphs with loops', () => {
    const node1 = new UndirectedGraphNode();
    const node2 = new UndirectedGraphNode();
    const node3 = new UndirectedGraphNode();
    const node4 = new UndirectedGraphNode();

    node1.connections.push(node2);
    node2.connections.push(node1);
    node1.connections.push(node4);

    expect(node1.isConnectedBFS(node3)).toBe(false);
    expect(node1.isConnectedBFS(node4)).toBe(true);
  });
});
