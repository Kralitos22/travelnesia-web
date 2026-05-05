import { Star, Quote, Camera, Users } from "lucide-react";
import { testimonials } from "@/data/content";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="testimoni" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Users className="h-4 w-4" />
            GALERI JAMAAH
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Momen Jamaah Kami
          </h2>
          <p className="text-muted-foreground text-lg">
            Ribuan jamaah telah merasakan pelayanan terbaik dari Ditoris Travelnesia.
            Berikut momen kebersamaan mereka di tanah suci.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative group cursor-pointer rounded-xl overflow-hidden aspect-square",
                index === 0 && "col-span-2 row-span-2"
              )}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow"
            >
              <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-4 italic text-sm">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:opacity-70"
            >
              ×
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage > 0 ? selectedImage - 1 : testimonials.length - 1);
              }}
              className="absolute left-4 text-white text-4xl font-bold hover:opacity-70 p-4"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage < testimonials.length - 1 ? selectedImage + 1 : 0);
              }}
              className="absolute right-4 text-white text-4xl font-bold hover:opacity-70 p-4"
            >
              ›
            </button>
            <div className="max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={testimonials[selectedImage].image}
                alt={testimonials[selectedImage].name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4">
                {selectedImage + 1} / {testimonials.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}