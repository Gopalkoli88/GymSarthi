 

import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles similar to the web table
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffff", // Dark theme background
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#e5e7eb", // Light text color
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#3b82f6", // Blue header
    textTransform: "uppercase",
  },
  tableContainer: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3b82f6",
    backgroundColor: "#374151", // Dark background
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3b82f6", // Blue gradient effect
    color: "#ffffff",
    fontWeight: "bold",
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#4b5563", // Darker gray for row separator
    backgroundColor: "#1f2937", // Alternating row colors
    paddingVertical: 5,
  },
  tableColHeader: {
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  tableCol: {
    flex: 1,
    padding: 6,
    textAlign: "center",
    color: "#d1d5db", // Lighter text
  },
  transactionCol: {
    flex: 2, // Wider column for transaction ID
  },
  lastCol: {
    borderRightWidth: 0, // No border on the last column
  },
  footer: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#4b5563",
    color: "#9ca3af", // Gray footer text
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

// Payment History PDF Component
const PaymentHistoryPDF = ({ transactions }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Payment History</Text>

      {/* Table */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableColHeader, styles.transactionCol]}>Transaction ID</Text>
          <Text style={styles.tableColHeader}>Date</Text>
          <Text style={styles.tableColHeader}>Amount</Text>
          <Text style={styles.tableColHeader}>Payment Method</Text>
          <Text style={styles.tableColHeader}>Status</Text>
          <Text style={styles.tableColHeader}>User Name</Text>
          <Text style={[styles.tableColHeader, styles.lastCol]}>Plan Name</Text>
        </View>

        {/* Table Rows */}
        {transactions && transactions.length > 0 ? (
          transactions.map((tx) => (
            <View key={tx._id} style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.transactionCol]}>
                {tx.paymentDetails?.transactionId || tx._id || "N/A"}
              </Text>
              <Text style={styles.tableCol}>{formatDate(tx.paymentDate)}</Text>
              <Text style={styles.tableCol}>${tx.amount.toFixed(2)}</Text>
              <Text style={styles.tableCol}>{tx.paymentMethod}</Text>
              <Text style={styles.tableCol}>{tx.status}</Text>
              <Text style={styles.tableCol}>{tx.userName}</Text>
              <Text style={[styles.tableCol, styles.lastCol]}>{tx.planName}</Text>
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { textAlign: "center", flex: 7 }]}>No Transactions Found</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Generated on {formatDate(new Date())}</Text>
    </Page>
  </Document>
);

export default PaymentHistoryPDF;



