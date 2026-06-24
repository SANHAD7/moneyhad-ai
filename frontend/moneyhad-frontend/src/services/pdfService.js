import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePdfReport(
  dashboard,
  expenses,
  healthScore
) {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("MoneyHad Monthly Report", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Monthly Income : ₹${dashboard.monthlyIncome}`,
    20,
    40
  );

  doc.text(
    `Total Spent : ₹${dashboard.totalSpent}`,
    20,
    50
  );

  doc.text(
    `Remaining Balance : ₹${dashboard.remainingBalance}`,
    20,
    60
  );

  doc.text(
    `Financial Health Score : ${healthScore}%`,
    20,
    70
  );

  const tableData = expenses.map(
    expense => [
      expense.category,
      expense.amount,
      expense.description,
      expense.date
    ]
  );

  autoTable(doc, {
    startY: 90,
    head: [["Category", "Amount", "Description", "Date"]],
    body: tableData
  });

  doc.save("MoneyHad_Report.pdf");

}