import "./Modalstyles.css";
import { useState } from "react";

function AddModal() {
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
  };

  return (
    <div className="photo-add-modal-background">
      <div className="photo-add-modal-mainground">
        <div className="photo-add-modal-top" />
        <nav className="photo-add-modal-menu">
          <div className="photo-add-modal-pagetype">추가하기</div>
        </nav>
        <div className="photo-add-modal-body">
          <div className="photo-add-modal-container">
            <div className="photo-add-modal-image-section">
              <label
                htmlFor="imageUpload"
                className="photo-add-modal-imageshot"
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="photo-add-modal-preview"
                  />
                ) : (
                  <span className="photo-add-modal-plus">+</span>
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

            <div className="photo-add-modal-form-section">
              <div className="photo-add-modal-color-picker">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className={`photo-add-modal-color-box ${
                      selectedColor === color.hex ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.hex)}
                  >
                    {selectedColor === color.hex && (
                      <span className="photo-add-modal-check">✔</span>
                    )}
                  </div>
                ))}
              </div>

              <select
                className="photo-add-modal-dropbox"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
              >
                <option value="">종류 선택</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {mainCategory && (
                <select
                  className="photo-add-modal-dropbox"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="">세부 선택</option>
                  {categories[mainCategory].map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              )}

              <input
                className="photo-add-modal-input"
                type="text"
                placeholder="태그 입력 (쉼표로 구분)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <input
                className="photo-add-modal-input"
                type="text"
                placeholder="위치 입력"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                className="photo-add-modal-submit-button"
                onClick={handleSubmit}
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;