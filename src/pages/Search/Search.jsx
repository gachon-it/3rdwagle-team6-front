import "./searchstyles.css";
import { useEffect, useState } from "react";
import ItemCard from "./item";

export default function Search() {
  const [type, setType] = useState("상의");
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const subCategories = {
    상의: ["니트", "맨투맨", "셔츠", "후드티", "티셔츠", "가디건"],
    하의: ["청바지", "면바지", "슬랙스", "반바지", "숏치마", "롱치마"],
    신발: ["스니커즈", "러닝화", "워커", "부츠", "슬리퍼"],
  };

  const items = [
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "하양",
      type: "후드티",
      tags: ["겨울", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "검정",
      type: "셔츠",
      tags: ["겨울", "니트"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "노랑",
      type: "후드티",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "파랑",
      type: "청바지",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "초록",
      type: "반바지",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "빨강",
      type: "후드티",
      tags: ["겨울", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "보라",
      type: "슬랙스",
      tags: ["겨울", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "흰색",
      type: "셔츠",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "회색",
      type: "티셔츠",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "회색",
      type: "티셔츠",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "회색",
      type: "티셔츠",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "회색",
      type: "티셔츠",
      tags: ["여름", "캐주얼"],
      site: "왼쪽 서랍 아래",
    },
    {
      img: "https://image.msscdn.net/images/goods_img/20210203/1774415/1774415_1_500.jpg",
      color: "회색",
      type: "티셔츠",
      tags: ["여름", "캐주얼"],
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
    setCurrentPage(1);
  }, [type, selectedSubItem]);

  return (
    <div className="background">
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
                className={`subType ${
                  selectedSubItem === subItem ? "selected" : ""
                }`}
                onClick={() => setSelectedSubItem(subItem)}
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
                key={index}
                className="section-one"
                style={{
                  justifyContent:
                    chunk.length === 2 ? "flex-start" : "space-between",
                }}
              >
                {chunk.map((filteredItem, index) => (
                  <ItemCard
                    key={index}
                    img={filteredItem.img}
                    color={filteredItem.color}
                    type={filteredItem.type}
                    tags={filteredItem.tags}
                    site={filteredItem.site}
                    style={{
                      marginRight: chunk.length === 2 ? "30px" : "0",
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
                  className={`page-number ${
                    currentPage === pageIndex + 1 ? "active" : ""
                  }`}
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
