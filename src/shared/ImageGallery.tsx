import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './imageGallery.css';
import { Link } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
type Image = {
    url: string
    description?: string
    thumbnail?: string
}
type ImageGalleryProps = {
    images: Image[];
}
export const ImageGallery: React.FC<ImageGalleryProps> = props => {
    const [consent, setConsent] = useState(localStorage.getItem('consent'))
    if (consent == null) {
        return (
            <div className="image-consent-banner">
                <p>In order to view photos on this site, you need to agree to the data we collect since we use external image providers. See <Link to="/about">here</Link> for more info.</p>
                <Button onClick={() => {
                    localStorage.setItem('consent', 'true')
                    setConsent("true")
                }}>Accept our data policy</Button>
            </div>
        )
    }
    return (
        <Swiper slidesPerView="auto"
            spaceBetween={20}
            navigation
            pagination={{
                clickable: true,
            }}
            keyboard
            mousewheel

            modules={[Navigation, Pagination, Keyboard, Mousewheel]}>
            {props.images.map((image, index) => (
                <SwiperSlide >
                    <img className="gallery-image" src={image.url} alt={image.description} />
                    {image.description && <p className="image-caption">{image.description}</p>}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}