// // 1. Create a context
// import React, { createContext, useContext, useState } from "react";

// interface SubtotalContextType {
//   subtotal: number;
//   setSubtotal: React.Dispatch<React.SetStateAction<number>>;
// }

// const SubtotalContext = createContext<SubtotalContextType | undefined>(
//   undefined
// );

// // 2. Provide Context Value
// export const SubtotalProvider: React.FC = ({ children }) => {
//   const [subtotal, setSubtotal] = useState<number>(0);

//   return (
//     <SubtotalContext.Provider value={{ subtotal, setSubtotal }}>
//       {children}
//     </SubtotalContext.Provider>
//   );
// };

// // 3. Consume Context
// export const useSubtotal = () => {
//   const context = useContext(SubtotalContext);
//   if (!context) {
//     throw new Error("useSubtotal must be used within a SubtotalProvider");
//   }
//   return context;
// };
