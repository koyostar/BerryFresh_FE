import React, { useState } from "react";
import { toast } from "react-toastify";

const Payment = ({ cartItems, toProperCase }) => {
  const [shippingInfo, setShippingInfo] = useState({
    recipientName: "",
    email: "",
    address: "",
    country: "Singapore",
    postalCode: "",
    phoneNumber: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "shipping") {
      setShippingInfo({ ...shippingInfo, [name]: value });
    } else if (formType === "payment") {
      setPaymentDetails({ ...paymentDetails, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isShippingValid = Object.values(shippingInfo).every(
      (field) => field.trim() !== ""
    );
    const isPaymentValid = Object.values(paymentDetails).every(
      (field) => field.trim() !== ""
    );
    if (!isShippingValid) {
      toast.error("Please fill in all shipping information", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    if (!isPaymentValid) {
      toast.error("Please fill in all payment details", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }
    toast.success("Order submitted successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="w-full flex p-4">
      <div>
        <div className="shipping-form m-4 pt-4">
          <h2 className="text-2xl font-bold mb-4">Shipping Info</h2>
          <form className="max-w-sm mx-auto bg-white text-black p-6 shadow-md rounded">
            <label className="block mb-2 font-bold">Recipient Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              required
              value={shippingInfo.recipientName}
              onChange={(e) => handleInputChange(e, "shipping")}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            <div className="mb-4">
              <label className="block mb-2 font-bold">Email</label>
              <input
                type="text"
                placeholder="e.g. johndoe@abcmail.com"
                required
                value={shippingInfo.email}
                onChange={(e) => handleInputChange(e, "shipping")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Address</label>
              <input
                type="text"
                placeholder="e.g. 123 Main St"
                required
                value={shippingInfo.address}
                onChange={(e) => handleInputChange(e, "shipping")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-2 font-bold">Country</label>
                <input
                  type="text"
                  defaultValue="Singapore"
                  required
                  value={shippingInfo.country}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-bold">Postal Code</label>
                <input
                  type="text"
                  placeholder="10001"
                  required
                  value={shippingInfo.postalCode}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Phone Number</label>
              <div className="inline-flex">
                <p className="p-2">+65</p>
                <input
                  type="text"
                  placeholder="12345678"
                  required
                  value={shippingInfo.phoneNumber}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="payment-form m-4 pt-4">
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
          <form className="max-w-sm mx-auto bg-white text-black p-6 shadow-md rounded">
            <label className="block mb-2 font-bold">Cardholder Name</label>
            <input
              type="text"
              required
              value={paymentDetails.cardholderName}
              onChange={(e) => handleInputChange(e, "payment")}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            <label className="block mb-2 font-bold">Card Number</label>
            <input
              type="text"
              required
              value={paymentDetails.cardNumber}
              onChange={(e) => handleInputChange(e, "payment")}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />

            <div className="flex gap-2">
              <div>
                <label className="block mb-2 font-bold">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  required
                  value={paymentDetails.expiryDate}
                  onChange={(e) => handleInputChange(e, "payment")}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold">CVV</label>
                <input
                  type="text"
                  required
                  value={paymentDetails.cvv}
                  onChange={(e) => handleInputChange(e, "payment")}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>{" "}
      <div className="order-summary m-4 p-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full mt-4 ">
              <thead>
                <tr className="">
                  <th className="text-center p-2 "></th>
                  <th className="text-center columns-3xs p-2 ">Item</th>
                  <th className="text-center p-2 ">Quantity</th>
                  <th className="text-center p-2">Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="">
                    <td className="p-2 ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="m-2 h-20 w-20"
                      />
                    </td>
                    <td className="p-2 text-left">{toProperCase(item.name)}</td>
                    <td>
                      <p>{item.quantity}</p>
                    </td>

                    <td>${(item.price * item.quantity).toFixed(2)} </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-right">
              <h3 className="text-xl font-bold pr-4">
                Total: ${calculateTotal()}
              </h3>
            </div>
          </div>
        ) : (
          <p className="text-xl font-bold text-center">Your cart is empty.</p>
        )}
        <button
          onClick={handleFormSubmit}
          className="bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded hover:bg-blue-600 transition w-full"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
