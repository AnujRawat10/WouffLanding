"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: string | number;
  name: string;
  price: number;            // numeric; we’ll format it
  currency?: string;        // default "USD"
  type?: string;            // e.g., "Physical"
  image: string;            // /public path, e.g. "/products/duck.jpg"
  href?: string;            // optional product page
};

export default function ProductsForPets({
  products = [
    {
      id: 1,
      name: "Dofi – Pet Food",
      price: 20,
      currency: "USD",
      type: "Physical",
      image: "/products/p1.jpg",
      href: "#",
    },
    {
      id: 2,
      name: "Dogfi – Dog Food",
      price: 20,
      currency: "USD",
      type: "Physical",
      image: "/products/p2.jpg",
      href: "#",
    },
  ],
  viewAllHref = "#",
  onAddToCart,
}: {
  products?: Product[];
  viewAllHref?: string;
  onAddToCart?: (p: Product) => void;
}) {
  const formatPrice = (value: number, currency = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

  return (
    <section
      id="products"
      className="scroll-mt-24 bg-[#f3f4f6] py-14 sm:py-16 lg:py-20"
      aria-labelledby="products-title"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* Left: intro */}
        <div>
          <div className="mb-4 inline-flex items-center gap-2 text-sm text-gray-700">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
            Product for you
          </div>

          <h2
            id="products-title"
            className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
          >
            Products for your{" "}
            <span className="bg-[linear-gradient(transparent_70%,#f2c7f0_70%)]">
              pets
            </span>
          </h2>

          <div className="mt-8">
            <Link
              href={viewAllHref}
              className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white shadow hover:opacity-90"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Right: cards (2-up like the mock) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {products.slice(0, 2).map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5"
              aria-label={p.name}
            >
              <div className="overflow-hidden rounded-xl bg-gray-100">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 40vw, 90vw"
                    priority
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2 px-1">
                {p.href ? (
                  <Link
                    href={p.href}
                    className="block text-[15px] font-semibold text-gray-900 hover:underline"
                  >
                    {p.name}
                  </Link>
                ) : (
                  <h3 className="text-[15px] font-semibold text-gray-900">{p.name}</h3>
                )}

                <div className="text-sm font-medium text-gray-900">
                  {formatPrice(p.price, p.currency)}
                </div>

                <p className="text-xs text-gray-500">{p.type || "Physical"}</p>

                <button
                  onClick={() => onAddToCart?.(p)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
