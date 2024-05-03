import React, { useContext, useEffect, useMemo, useState } from "react";
import type { Movement } from "../../utils/types/Movement";
import { MovementsContext } from "../../utils/store/MovementsContext";
import { CategoriesContext } from "../../utils/store/CategoriesContext";
import * as d3 from "d3";
import { categoryColor } from "../../utils/types/Categories";
import { formatCurrency } from "../../utils/helpers";
import ChartFilters from "./ChartFilters";

interface ITree {
  type: "NODE" | "LEAF";
  name: string;
  value: number;
  children?: ITree[];
}

const Treemap = () => {
  const categories = useContext(CategoriesContext);

  const [movements, setMovements] = useState<Movement[]>(
    useContext(MovementsContext)
  );

  const [root, setRoot] = useState<d3.HierarchyRectangularNode<ITree>>();
  const [totalValue, setTotalValue] = useState<number | undefined>(undefined);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth * 0.75,
    height: window.innerHeight / 1.618,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth * 0.9,
        height: window.innerWidth / 1.618,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const data = categories.map((category) => {
      const movementsAggrupation = movements.filter(
        (mov) => mov.categorization?.name === category.name
      );
      const leaf: ITree = {
        type: "LEAF",
        value:
          movementsAggrupation.length > 0
            ? movementsAggrupation
                .map((x) => x.amount)
                .reduce((a, b) => a + b, 0)
            : 0,
        name: category.name,
      };

      return leaf;
    });

    const tree: ITree = {
      type: "NODE",
      name: "root",
      value: 0,
      children: data.sort((a, b) => b.value - a.value),
    };

    const hierarchy = d3.hierarchy(tree).sum((d) => d.value);

    const treeGenerator = d3
      .treemap<ITree>()
      .size([screenSize.width, screenSize.height])
      .padding(2);

    const root = treeGenerator(hierarchy);
    setRoot(root);

    const totalValue = data.map((x) => x.value).reduce((a, b) => a + b, 0);
    setTotalValue(totalValue);
  }, [movements]);

  return (
    <>
      <ChartFilters setMovements={setMovements}></ChartFilters>

      {root !== undefined ? (
        <div>
          <div className="flex flex-row justify-center m-4">
            <svg width={screenSize.width} height={screenSize.height}>
              {root.leaves().map((leaf) => {
                const baseColor = categoryColor({ name: leaf.data.name });
                return (
                  <g key={`leaf_${leaf.data.name}_`}>
                    <rect
                      x={leaf.x0}
                      y={leaf.y0}
                      width={leaf.x1 - leaf.x0}
                      height={leaf.y1 - leaf.y0}
                      stroke="transparent"
                      fill={`fill-${baseColor}-300`}
                      className={` opacity-80 hover:opacity-100 bg${baseColor}-300 text-${baseColor}-900 fill-${baseColor}-300`}
                    />
                    <text
                      x={leaf.x0 + 3}
                      y={leaf.y0 + 18}
                      fontSize={14}
                      textAnchor="start"
                      alignmentBaseline="hanging"
                      fill="white"
                      className="font-bold"
                    >
                      {leaf.data.name}
                    </text>
                    <text
                      x={leaf.x0 + 3}
                      y={leaf.y0 + 32}
                      fontSize={12}
                      textAnchor="start"
                      alignmentBaseline="hanging"
                      fill="white"
                      className="font-light"
                    >
                      {formatCurrency(leaf.data.value)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {totalValue !== undefined && (
            <div className="m-4 flex flex-row justify-center ">
              <p className="">
                <span className="font-bold">Gastos totales: </span>
                {formatCurrency(totalValue)}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>Sin datos para mostrar.</div>
      )}
    </>
  );
};

export default Treemap;
