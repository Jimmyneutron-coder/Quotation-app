import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// Note: jsPDF and html2canvas are NOT imported at the top of this file.
// They are dynamically imported inside handleDownload() instead, so they
// only get downloaded when the user actually clicks "Download Quotation",
// not as part of the initial page load.

const QuotationPreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quotation = state?.quotation;

  const handleBack = () => {
    navigate("/", { state: { quotation } });
    toast.success("Back to Edit Quotation");
  };

  const handleDownload = async () => {
    const quotationElement = document.getElementById("quotation-format");

    try {
      // Loaded on demand, right when the user clicks the button, instead
      // of being bundled into the app's initial JS payload.
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const canvas = await html2canvas(quotationElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Quotation.pdf");
      toast.success("Quotation Downloaded Successfully!");
    } catch (err) {
      toast.error("Something went wrong while downloading!");
    }
  };

  if (!quotation) {
    toast.error("No Data Available");
    return <h2 className="text-center text-red-500">No Data Available</h2>;
  }

  return (
    <div
      id="quotation-wrapper"
      className="p-6 z-1 bg-white border shadow-lg max-w-2xl mx-auto"
    >
      <div
        id="quotation-format"
        className="bg-white min-h-auto  border border-black"
      >
        <div className="border-b border-black">
          <div className="flex flex-row sm-p-0 px-2 py-1 sm:flex-row justify-between  font-bold text-[8px] sm:text-base mb-2">
            <p>GST NO: GST1234567890</p>
            <p>Contact: 9049384729</p>
          </div>

          <div className="flex flex-row -mt-5 mb-4 sm:flex-row justify-center items-center gap-1 sm:gap-2">
            <h1 className="text-3xl sm:text-5xl font-bold">Advik</h1>
            <h3 className="text-2xl sm:text-4xl font-semibold italic mt-1 sm:mt-2">
              Enterprises
            </h3>
          </div>

          <p className="text-center mb-2 text-sm sm:text-xl italic -mt-4 -sm:mt-1">
            Sales & Services
          </p>
          <div className="italic font-bold p-2 border-black text-center text-[10px] sm:text-base border-t">
            <p className="-mt-3">Amar chowk, Babupeth ward no.1, Chandrapur</p>
          </div>

          <div className="border-t italic p-1 font-bold text-[8px] sm:text-[14px] border-black text-center">
            <p className="-mt-2">
              Our services: All types of RO system Repairing & Maintenance, All
              types of Air Conditioning, Refrigerators, Water Coolers & Chiller
              Plant Repairing & Maintenance
            </p>
          </div>
        </div>
        <div>
          <div className="flex sm:text-sm text-[9px] font-semibold justify-between px-3">
            <p>Bill No:</p>
            <p className="italic">
              Date: {new Date().toLocaleDateString("en-GB")}
            </p>
          </div>
          <div className="flex sm:text-lg text-[9px] items-center gap-2 px-3 pb-1">
            M/s. :
            <p className="text-[10px] font-semibold italic sm:text-lg">
              {quotation.customer.name}
            </p>
          </div>

          <table className="w-full">
            <thead>
              <tr className="sm:text-[13px] pb-2 justify-center items-center text-[10px] italic">
                <th className="border-b border-t border-black ">Particulars</th>
                <th className="border border-black">QTY</th>
                <th className="border border-black ">Rate</th>
                <th className="border-b border-t border-black">Amount</th>
              </tr>
            </thead>
            <tbody className="min-h-[500px] text-center sm:text-[13px] text-[10px]">
              {quotation.items.map((item, index) => (
                <tr key={index} className="gap-0">
                  <td className="border-r border-black p-2">{item.name}</td>
                  <td className="border-r border-black p-2 text-top">
                    {item.qty}
                  </td>
                  <td className="border-r border-black p-2 text-center whitespace-nowrap">
                    {item.price}/-
                  </td>
                  <td className=" border-black p-2 text-center">
                    {item.qty * item.price}/-
                  </td>
                </tr>
              ))}

              {Array.from({
                length: Math.max(10 - quotation.items.length, 0),
              }).map((_, i) => (
                <tr
                  key={`empty-${i}`}
                  className="h-[10px] sm:h-[30px] md:h-[40px]"
                >
                  <td className="border-r border-black p-1 sm:p-2">&nbsp;</td>
                  <td className="border-r border-black p-1 sm:p-2">&nbsp;</td>
                  <td className="border-r border-black p-1 sm:p-2">&nbsp;</td>
                  <td className="border-black p-1 sm:p-2">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="sm:text-[18px] text-[13px] border-t text-end px-3 py-1 pb-2 border-black font-semibold ">
            Total Amount: ₹
            {quotation.items.reduce(
              (total, item) => total + item.qty * item.price,
              0
            )}
          </h2>
        </div>
        <div className="flex sm:text-[18px] m-0 text-[10px] font-semibold justify-between items-center p-2 border-t border-black">
          <p>Thank You...!</p>
          <div className="flex sm:text-[18px] text-[10px] flex-col items-center justify-between gap-5 sm:gap-5">
            <p>Advik Enterprises</p>
            <p>Prop. Ganesh B. Derkar</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleBack}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
        <button
          onClick={handleDownload}
          className="bg-red-700 text-white px-4 py-2 rounded"
        >
          Download Quotation
        </button>
      </div>
    </div>
  );
};

export default QuotationPreview;
