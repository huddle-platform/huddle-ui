import { Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './imageGallery.css';
type Image = {
    url: string
    description?: string
    thumbnail?: string
}
type ImageGalleryProps = {
    images: Image[];
}
export const ImageGallery: React.FC<ImageGalleryProps> = props => {
    return (
        <Swiper slidesPerView="auto"
            spaceBetween={20}
            navigation
            pagination={{
                clickable: true,
              }}
            keyboard

            modules={[Navigation, Pagination, Keyboard]}>
            {props.images.map((image, index) => (
                <SwiperSlide >
                    <img className="gallery-image" src={image.url} alt={image.description} />
                    {image.description&&<p className="image-caption">{image.description}</p>}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}