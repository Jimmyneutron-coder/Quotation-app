import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const QuotationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [quotation, setQuotation] = useState({
    customer: { name: "", phone: "" },
    items: [{ name: "", qty: "", price: "" }],
  });

  useEffect(() => {
    if (location.state?.quotation) {
      setQuotation(location.state.quotation);
    }
  }, [location.state]);

  const handleChange = (e, section, key) => {
    setQuotation((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: e.target.value },
    }));
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...quotation.items];
    updatedItems[index][key] = value;
    setQuotation({ ...quotation, items: updatedItems });
  };

  const addItem = () => {
    if (
      !quotation.items.name === "" ||
      !quotation.items.qty === "" ||
      !quotation.items.price == ""
    ) {
      toast.error("Please add item.");
      return;
    }

    setQuotation({
      ...quotation,
      items: [...quotation.items, { name: "", qty: "", price: "" }],
    });
  };

  const clearForm = () => {
    setQuotation({
      customer: { name: "", phone: "" },
      items: [{ name: "", qty: "", price: "" }],
    });
    toast.success("Form Cleared");
  };

  const handlePreview = () => {
    if (!quotation.customer.name.trim() || !quotation.customer.phone.trim()) {
      toast.error("All Fields Required");
      return;
    }

    if (quotation.items.length === 0) {
      toast.error("Add at least one item.");
      return;
    }

    const isValidate = quotation.items.every(
      (item) => item.name.trim() !== "" && item.qty > 0 && item.price > 0
    );

    if (!isValidate) {
      toast.error("Add proper details.");
      return;
    }

    toast.success("Data Filled.");
    navigate("/preview", { state: { quotation } });
  };

  const removeItem = (index) => {
    if (quotation.items.length > 1) {
      setQuotation({
        ...quotation,
        items: quotation.items.filter((_, i) => i !== index),
      });
    } else {
      toast.error("At least one item is required.");
    }
  };

  return (
    <div className="z-1 p-4 max-w-lg mx-auto">
     <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h1 className="text-2xl text-black font-bold text-center mb-4">
        Create Quotation
      </h1>
        <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
        <input
          required
          type="text"
          placeholder="Customer Name"
          value={quotation.customer.name}
          onChange={(e) => handleChange(e, "customer", "name")}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="text"
          required
          placeholder="Customer Phone"
          value={quotation.customer.phone}
          onChange={(e) => handleChange(e, "customer", "phone")}
          className="border p-2 w-full mb-4 rounded"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        {quotation.items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
            <div className="relative w-full">
              <input
                type="text"
                required
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                className="border p-2 w-full rounded pr-8"
              />
              {quotation.items.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-2 py-1 rounded text-[10px]"
                >
                  ❌
                </button>
              )}
            </div>
            <input
              type="number"
              required
              placeholder="Qty"
              value={item.qty}
              onChange={(e) =>
                handleItemChange(index, "qty", Number(e.target.value))
              }
              className="border p-2 rounded"
            />
            <input
              type="number"
              required
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", Number(e.target.value))
              }
              className="border p-2 rounded"
            />
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
        >
          + Add Item
        </button>
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        <button
          onClick={handlePreview}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Preview
        </button>
        <button
          onClick={clearForm}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Clear Form
        </button>
      </div>
    </div>
  );
};

export default QuotationForm;
