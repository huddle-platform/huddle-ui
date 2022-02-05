import { FC } from 'react';
import './TagsComponent.css';

type TagsComponentData = {
    tags: string[],
    selected?: string[]
}

const TagComponent: React.FC<{ tag: string, isSelected: boolean }> = props => {
    const onTagClick = () => {

    }
    return <span onClick={onTagClick} key={props.tag} className={`tag-text ${props.isSelected ? "selected" : ""}`}>#{props.tag}</span>
}


const TagsComponent: FC<TagsComponentData> = (props) => {
    return (
        <div className="tag-list">
            {props.tags.map((tag) => <TagComponent tag={tag} isSelected={props.selected?.includes(tag) || false} />)}
        </div>
    );
}

export default TagsComponent;