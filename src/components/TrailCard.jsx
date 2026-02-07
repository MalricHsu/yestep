import { Link } from 'react-router-dom';
const TrailCard = ({ trailData }) => {
    return (
        <>
            <div className="row">
                {trailData.map((data) => {
                    return (
                        <div className="col-md-4 mb-6 mb-lg-0" key={data.id}>
                            <div className="card bg-dark text-white rounded-24 overflow-hidden border-0 position-relative recommend-card card-height">
                                <img
                                    src={data.trail_image}
                                    className="card-img object-fit-cover w-100 h-100"
                                    alt={data.trail_name}
                                />
                                <div className="card-img-overlay d-flex flex-column">
                                    <div className="d-flex align-items-start">
                                        <span className="badge bg-primary-50 text-primary-300 body2-bold detail-badge px-3 py-1 rounded-20">
                                            {data.trail_difficulty}
                                        </span>
                                    </div>

                                    <div className="mt-auto ">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="sub1-medium detail-textshadow mb-1">
                                                    {data.trail_name}
                                                </h5>
                                                <p className="body3-regular detail-textshadow">
                                                    {data.trail_address}
                                                </p>
                                            </div>
                                            <Link
                                                to={`/detail/${data.id}`}
                                                className="btn btn-primary-100 text-primary-300 p-3 d-flex justify-content-center align-items-center stretched-link"
                                            >
                                                <span className="material-symbols-outlined">
                                                    arrow_forward
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TrailCard;
