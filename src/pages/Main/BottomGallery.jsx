import React, { useState } from "react";
import "./BottomGallery.css";

const images = [
    "/assets/1.jpg",
    "/assets/2.png",
    "/assets/3.jpg",
    "/assets/4.png",
    "/assets/5.jpg",
    "/assets/6.jpg",
    "/assets/7.jpg",
    "/assets/8.jpg",
    "/assets/9.jpg",
    "/assets/10.jpg",
];

function BottomGallery() {
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const imagesPerPage = 5;
    const maxPage = Math.ceil(images.length / imagesPerPage) - 1;

    const nextPage = () => {
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleImageClick = (src) => {
        setSelectedImage(src);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="bottom-gallery-wrap">
            <button className="bottom-prev-btn" onClick={prevPage} disabled={currentPage === 0}>❮</button>

            <div className="bottom-gallery">
                {images.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage).map((src, index) => (
                    <div className="bottom-gallery-item" key={index} onClick={() => handleImageClick(src)}>
                        <div className="bottom-gallery-img">
                            <img src={src} alt={`Gallery ${index}`} />
                        </div>
                    </div>
                ))}
            </div>

            <button className="bottom-next-btn" onClick={nextPage} disabled={currentPage === maxPage}>❯</button>

            {/* 모달 창 */}
            {isModalOpen && (
                <div className="bottom-modal-overlay" onClick={closeModal}>
                    <div className="bottom-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="bottom-modal-close" onClick={closeModal}>✖</button>
                        <img src={selectedImage} alt="Selected" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default BottomGallery;
