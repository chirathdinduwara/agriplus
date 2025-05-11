import CountUp from 'react-countup';

function InfoCard({ title, count }) {
    return (
        <div className="info-card">
            <h1 className="info-header">{title}</h1>
            <p className="info-count text-3xl font-bold text-white">
                <CountUp end={count} duration={2.5} separator="," />
            </p>
        </div>
    );
}

export default InfoCard;