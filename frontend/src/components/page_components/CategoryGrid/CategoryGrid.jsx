/**
 * This code was generated by Builder.io.
 */
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./CategoryGrid.module.css";
import CategoryItem from "./CategoryItem";

// const categories = [
//   { id: 1, name: "Category 1" },
//   { id: 2, name: "Category 2" },
//   { id: 3, name: "Category 3" },
//   { id: 4, name: "Category 4" },
//   { id: 5, name: "Category 5" },
//   { id: 6, name: "Category 6" },
// ];

const categories1 = [
  [ 
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ],
  [
    { id: 4, name: "Category 4" },
    { id: 5, name: "Category 5" },
    { id: 6, name: "Category 6" },
  ],
  [
    { id: 4, name: "Category 4" },
    { id: 5, name: "Category 5" },
  ]
]
function CategoryGrid() {
  const [categories, setCategories] = useState([]);




  const fetchData = async () => {
    const fetchResult = await fetch("/api/categories");
    var cleanResult = []
    if (fetchResult.ok) {
      
      const jsonResult = await fetchResult.json()
      console.log(jsonResult)

      cleanResult = gridify(jsonResult)
      setCategories(cleanResult)

    }
    
  }

  useEffect(() => {
    fetchData();
  }, []);




  
  
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <div className={styles.gridContainer}>

          {categories.map((row) => (

            <div className={styles.grid}>
              {row.map((category) => (
                <CategoryItem key={category._id} 
                              name={category.Title} 
                              link ={category.Redirect} 
                              // https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F6032d2b5327e4c0687019aafbe79d0c2
                              imgLink={category.ImgLink} 
                              isStore={false}/>
              ))}
            </div>
          
          ))}

        </div>
      </section>
    </main>
  );
}

const gridify = (data) => {
  const grid = []
  let row = []

  data.forEach((category, index) => {
    row.push(category)
    if ((index + 1) % 3 === 0) {
      grid.push(row)
      row = []
    }
  })

  if (row.length > 0) {
    grid.push(row)
  }

  return grid
}
export default CategoryGrid;