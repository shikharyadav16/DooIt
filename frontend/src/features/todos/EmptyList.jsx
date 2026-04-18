export default function EmptyList() {
    return (
        <div className="empty">
            <div className="empty-blob"><i className="ph-duotone ph-clipboard-text"></i></div>
            <h3>Nothing completed yet!</h3>
            <p>Finish some tasks and they will appear here <i className="ph-bold ph-rocket-launch"></i></p>
            {/* <h3>${filter === 'done' ? 'Nothing completed yet!' : 'No tasks here!'}</h3>
            <p>${filter === 'done' ? 'Finish some tasks and they\u2019ll appear here <i className="ph-bold ph-rocket-launch"></i>' : 'Add your first task above \u2014 you\u2019ve got this! <i className="ph-bold ph-lightning"></i>'}</p> */}
        </div>
    )
}