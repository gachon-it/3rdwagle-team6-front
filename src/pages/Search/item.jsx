import "./itemstyles.css";
function ItemCard({ img, color, type, tags, site }) {
  return (
    <div className="ItemCard">
      <div className="itemcover">
        <img alt="" src="{img}" />
      </div>
      <div className="info">
        <div className="itemHeader">
          <span className="itemname">
            {" "}
            {color}색 {type}{" "}
          </span>
          <div className="itemtags">
            {tags.map((item, i) => (
              <div key="{i}" className="tag">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="itemsite">{site}</div>
      </div>
    </div>
  );
}
export default ItemCard;
