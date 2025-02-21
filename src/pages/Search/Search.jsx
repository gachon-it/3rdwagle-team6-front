import "./searchstyles.css";
import { useEffect, useState } from "react";
import ItemCard from "./item";
import { Link } from "react-router-dom";
import ChatModal from "../Main/ChatModal";
import OutfitModal from "../Main/OutfitModal"; // 추천 코디 모달 추가

export default function Search() {
  const [showChatModal, setShowChatModal] = useState(false);
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [type, setType] = useState("상의");
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 사진 추가 버튼 클릭 이벤트
  const handleAddPhoto = () => {
    console.log("📸 사진 추가 기능 구현 예정!"); // alert 대신 console.log 사용
  };

  const subCategories = {
    상의: ["니트", "맨투맨", "셔츠", "후드티", "티셔츠", "가디건"],
    하의: ["청바지", "면바지", "슬랙스", "반바지", "숏치마", "롱치마"],
    신발: ["스니커즈", "러닝화", "워커", "부츠", "슬리퍼"],
  };

  const items = [
    {
      img: "./assets/1.jpg",
      color: "검정",
      type: "맨투맨",
      tags: ["겨울", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "./assets/3.jpg",
      color: "하양",
      type: "셔츠",
      tags: ["겨울", "니트"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "./assets/4.png",
      color: "빨강",
      type: "니트",
      tags: ["겨울", "단정정"],
      site: "왼쪽 서랍 아래",
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      (selectedSubItem ? item.type === selectedSubItem : true) &&
      subCategories[type].includes(item.type)
  );

  const chunks = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const paginatedItems = chunks(filteredItems, 3);
  const totalPages = Math.ceil(paginatedItems.length / 3);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [type, selectedSubItem]);

  return (
    <div className="background">
      {/* 네비게이터 (좌측 고정) */}
      <div className="fixed-navigator">
        <Link to={"/Main"} className="nav-btn">
          <div style={{ fontSize: "35px" }}>🏠</div>
          <div>메인페이지</div>
        </Link>
        <button className="nav-btn" onClick={() => setShowChatModal(true)}>
          <div style={{ fontSize: "35px" }}>💭</div>
          <div>패션상담</div>
        </button>
        <Link to={"/Search"} className="nav-btn">
          <div style={{ fontSize: "35px" }}>📂</div>
          <div>카테고리</div>
        </Link>
      </div>

      {/* 채팅 모달 */}
      {showChatModal && (
        <ChatModal
          onClose={() => setShowChatModal(false)}
          onEndChat={() => {
            setShowChatModal(false);
            setShowOutfitModal(true);
          }}
        />
      )}

      {/* 추천 코디 모달 */}
      {showOutfitModal && <OutfitModal onClose={() => setShowOutfitModal(false)} />}

      {/* 📸 사진 추가 버튼 (우측 하단 고정) */}
      <button className="add-photo-btn" onClick={handleAddPhoto}>＋</button>

      <div className="mainground">
        <div className="top" />
        <nav className="menu">
          <div className="pagetype">{type}</div>

          <div className="category">
            {["상의", "하의", "신발"].map((item) => (
              <div
                key={item}
                className="type"
                onClick={() => {
                  setType(item);
                  setSelectedSubItem(null);
                }}
                style={{ fontWeight: type === item ? "bold" : "normal" }}
              >
                · {item}
              </div>
            ))}
          </div>

          <div className="subcategory">
            {subCategories[type].map((subItem) => (
              <div
                key={subItem}
                className={`subType ${selectedSubItem === subItem ? "selected" : ""}`}
                onClick={() => setSelectedSubItem(subItem)}
                role="button"
                tabIndex={0}
              >
                {subItem}
              </div>
            ))}
          </div>
        </nav>

        <nav className="body">
          {paginatedItems
            .slice((currentPage - 1) * 3, currentPage * 3)
            .map((chunk, index) => (
              <div
                key={`chunk-${index}`}
                className="section-one"
                style={{
                  justifyContent: chunk.length === 2 ? "flex-start" : "space-between",
                }}
              >
                {chunk.map((filteredItem) => (
                  <ItemCard
                    key={filteredItem.img}
                    img={filteredItem.img}
                    color={filteredItem.color}
                    type={filteredItem.type}
                    tags={filteredItem.tags}
                    site={filteredItem.site}
                    style={{
                      marginRight: chunk.length === 2 ? "60px" : "0",
                    }}
                  />
                ))}
              </div>
            ))}

          {totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages)].map((_, pageIndex) => (
                <span
                  key={pageIndex}
                  className={`page-number ${currentPage === pageIndex + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(pageIndex + 1)}
                >
                  {pageIndex + 1}
                </span>
              ))}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
