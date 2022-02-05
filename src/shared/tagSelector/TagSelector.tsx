import { Close } from '@mui/icons-material';
import React, { FC, useState } from 'react';
import './TagsComponent.css';

type TagEditorData = {
    onUpdate: (newTags: string[]) => void
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
    const [tags, setTags] = useState<string[]>([]);
    const onFinishEditing = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== "") {
            const newTags = tags.concat([e.currentTarget.value]);
            e.currentTarget.value = "";
            props.onUpdate(newTags);
            setTags(newTags);
        }
    }
    return (
        <div className="tag-editor-list">
            {tags.map((tag) => (
                <TagEditor
                    onDelete={() => {
                        const newTags = tags.filter(v => v !== tag)
                        props.onUpdate(newTags);
                        setTags(newTags);
                    }} value={tag} />)
            )
            }
            < span key={"&"} className="tag-text">
                <input placeholder="add field you are interested in" onBlur={onFinishEditing} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onFinishEditing(e);
                    }
                }} />
            </span>
        </div>
    );
}

export default TagSelector;