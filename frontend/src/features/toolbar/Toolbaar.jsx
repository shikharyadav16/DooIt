export default function Toolbaar({ filter, setFilter }) {
    return (
        <div className="toolbar">
            <button onClick={() => setFilter("all")} className={`pill f-all ${filter === "all" ? "active" : ""} `} data-f="all"><i className="ph-bold ph-list-bullets"></i> All</button>
            <button onClick={() => setFilter("active")} className={`pill f-active ${filter === "active" ? "active" : "" }`} data-f="active"><i className="ph-bold ph-clock"></i> Active</button>
            <button onClick={() => setFilter("done")} className={`pill f-done ${filter === "done" ? "active" : ""}`} data-f="done"><i className="ph-bold ph-check-circle"></i> Done</button>
            <div className="search-box">
                <i className="ph ph-magnifying-glass"></i>
                <input className="search-in" id="sInput" type="text" placeholder="Search tasks…" />
            </div>
        </div>
    )
}