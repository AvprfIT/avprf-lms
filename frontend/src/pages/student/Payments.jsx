
import { useState } from "react";
import {
  Wallet,
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Download,
  Eye,
  Receipt,
  CalendarDays,
  BookOpen,
  ArrowDownToLine,
} from "lucide-react";

const paymentData = [
  {
    id: 1,
    transactionId: "AVPFRP202611001",
    course: "Advanced Clinical Ayurveda",
    date: "Nov 05, 2026",
    amount: 15000,
    method: "UPI",
    status: "Paid",
  },
  {
    id: 2,
    transactionId: "AVPFRP202610025",
    course: "Advanced Clinical Course - Marma Therapy",
    date: "Oct 25, 2026",
    amount: 10000,
    method: "Credit Card",
    status: "Paid",
  },
  {
    id: 3,
    transactionId: "AVPFRP202610018",
    course: "Basic Ayurveda Course",
    date: "Oct 18, 2026",
    amount: 5000,
    method: "UPI",
    status: "Pending",
  },
  {
    id: 4,
    transactionId: "AVPFRP202610012",
    course: "Ayurveda Workshop",
    date: "Oct 12, 2026",
    amount: 2500,
    method: "Net Banking",
    status: "Failed",
  },
];

function Payments() {
  const [payments] = useState(paymentData);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paidPayments = payments.filter(
    (payment) => payment.status === "Paid"
  );

  const totalPaid = paidPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.course.toLowerCase().includes(search.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || payment.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const formatAmount = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <CheckCircle size={15} />;
      case "Pending":
        return <Clock size={15} />;
      case "Failed":
        return <XCircle size={15} />;
      default:
        return null;
    }
  };

  const handleDownloadReceipt = (payment) => {
    if (payment.status !== "Paid") {
      alert("Receipt is available only for successful payments.");
      return;
    }

    alert(`Receipt download will be connected for ${payment.transactionId}.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#572000]">
          Payments
        </h1>
        <p className="mt-1 text-sm text-[#98745B]">
          View your course payments, transactions and receipts.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Paid</p>
              <h2 className="mt-2 text-2xl font-bold text-[#572000]">
                {formatAmount(totalPaid)}
              </h2>
            </div>
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <IndianRupee size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Successful Payments</p>
              <h2 className="mt-2 text-2xl font-bold text-[#572000]">
                {paidPayments.length.toString().padStart(2, "0")}
              </h2>
            </div>
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <CheckCircle size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <h2 className="mt-2 text-2xl font-bold text-[#572000]">
                {pendingPayments.length.toString().padStart(2, "0")}
              </h2>
            </div>
            <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
              <Clock size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <h2 className="mt-2 text-2xl font-bold text-[#572000]">
                {payments.length.toString().padStart(2, "0")}
              </h2>
            </div>
            <div className="rounded-xl bg-orange-100 p-3 text-[#FF7600]">
              <Wallet size={23} />
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-orange-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#572000]">
              Payment History
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your course transaction records
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search transaction..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-orange-100 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FF7600] sm:w-64"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-orange-100 px-4 py-2.5 text-sm text-[#572000] outline-none focus:border-[#FF7600]"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-[#FFF8EF] text-xs uppercase tracking-wide text-[#98745B]">
              <tr>
                <th className="px-5 py-4">Course Details</th>
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Method</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-orange-50">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-orange-50/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-orange-100 p-2 text-[#FF7600]">
                        <BookOpen size={20} />
                      </div>
                      <span className="max-w-[190px] text-sm font-semibold text-[#572000]">
                        {payment.course}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {payment.transactionId}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {payment.date}
                  </td>

                  <td className="px-5 py-4 text-sm font-bold text-[#572000]">
                    {formatAmount(payment.amount)}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {payment.method}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                        payment.status
                      )}`}
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        title="View Details"
                        className="rounded-lg bg-orange-50 p-2 text-[#FF7600] hover:bg-orange-100"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => handleDownloadReceipt(payment)}
                        title="Download Receipt"
                        className="rounded-lg bg-green-50 p-2 text-green-600 hover:bg-green-100"
                      >
                        <Download size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-sm text-gray-500">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Payment Cards */}
        <div className="space-y-4 p-4 md:hidden">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-xl border border-orange-100 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#572000]">
                    {payment.course}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {payment.transactionId}
                  </p>
                </div>

                <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${getStatusStyle(payment.status)}`}>
                  {getStatusIcon(payment.status)}
                  {payment.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-orange-50 pt-3">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-bold text-[#572000]">
                    {formatAmount(payment.amount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Payment Date</p>
                  <p className="text-sm text-gray-700">{payment.date}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setSelectedPayment(payment)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-50 py-2 text-sm font-medium text-[#FF7600]"
                >
                  <Eye size={16} /> View
                </button>
                <button
                  onClick={() => handleDownloadReceipt(payment)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 py-2 text-sm font-medium text-green-700"
                >
                  <Download size={16} /> Receipt
                </button>
              </div>
            </div>
          ))}

          {filteredPayments.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              No payment records found.
            </p>
          )}
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-orange-100 p-2 text-[#FF7600]">
                  <Receipt size={22} />
                </div>
                <h2 className="text-lg font-bold text-[#572000]">
                  Payment Details
                </h2>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
                className="rounded-lg px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Course Name</p>
                <p className="mt-1 font-semibold text-[#572000]">
                  {selectedPayment.course}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="mt-1 font-bold text-[#572000]">
                    {formatAmount(selectedPayment.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment Date</p>
                  <p className="mt-1 text-sm text-gray-700">
                    {selectedPayment.date}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="mt-1 break-all text-sm font-medium text-[#572000]">
                  {selectedPayment.transactionId}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="mt-1 text-sm font-medium text-[#572000]">
                    {selectedPayment.method}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(selectedPayment.status)}`}>
                  {getStatusIcon(selectedPayment.status)}
                  {selectedPayment.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedPayment(null)}
                className="flex-1 rounded-xl border border-orange-200 py-2.5 text-sm font-semibold text-[#572000] hover:bg-orange-50"
              >
                Close
              </button>

              <button
                onClick={() => handleDownloadReceipt(selectedPayment)}
                className="flex-1 rounded-xl bg-[#FF7600] py-2.5 text-sm font-semibold text-white hover:bg-[#e66a00]"
              >
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
