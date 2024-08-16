import React from 'react';
import CategoryItem from './CategoryItem';

const ProductCategories = () => {
  const categories = [
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
    { id: 4, isSelected: true },
  ];

  return (
    <section className="product-categories">
      {categories.map((category) => (
        <CategoryItem key={category.id} isSelected={category.isSelected} />
      ))}
    </section>
  );
};

export default ProductCategories;