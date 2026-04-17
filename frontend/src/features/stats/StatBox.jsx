export default function StatBox({ phClass, text, sId, parentId, value }) {
    return (
        <div className="stat-box" id={parentId}>
            <div className="stat-icon-wrap"><i className={`ph-bold ${phClass}`}></i></div>
            <div className="stat-num" id={sId}>{value}</div>
            <div className="stat-label">{text}</div>
        </div>
    )
}