import { Close } from '@mui/icons-material';
import React, { FC, useState } from 'react';
import './TagsComponent.css';

type TagEditorData = {
    tags: string[]
    onNewTag: (newTag: string) => void
    onDeleteTag: (tag: string) => void
}

type TagEditorProps = {
    onDelete?: () => void
    value: string
}
const TagEditor: FC<TagEditorProps> = props => {
    return (< span key={props.value} className="tag-text">
        #{props.value}
        <button onClick={() => props.onDelete?.()}><Close style={{ fontSize: 8 }} /></button>
    </span >)
}

const TagSelector: FC<TagEditorData> = (props) => {
    const tags = props.tags;
    const onFinishEditing = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== "") {
            props.onNewTag(e.currentTarget.value)
            e.currentTarget.value = "";
        }
    }
    return (
        <div className="tag-editor-list">
            {tags.map((tag) => (
                <TagEditor
                    onDelete={() => {
                        props.onDeleteTag(tag);
                    }} value={tag} />)
            )
            }
            < span key={"&"} className="tag-text">
                <input placeholder="Add a tag" onBlur={onFinishEditing} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onFinishEditing(e);
                    }
                }} />
            </span>
        </div>
    );
}

export default TagSelector;