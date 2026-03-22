"use client";

import Image from "next/image";
import { FiPhone, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    services: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", phone: "", address: "", services: "" });
    }

    setLoading(false);
  };

  const images = Array.from({ length: 16 }, (_, i) => `/m${i + 1}.webp`);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="relative mx-auto w-full max-w-5xl px-6 pt-14 sm:pt-20">
        <div className="absolute right-6 top-6 flex items-center gap-4 sm:right-8 sm:top-8">
          <a href="tel:13155693338">
            <FiPhone className="h-5 w-5 text-zinc-900 dark:text-white" />
          </a>

          <a href="https://www.facebook.com/cnycurbappeal01/" target="_blank">
            <Image src="/fb.png" alt="Facebook" width={21} height={21} />
          </a>
        </div>

        <div className="flex items-start gap-6 sm:gap-8">
          <div className="flex items-start gap-3 sm:gap-5">
            <div className="h-[114px] sm:h-[138px]">
              <div className="relative h-full aspect-square">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 sm:gap-4">
              <h1 className="text-4xl font-bold text-green-950 dark:text-white sm:text-7xl">
                CNY Curb Appeal
              </h1>

              <p className="text-xl text-zinc-600 dark:text-zinc-400 sm:text-3xl">
                lawn. land. snow.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* FORM */}
      <section className="mx-auto w-full max-w-2xl px-6 pb-12 pt-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
            <div className="border-b border-zinc-200 dark:border-zinc-800">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-transparent focus:outline-none text-[17px]"
              />
            </div>

            <div className="border-b border-zinc-200 dark:border-zinc-800">
              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-transparent focus:outline-none text-[17px]"
              />
            </div>

            <div>
              <input
                name="address"
                placeholder="Address for Service"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-transparent focus:outline-none text-[17px]"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
            <textarea
              name="services"
              placeholder="What do you need? (lawn care, mulch, snow removal, etc.)"
              value={form.services}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-4 bg-transparent focus:outline-none text-[17px] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-green-900 text-white py-4 text-[17px] font-medium active:scale-[0.98] transition cursor-pointer"
          >
            {loading ? "Sending..." : "Request Estimate"}
          </button>

          {success && (
            <div className="text-center text-green-600 text-sm">
              Request sent — we’ll reach out shortly.
            </div>
          )}
        </form>
      </section>

      {/* IMAGE FEED */}
      <section className="mx-auto w-full max-w-2xl px-3 pb-20">
        <div className="grid grid-cols-2 gap-2">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(src)}
              className="relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={src}
                alt={`work-${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          {/* close button */}
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setActiveImage(null)}
          >
            <FiX size={28} />
          </button>

          {/* image */}
          <div
            className="relative w-full max-w-3xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt="expanded"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}