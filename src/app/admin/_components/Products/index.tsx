'use client';

/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import { closestCenter, DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { useState } from 'react';
import Product from './Product';

interface Props {
  initialProducts: {
    id: number;
    name: string;
    imageUrl: string | null;
    priceNormal: number;
    priceOffer: number | null;
    visible: boolean;
    quantity: number;
    id_image: number | null;
  }[];
}

const Component = ({ initialProducts }: Props) => {
  const [products, setProducts] = useState(initialProducts);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over === null || active.id === over.id) return;

    setProducts((previousState) => {
      const indexActive = previousState.findIndex(
        (item) => item.id === active.id
      );
      const indexOver = previousState.findIndex((item) => item.id === over.id);
      return arrayMove(previousState, indexActive, indexOver);
    });
  };

  return (
    <div className="grid gap-12 mt-3 grid-cols-[repeat(auto-fill,_minmax(min(100%,_15rem),_1fr))] lg:gap-5 md:gap-2 md:grid-cols-[repeat(auto-fill,_minmax(min(100%,_7rem),_1fr))]">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        id={'DndContext'}
      >
        <SortableContext items={products} strategy={rectSortingStrategy}>
          {products.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </SortableContext>
      </DndContext>
      <div className="w-52 h-52 bg-red-500" draggable={false}></div>
    </div>
  );
};

export default Component;
