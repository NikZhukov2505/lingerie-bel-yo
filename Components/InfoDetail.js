import React from 'react';
import Image from 'next/image';
import styles from '../styles/Detail.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper";
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import InfoProduct from './InfoProduct';

const InfoDetail = ({ product }) => {
    return (
        <div>
            <LightGallery
                selector={'.gallery_item'}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                {product &&
                    <div className={styles.detail_wrapper}>
                        <div className={styles.imgs}>
                            <div className={styles.imgs_left_block}>
                                {
                                    product?.product_images?.length > 0 && product?.product_images?.slice(1, 3).map(el => (
                                        <div key={el.id}>
                                            <a className='gallery_item' href={el?.image}>
                                                <Image
                                                    src={el?.image}
                                                    loader={() => el?.image}
                                                    width={100}
                                                    height={100}
                                                    alt={product?.name}
                                                    unoptimized={true}
                                                    priority
                                                />
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.imgs_swiper_container}>
                                <Swiper
                                    spaceBetween={30}
                                    effect={"fade"}
                                    navigation={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[EffectFade, Navigation, Pagination]}
                                    className={styles.my_swiper}
                                >
                                    <SwiperSlide>
                                        <a className='gallery_item' href={product?.image}>
                                            <Image
                                                src={product?.image}
                                                loader={() => product?.image}
                                                alt={product.name}
                                                width={100}
                                                height={100}
                                                unoptimized={true}
                                                priority
                                                className={styles.swiper_img}
                                            />
                                        </a>
                                    </SwiperSlide>
                                    {
                                        product?.product_images?.length > 0 && product?.product_images?.map(img => (
                                            <SwiperSlide key={img?.id}>
                                                <a className='gallery_item' href={img?.image}>
                                                    <Image
                                                        src={img?.image}
                                                        loader={() => img?.image}
                                                        alt={product.name}
                                                        width={100}
                                                        height={100}
                                                        unoptimized={true}
                                                        priority
                                                        className={styles.swiper_img}
                                                    />
                                                </a>
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                            </div>
                        </div>
                        <InfoProduct product={product} />
                    </div>
                }
            </LightGallery>
        </div>
    );
};

export default InfoDetail;