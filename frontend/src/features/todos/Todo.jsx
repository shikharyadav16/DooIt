import React, { useState } from "react";

function Todo({editing, setEditingTodoId, todo, toggleCompleted, deleteTodo, saveEdit, setEditingText}) {

    return (
        <div className={`t-item ${todo.done ? "done" : ""}`} data-id={todo._id} data-p={todo.priority} id={`ti-${todo._id}`}>
            {editing ? (
                <div className="edit-row">
                    <input className="edit-in" onChange={(e) => setEditingText(e.target.value)} id={`ei-${todo._id}`} data-id={todo._id} defaultValue={todo.text}/>

                    <button className="e-save" onClick={() => {const value = document.getElementById(`ei-${todo._id}`).value; saveEdit(); }}>
                        Save
                    </button>

                    <button className="e-cancel" onClick={() => setEditingTodoId(null)}>
                        <i className="ph-bold ph-x"></i>
                    </button>
                </div>
            ) : (
                <>
                    {/* Toggle */}
                    <button className="chk" onClick={() => toggleCompleted(todo._id)} title={todo.done ? "Undo" : "Complete"}>
                        <i className="ph-bold ph-check"></i>
                    </button>

                    {/* Content */}
                    <div className="t-content">
                        <div className="t-text">{todo.text}</div>

                        <div className="t-meta">
                            <span className={`p-tag ${todo.priority}`}>
                                {todo.priority === "high" && (
                                    <>
                                        <i className="ph-bold ph-fire"></i> High
                                    </>
                                )}
                                {todo.priority === "low" && (
                                    <>
                                        <i className="ph-bold ph-leaf"></i> Low
                                    </>
                                )}
                                {todo.priority === "medium" && (
                                    <>
                                        <i className="ph-bold ph-lightning"></i> Medium
                                    </>
                                )}
                            </span>

                            <span className="t-date">
                                <i className="ph ph-calendar-blank"></i>
                                {new Date(todo.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="t-actions">
                        <button className="act-btn edit" onClick={() => setEditingTodoId(todo._id)} title="Edit">
                            <i className="ph-bold ph-pencil-simple-line"></i>
                        </button>

                        <button className="act-btn del" onClick={() => deleteTodo(todo._id)} title="Delete">
                            <i className="ph-bold ph-trash-simple"></i>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Todo;