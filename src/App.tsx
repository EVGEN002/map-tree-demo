import { useMemo, useState } from "react";
import { getMap, getTree } from "map-tree-utils";

interface Tree {
  code: string;
  name: string;
  childs?: Tree[];
}

const tree: Tree[] = [
  {
    code: "1",
    name: "one",
    childs: [
      { code: "1_1", name: "child_one" },
      { code: "1_2", name: "child_two" },
    ],
  },
];

function App() {
  const [normalized, setNormalized] = useState(
    getMap(tree, "childs", "parentCode", "code")
  );

  const update = () => {
    setNormalized((prev) => {
      const map = new Map(prev);
      const prevTarget = map.get("1_2");

      if (prevTarget) {
        map.set("1_2", { ...prevTarget, name: "John" });

        return map;
      } else {
        return prev;
      }
    });
  };

  const updatedTree = useMemo(() => {
    return getTree(normalized, "childs", "parentCode");
  }, [normalized]);

  return (
    <div className="example">
      <h1>Map Tree Utils - DEMO</h1>
      <pre>{JSON.stringify(normalized.get("1_2"))}</pre>
      <TreeNode tree={updatedTree} />
      <button onClick={update}>update</button>
    </div>
  );
}

function TreeNode({ tree }: { tree: Tree[] }) {
  return (
    <ul>
      {tree.map((node) => (
        <li key={node.code}>
          {node.name}
          {node.childs && node.childs.length > 0 && (
            <TreeNode tree={node.childs} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default App;
