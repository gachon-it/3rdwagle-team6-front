import React, { useState } from "react";
import "./Modalstyles.css";

function AddModal({ onClose }) {
  const colors = [
    { name: "흰색", hex: "#FFFFFF" },
    { name: "베이지색", hex: "#F5DEB3" },
    { name: "분홍색", hex: "#FFC0CB" },
    { name: "노란색", hex: "#FFD700" },
    { name: "초록색", hex: "#32CD32" },
    { name: "빨간색", hex: "#DC143C" },
    { name: "파란색", hex: "#1E90FF" },
    { name: "갈색", hex: "#8B4513" },
    { name: "회색", hex: "#808080" },
    { name: "검은색", hex: "#000000" },
  ];

  const categories = {
    상의: ["니트", "맨투맨", "셔츠", "후드티", "티셔츠", "가디건"],
    하의: ["청바지", "면바지", "슬랙스", "반바지", "숏치마", "롱치마"],
    신발: ["스니커즈", "러닝화", "워커", "부츠", "슬리퍼"],
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSubmit = () => {
    console.log({
      selectedImage,
      selectedColor,
      mainCategory,
      subCategory,
      tags,
      location,
    });
    onClose(); // 제출 후 모달 닫기
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📸 옷 추가</h3>
          <button className="modal-close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <div className="image-upload-section">
            <label htmlFor="imageUpload" className="image-upload-box">
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="image-preview" />
              ) : (
                <span className="plus-icon">+</span>
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>

          <div className="color-picker">
            {colors.map((color) => (
              <div
                key={color.name}
                className={`color-box ${selectedColor === color.hex ? "selected" : ""}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.hex)}
              >
                {selectedColor === color.hex && <span className="check-mark">✔</span>}
              </div>
            ))}
          </div>

          <select className="dropdown" value={mainCategory} onChange={(e) => setMainCategory(e.target.value)}>
            <option value="">종류 선택</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {mainCategory && (
            <select className="dropdown" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
              <option value="">세부 선택</option>
              {categories[mainCategory].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          )}

          <input className="text-input" type="text" placeholder="태그 입력 (쉼표로 구분)" value={tags} onChange={(e) => setTags(e.target.value)} />
          <input className="text-input" type="text" placeholder="위치 입력" value={location} onChange={(e) => setLocation(e.target.value)} />

          <button className="submit-btn" onClick={handleSubmit}>추가하기</button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
