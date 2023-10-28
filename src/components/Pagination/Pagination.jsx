// import styles from "./Pagination.module.css";

// export const Pagination = () => {
//   function handeleToggleActive(index) {
//     setCurrentIndex(index);
//     if (index > currentIndex) {
//       heroRef.current.scrollLeft += currentHeroImageWidth * (index - currentIndex);
//     } else if (index <= currentIndex) {
//       heroRef.current.scrollLeft -= currentHeroImageWidth * (currentIndex - index);
//     }
//   }

//   return (
//     <div className={styles.pagination_box}>
//       {Array.from({ length: totalIndex }, (_, i) => (
//         <div
//           onClick={() => handeleToggleActive(i)}
//           key={i}
//           className={styles.pagination}
//           style={{
//             backgroundColor: currentIndex === i ? "#fff" : "",
//           }}
//         ></div>
//       ))}
//     </div>
//   );
// };
