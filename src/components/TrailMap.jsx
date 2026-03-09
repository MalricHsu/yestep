//地圖元件
const TrailMap = ({ detailData }) => {
  if (!detailData?.trail_map_html) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '270px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">載入中...</span>
        </div>
      </div>
    );
  }
  return (
    <iframe
      className="rounded-24 detail-map"
      src={detailData.trail_map_html}
      width="100%"
      height="270px"
      style={{ border: '0' }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map"
    ></iframe>
  );
};

export default TrailMap;
