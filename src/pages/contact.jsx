import React, { useState } from "react";
import { Phone, Mail, MapPin, ChevronRight, Send } from "lucide-react";
import HandloomBreadcrumb from "../components/layout/breadcrumb";
import { Link } from "react-router-dom";
import Form from "../components/form/Form";
import InputField from "../components/form/InputField";
import TextAreaField from "../components/form/TextAreaField";
import axios from "axios";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData, methods) => {
    console.log(formData);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        formData
      );
      console.log(data);
      if (data.success) {
        setFormSubmitted(true);
        methods.reset(); // ✅ Clear the form
      }
    } catch (error) {
      console.log(error);
      if(error?.response?.data?.error){
        setFormError(true)
      }
      if (error?.response?.data?.errors) {
        const backendErrors = error.response.data.errors;

        // Show errors to react-hook-form
        Object.entries(backendErrors).forEach(([field, message]) => {
          methods.setError(field, {
            type: "manual",
            message,
          });
        });
      }
    } finally {
      setLoading(false);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormError(false)
      }, 5000);
    }
  };

  return (
    <div className="font-sans bg-stone-50 text-stone-800 pt-10">
      {/* Breadcrumb */}
      <HandloomBreadcrumb category="Contact Us" />

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1> */}
          <p className="text-lg mb-6 text-center leading-relaxed">
            Get in touch with Ibrahim Rugs. We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <MapPin size={20} className="text-stone-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-stone-600 mt-1">
                        Mirzapur, Uttar Pradesh
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Phone size={20} className="text-stone-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-stone-600 mt-1">
                        <Link to={"tel:+918545976660"}>+91 8545976660</Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Mail size={20} className="text-stone-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-stone-600 mt-1">
                        <Link to="mailto:imtiazali661986@gmail.com">
                          imtiazali661986@gmail.com
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-stone-700 hover:text-stone-900 transition"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="text-stone-700 hover:text-stone-900 transition"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
                <p className="mb-6 text-stone-600">
                  Please enter the details of your request. We will respond as soon as
                  possible.
                </p>

                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                    <p className="font-medium">Thank you for reaching out!</p>
                    <p className="mt-1">
                      Your message has been sent successfully. We'll get back to you
                      shortly.
                    </p>
                  </div>
                ) : null}
                {formError ? (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                    <p className="font-medium">Could not send the data!</p>
                    <p className="mt-1">
                      sorry for inconvenience we will correct it soon 
                    </p>
                  </div>
                ) : null}

                <div>
                  <Form
                    onSubmit={handleSubmit}
                    defaultValues={{
                      fullName: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <InputField
                        label="Full Name"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        validation={{ required: "Full Name is required" }}
                      />

                      <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        validation={{ required: "Email is required" }}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <InputField
                        label="Phone Number"
                        name="phone"
                        type="text"
                        placeholder="Enter your Phone"
                        validation={{ required: "Phone is required" }}
                      />
                      <InputField
                        label="Subject"
                        name="subject"
                        type="text"
                        placeholder="Enter your Subject"
                        validation={{ required: "Subject is required" }}
                      />
                    </div>

                    <div className="mb-4">
                      <TextAreaField
                        label="Message*"
                        name="message"
                        placeholder="Type your message here..."
                        validation={{ required: "Message is required" }}
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        disabled={loading}
                        type="submit"
                        className="flex items-center bg-stone-800 hover:bg-stone-700 text-white font-medium py-2 px-6 rounded-lg transition"
                      >
                        {loading ? "Submitting..." : "Submit Now"}
                        <Send size={16} className="ml-2" />
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="bg-stone-200 h-96 w-full rounded-lg flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d642970.4023718694!2d82.20475729936076!3d25.487478524532058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398febedfb13a7f3%3A0x59c723f687071dd8!2sIbrahim%20Rugs!5e0!3m2!1sen!2sin!4v1746121579163!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
