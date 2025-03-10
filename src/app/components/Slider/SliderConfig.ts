import { Pagination, Navigation } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

export const SwiperConfig = (paginationRef: React.RefObject<HTMLDivElement>, nextRef: React.RefObject<HTMLButtonElement>, prevRef: React.RefObject<HTMLButtonElement>): SwiperOptions => ({
  modules: [Pagination, Navigation],
  pagination: {
    el: paginationRef.current,
    clickable: true,
  },
  navigation: {
    nextEl: nextRef.current,
    prevEl: prevRef.current,
  },
  on: {
    init:(swiper:any) => {
      if (!swiper.params.navigation) return;
      const navigation = swiper.params.navigation;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;

      swiper.navigation?.init();
      swiper.navigation?.update();
    },
  }
});