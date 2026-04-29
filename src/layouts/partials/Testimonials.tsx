"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Testimonial } from "@/types";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    description?: string;
    testimonials: Array<Testimonial>;
  };
}

const Testimonials = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="section relative overflow-hidden bg-slate-50">
          {/* Background blobs */}
          <div className="pointer-events-none absolute -left-20 top-0 h-125 w-125 rounded-full bg-pink-300/30 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-125 w-125 rounded-full bg-blue-300/30 blur-[120px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/20 blur-[100px]" />
          <div className="container">
            <div className="row">
              <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-6">
                <h2
                  dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                  className="mb-4"
                />
                <blockquote
                  dangerouslySetInnerHTML={markdownify(
                    data.frontmatter.description!,
                  )}
                />
              </div>
              <div className="col-12">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={24}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {data.frontmatter.testimonials.map(
                    (item: Testimonial, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="rounded-2xl border border-slate-200 bg-white px-7 py-10 shadow-md">
                          <div className="text-slate-800"></div>
                          <blockquote
                            className="mt-8 text-slate-700"
                            dangerouslySetInnerHTML={markdownify(
                              item.content,
                              true,
                            )}
                          />
                          <div className="mt-11 flex items-center">
                            <div className="text-slate-800">
                              <ImageFallback
                                height={50}
                                width={50}
                                className="rounded-full"
                                src={item.avatar}
                                alt={item.name}
                              />
                            </div>
                            <div className="ml-4">
                              <h3
                                dangerouslySetInnerHTML={markdownify(item.name)}
                                className="h5 font-primary font-semibold"
                              />
                              <p
                                dangerouslySetInnerHTML={markdownify(
                                  item.designation,
                                )}
                                className="text-slate-500"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Testimonials;
