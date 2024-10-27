// import React from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     backgroundColor: "#f4f4f4",
//   },
//   section: {
//     marginBottom: 10,
//   },
//   table: {
//     display: "table",
//     width: "100%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     marginBottom: 20,
//     overflow: "hidden",
//   },
//   tableHeader: {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   tableCol: {
//     flex: 1, // Adjust this to control the width of each column
//     padding: 8,
//     borderRightWidth: 1,
//     borderRightColor: "#ddd",
//   },
//   tableCellHeader: {
//     fontSize: 11,
//     fontWeight: "bold",
//     color: "#fff",
//     padding: 10,
//     textAlign: "center",
//     backgroundColor: "#4CAF50",
//   },
//   tableCell: {
//     fontSize: 10,
//     padding: 10,
//     textAlign: "center",
//     color: "#333",
//     wordBreak: "break-all", // Ensure long words break properly
//   },
//   footer: {
//     marginTop: 20,
//     fontSize: 12,
//     textAlign: "center",
//     color: "#888",
//   },
// });

// // Function to format the date in dd-mm-yyyy format
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

// const PaymentHistoryPDF = ({ transactions }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <Text style={styles.header}>Payment History</Text>
//       <View style={styles.table}>
//         <View style={[styles.tableRow, styles.tableHeader]}>
//           <Text style={[styles.tableCol, styles.tableCellHeader]}>
//             Transaction ID
//           </Text>
//           <Text style={[styles.tableCol, styles.tableCellHeader]}>Date</Text>
//           <Text style={[styles.tableCol, styles.tableCellHeader]}>Amount</Text>
//           <Text style={[styles.tableCol, styles.tableCellHeader]}>
//             Payment Method
//           </Text>
//           <Text style={[styles.tableCol, styles.tableCellHeader]}>Status</Text>
//           <Text style={[styles.tableCol, styles.tableCellHeader]}>
//             User Name
//           </Text>
//           <Text style={[styles.tableCol, styles.tableCellHeader]}>
//             Plan Name
//           </Text>
//         </View>
//         {transactions &&
//           transactions.map((tx) => (
//             <View key={tx._id} style={styles.tableRow}>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {tx.paymentDetails.transactionId}
//               </Text>
//               console.log(tx.paymentDetails.transactionId) 
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {formatDate(tx.paymentDate)}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 ${tx.amount.toFixed(2)}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {tx.paymentMethod}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {tx.status}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {tx.userName}
//               </Text>
//               <Text style={[styles.tableCol, styles.tableCell]}>
//                 {tx.planName}
//               </Text>
//             </View>
//           ))}
//       </View>
//       <Text style={styles.footer}>Generated on {formatDate(new Date())}</Text>
//     </Page>
//   </Document>
// );

// export default PaymentHistoryPDF;



// ! swapnil makes :
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center", // Align items in the center vertically
  },
  tableCol: {
    flex: 1,
    paddingVertical: 10, // Vertical padding for consistent row height
    paddingHorizontal: 5, // Horizontal padding to keep text within boundaries
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    textAlign: "center", // Center text horizontally
  },
  transactionCol: {
    flex: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    textAlign: "center",
  },
  lastCol: {
    borderRightWidth: 0, // Remove right border for the last column
  },
  tableCellHeader: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    color: "#333",
    wordBreak: "break-all",
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    textAlign: "center",
    color: "#888",
  },
});

// Function to format the date in dd-mm-yyyy format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const PaymentHistoryPDF = ({ transactions }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Payment History</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.transactionCol, styles.tableCellHeader]}>
            Transaction ID
          </Text>
          <Text style={[styles.tableCol, styles.tableCellHeader]}>Date</Text>
          <Text style={[styles.tableCol, styles.tableCellHeader]}>Amount</Text>
          <Text style={[styles.tableCol, styles.tableCellHeader]}>
            Payment Method
          </Text>
          <Text style={[styles.tableCol, styles.tableCellHeader]}>Status</Text>
          <Text style={[styles.tableCol, styles.tableCellHeader]}>User Name</Text>
          <Text style={[styles.tableCol, styles.tableCellHeader, styles.lastCol]}>
            Plan Name
          </Text>
        </View>
        {transactions &&
          transactions.map((tx) => (
            <View key={tx._id} style={styles.tableRow}>
              <Text style={[styles.transactionCol, styles.tableCell]}>
                {tx.paymentDetails?.transactionId || tx._id || "N/A"}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {formatDate(tx.paymentDate)}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                ${tx.amount.toFixed(2)}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>
                {tx.paymentMethod}
              </Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{tx.status}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{tx.userName}</Text>
              <Text style={[styles.tableCol, styles.tableCell, styles.lastCol]}>
                {tx.planName}
              </Text>
            </View>
          ))}
      </View>
      <Text style={styles.footer}>Generated on {formatDate(new Date())}</Text>
    </Page>
  </Document>
);

export default PaymentHistoryPDF;
